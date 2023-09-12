import React from 'react'
import { CampaignCard } from '.'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import { AlchemyProvider } from 'ethers'
import { ethers } from 'ethers'

export const revalidate = 3600

const ActiveCampagins = async () => {
	const provider = new AlchemyProvider(
		'sepolia',
		process.env.NEXT_PUBLIC_ALCHEMY_ID,
	)
	const crowdBlocksContract = new ethers.Contract(
		'0x4d0b4A2014e64d76CcF0F2E1898bAeba440F7C02',
		CrowdFundingABI,
		provider,
	)

	const campaigns = await crowdBlocksContract.getAllActiveCampaigns()

	return (
		<section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-[20px] gap-[26px]'>
			{campaigns.map((campaignId: BigInt) => (
				<CampaignCard
					key={Number(campaignId)}
					campaignId={Number(campaignId)}
				/>
			))}
		</section>
	)
}

export default ActiveCampagins
