'use client'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { CampaignCardClient } from '../components'
import Image from 'next/image'
import { contractAddress } from '@/constants'
import { useOrganizer } from '../hooks'

type OrganizerType = {
	data: [string, string, string, string, string, BigInt, boolean] | undefined
}

type CampaignsOrganized = {
	data: BigInt[] | undefined
}

const ProfilePage = () => {
	const { address, isConnected } = useAccount()
	const [isOrganizer] = useOrganizer()
	const { data: organizer }: OrganizerType = useContractRead({
		address: contractAddress,
		abi: CrowdFundingABI,
		functionName: 'organizers',
		args: [address],
	})

	const { data: campaignsOrganized }: CampaignsOrganized = useContractRead({
		address: contractAddress,
		abi: CrowdFundingABI,
		functionName: 'getIdofCampaignsOrganizedByOrganizer',
		args: [address],
	})

	useEffect(() => {
		if (!isConnected) redirect('/')
	}, [isConnected])

	// console.log(organizer)

	return (
		<main className='my-8 md:md-14'>
			{isOrganizer && organizer ? (
				<div>
					<div className='flex gap-2 items-center'>
						<div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]'>
							{/* User Profile */}
							<Image
								src={organizer[4]}
								alt='profile'
								width={100}
								height={100}
								className='object-contain rounded-full'
							/>
						</div>
						<p className='font-epilogue font-normal text-base text-[#808191] truncate'>
							{organizer[0]}
						</p>
					</div>
				</div>
			) : (
				<h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>
					{' '}
					All Campaigns the user {address} donated to
				</h1>
			)}

			{/* All Campaigns */}
			{isOrganizer && (
				<section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-[20px] gap-[26px]'>
					{campaignsOrganized?.map((campaignId) => (
						<CampaignCardClient
							key={Number(campaignId)}
							campaignId={Number(campaignId)}
						/>
					))}
				</section>
			)}
		</main>
	)
}

export default ProfilePage
