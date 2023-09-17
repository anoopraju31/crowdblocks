import React from 'react'
import { CampaignStats, DonationForm, StatBox } from '../../components'
import Image from 'next/image'
import { crowdBlocksContract, getCampaign, getNumberOfDaysLeft } from '@/utils'

type PageProps = {
	params: {
		campaignId: string
	}
}

const CompaignDetailsPage = async ({ params }: PageProps) => {
	const { campaignId } = params
	const { campaign, campaignImage } = await getCampaign(campaignId)

	return (
		<main className='w-full min-h-screen pt-10 pb-20 bg-[#13131a]'>
			<div className='w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0 mx-auto flex md:flex-row flex-col mt-10 gap-[30px]'>
				<div className='flex-1 flex-col'>
					{/* Images */}
					<Image
						src={campaignImage[0]}
						alt='campaign'
						width={600}
						height={400}
						className='w-full h-[410px] object-cover rounded-xl'
					/>
					{/* Progress */}
					<div className='relative w-full h-[5px] bg-zinc-500 rounded mt-4'>
						<div
							className='absolute h-full bg-green-500 rounded'
							style={{
								width: `${(campaign[4] / campaign[5]) * 100}%`,
								maxWidth: '100%',
							}}></div>
					</div>
				</div>

				{/* Stats */}
				<CampaignStats
					collectedAmount={campaign[6] / 10 ** 18}
					targetAmount={campaign[5] / 10 ** 18}
					numberOfDaysLeft={getNumberOfDaysLeft(Number(campaign[4]))}
					campaignId={Number(campaignId)}
				/>
			</div>

			<div className='mt-[60px] flex lg:flex-row flex-col gap-10'>
				<div className='flex-[2] flex flex-col gap-[40px]'>
					<div>
						{/* Creator */}
						<h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
							Creator
						</h4>

						<div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
							<div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer'>
								{/* profile image */}
								<div className='rounded-full overflow-hidden w-6 h-6 inline-block bg-[rgb(35, 143, 225)]'>
									<svg x='0' y='0' width='24' height='24'>
										<rect
											x='0'
											y='0'
											width='24'
											height='24'
											transform='translate(6.525467147921928 -0.07667628804068606) rotate(491.2 12 12)'
											fill='#018E74'></rect>
										<rect
											x='0'
											y='0'
											width='24'
											height='24'
											transform='translate(-9.540876339975153 2.016251393825418) rotate(174.8 12 12)'
											fill='#18CAF2'></rect>
										<rect
											x='0'
											y='0'
											width='24'
											height='24'
											transform='translate(-6.575909483438352 19.994128215112603) rotate(223.8 12 12)'
											fill='#FA3E00'></rect>
									</svg>
								</div>
							</div>
							<div>
								{/* Creator Address */}
								<h4 className='font-epilogue font-semibold text-[14px] text-white break-all'>
									{campaign[0]}
								</h4>
								{/* Number of compaigns */}
								<p className='mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]'>
									10 Campaigns
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

					{/* Donations List */}
					<div>
						<h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
							Donators
						</h4>

						<div className='mt-[20px] flex flex-col gap-4'>
							<div className='flex justify-between items-center gap-4'>
								<p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll'>
									0x19EA0f475B7653Ec108B62D363bcD2dAC3e937e6
								</p>
								<p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll'>
									1eth
								</p>
							</div>

							<div className='flex justify-between items-center gap-4'>
								<p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll'>
									0x19EA0f475B7653Ec108B62D363bcD2dAC3e937e6
								</p>
								<p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll'>
									1eth
								</p>
							</div>

							<div className='flex justify-between items-center gap-4'>
								<p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll'>
									0x19EA0f475B7653Ec108B62D363bcD2dAC3e937e6
								</p>
								<p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll'>
									1eth
								</p>
							</div>

							<div className='flex justify-between items-center gap-4'>
								<p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll'>
									0x19EA0f475B7653Ec108B62D363bcD2dAC3e937e6
								</p>
								<p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll'>
									1eth
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Funding form */}
				<div className='flex-1'>
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
