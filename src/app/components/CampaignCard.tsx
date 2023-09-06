import Image from 'next/image'
import React from 'react'
import { BsFolder } from 'react-icons/bs'

const CampaignCard = () => {
	return (
		<div
			className='w-full rounded-[15px] bg-[#1c1c24] cursor-pointer'
			// onClick={handleClick}
		>
			<Image
				src='/premium_photo.avif'
				alt='campaign'
				width={300}
				height={200}
				className='w-full h-[158px] object-cover rounded-[15px]'
			/>

			<div className='flex flex-col p-4 text-[#808191]'>
				<div className='flex flex-row items-center mb-[18px]'>
					<BsFolder />
					<p className='ml-[12px] mt-[2px] font-epilogue font-medium text-[12px]'>
						Education
					</p>
				</div>

				<div className='block'>
					<h3 className='font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate'>
						{' '}
						Buy an iPhone 14 Pro Max{' '}
					</h3>
					<p className='mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate'>
						{' '}
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
						odit necessitatibus suscipit. Quasi cum inventore in sapiente
						accusamus asperiores, hic nihil similique animi delectus ipsa sunt!
						Nesciunt odit magnam molestiae!{' '}
					</p>
				</div>

				<div className='flex justify-between flex-wrap mt-[15px] gap-2'>
					<div className='flex flex-col'>
						{/* Collected Amount */}
						<h4 className='font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>
							{' '}
							$2300{' '}
						</h4>
						{/* Target */}
						<p className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate'>
							Raised of $5000{' '}
						</p>
					</div>
					<div className='flex flex-col'>
						{/* Deadline */}
						<h4 className='font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>
							{' '}
							23{' '}
						</h4>
						<p className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate'>
							Days Left
						</p>
					</div>
				</div>

				<div className='flex items-center mt-[20px] gap-[12px]'>
					<div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]'>
						{/* User Profile */}
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
					<p className='flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate'>
						by{' '}
						<span className='text-[#b2b3bd]'>
							0x19EA0f475B7653Ec108B62D363bcD2dAC3e937e6
						</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export default CampaignCard
