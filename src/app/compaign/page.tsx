import React from 'react'
import { Button, StatBox } from '../components'
import Image from 'next/image'

const CompaignDetailsPage = () => {
	return (
		<main className='w-full min-h-screen pt-10 pb-20 bg-[#13131a]'>
			<div className='w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0 mx-auto flex md:flex-row flex-col mt-10 gap-[30px]'>
				<div className='flex-1 flex-col'>
					{/* Images */}
					<Image
						src='/premium_photo.avif'
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
								width: `10%`,
								maxWidth: '100%',
							}}></div>
					</div>
				</div>

				{/* Stats */}
				<div className='flex md:w-[300px] w-full flex-col justify-between  gap-[30px]'>
					<StatBox title='Days Left' value={120} />
					<StatBox title='Raise of $1600' value={100} />
					<StatBox title='Total Backers' value={13} />
				</div>
			</div>

			<div className='w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0 mx-auto mt-[60px] flex lg:flex-row flex-col gap-10'>
				<div className='flex-[2] flex flex-col gap-[40px]'>
					<div>
						<h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
							Creator
						</h4>

						<div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
							<div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer'>
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
								<h4 className='font-epilogue font-semibold text-[14px] text-white break-all'>
									0x19EA0f475B7653Ec108B62D363bcD2dAC3e937e6
								</h4>
								<p className='mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]'>
									10 Campaigns
								</p>
							</div>
						</div>
					</div>

					<div>
						<h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
							Story
						</h4>

						<div className='mt-[20px]'>
							<p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px]'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
								rem quisquam quo illo dolores suscipit minus error est, sequi
								aspernatur maxime fugiat. Ex id exercitationem porro commodi
								repudiandae. Blanditiis, voluptatibus!
							</p>
						</div>
					</div>

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

				<div className='flex-1'>
					<h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
						Fund
					</h4>

					<div className='mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
						<p className='font-epilogue fount-medium text-[20px] pt-1 leading-[30px] text-center text-[#808191]'>
							Fund the campaign
						</p>
						<div className='mt-[20px]'>
							<input
								type='number'
								placeholder='ETH 0.1'
								step='0.01'
								className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
							/>

							<div className='my-[20px] p-4 bg-[#13131a] rounded-[10px]'>
								<h4 className='font-epilogue font-semibold text-[14px] leading-[22px] text-white'>
									Back it because you believe in it.
								</h4>
								<p className='mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]'>
									Support the project for no reward, just because it speaks to
									you.
								</p>
							</div>

							<Button
								btnType='button'
								title='Fund Campaign'
								styles='w-full bg-green-500'
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default CompaignDetailsPage
