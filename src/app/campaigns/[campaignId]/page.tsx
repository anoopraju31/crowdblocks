import React from 'react'
import { CampaignStats, Carousel, DonationForm } from '../../components'
import { crowdBlocksContract, getCampaign, getNumberOfDaysLeft } from '@/utils'
import DonationList from '@/app/components/DonationList'
import Image from 'next/image'

type PageProps = {
	params: {
		campaignId: string
	}
}

const CompaignDetailsPage = async ({ params }: PageProps) => {
	const { campaignId } = params
	const {
		campaign,
		campaignImage,
		contributions,
		numberofCampaignsOrganized,
		profile,
	} = await getCampaign(campaignId)

	return (
		<main className='w-full min-h-screen pt-10 pb-20 bg-[#13131a]'>
			<div className='w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0 mx-auto flex md:flex-row flex-col mt-10 gap-[30px]'>
				<div className='flex-1 flex-col'>
					{/* Images */}
					<Carousel images={campaignImage} />

					{/* Progress */}
					<div className='relative w-full h-[5px] bg-zinc-500 rounded mt-4'>
						<div
							className='absolute h-full bg-green-500 rounded'
							style={{
								width: `${(campaign[7] / campaign[6]) * 100}%`,
								maxWidth: '100%',
							}}></div>
					</div>
				</div>

				{/* Stats */}
				<CampaignStats
					collectedAmount={campaign[7] / 10 ** 18}
					targetAmount={campaign[6] / 10 ** 18}
					numberOfDaysLeft={getNumberOfDaysLeft(Number(campaign[5]))}
					campaignId={Number(campaignId)}
				/>
			</div>

			<div className='mt-[60px] flex lg:flex-row flex-col gap-10 relative'>
				<div className='flex-[2] flex flex-col gap-[40px]'>
					<div>
						{/* Creator */}
						<h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
							Creator
						</h4>

						<div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
							<div className='w-[40px] h-[40px] flex justify-center items-center cursor-pointer bg-[#13131a]'>
								{/* profile image */}
								<Image
									src={profile}
									className='flex-1 rounded-full w-full h-full object-fill'
									alt='organizer profile'
									width={50}
									height={50}
								/>
							</div>
							<div>
								{/* Creator Address */}
								<h4 className='font-epilogue font-semibold text-[14px] text-white break-all'>
									{campaign[0]}
								</h4>
								{/* Number of compaigns */}
								<p className='mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]'>
									{numberofCampaignsOrganized} Campaigns
								</p>
							</div>
						</div>
					</div>

					{/* Description */}
					<div>
						<h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
							{campaign[1]}
						</h4>

						<div className='mt-[20px]'>
							<p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px]'>
								{campaign[2]}
							</p>
						</div>
					</div>

					{/* Funding form */}
					<div className='flex-1 lg:hidden block'>
						<h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
							Fund
						</h4>

						<DonationForm campaignId={Number(campaignId)} />
					</div>

					{/* Donations List */}
					<div>
						<h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
							Donators
						</h4>

						{contributions.length > 0 ? (
							<DonationList />
						) : (
							<div className='flex justify-center items-center'>
								<p className='text-lg italic text-white'>
									{' '}
									No Contributions so far!{' '}
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Funding form */}
				<div className='flex-1 hidden lg:block sticky top-4 h-fit'>
					<h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
						Fund
					</h4>

					<DonationForm campaignId={Number(campaignId)} />
				</div>
			</div>
		</main>
	)
}

export default CompaignDetailsPage

export async function generateStaticParams() {
	const numberOfCampaigns = await crowdBlocksContract.numberOfCampaigns()
	const params = []

	for (let i = 1; i <= numberOfCampaigns; i++) {
		params.push({ campaignId: String(Number(i)) })
	}

	return params
}
