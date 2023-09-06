import React from 'react'
import { FormField } from '../components'

const CreateCampaignPage = () => {
	return (
		<main className='bg-[#1c1c24] flex justify-center items-center flex-col sm:p-10 p-4'>
			<div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
				<h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
					Start a Campaign
				</h1>
			</div>

			<form className='w-full mt-[65px] flex flex-col gap-[30px]'>
				<div className='flex flex-wrap gap-[40px]'>
					{/* Name */}
					<FormField />
					{/* Title */}
				</div>

				{/* Description */}
				{/* Goal */}
				{/* End Date */}
				{/* Compaign Iamges */}
			</form>
		</main>
	)
}

export default CreateCampaignPage
