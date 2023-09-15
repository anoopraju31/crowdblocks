import React from 'react'
import { Button } from '.'

const DonationForm = () => {
	return (
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
						Support the project for no reward, just because it speaks to you.
					</p>
				</div>

				<Button
					btnType='button'
					title='Fund Campaign'
					styles='w-full bg-green-500'
				/>
			</div>
		</div>
	)
}

export default DonationForm
