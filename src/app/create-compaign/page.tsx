'use client'
import React, { useState } from 'react'
import { Button, FormField } from '../components'

const CreateCampaignPage = () => {
	const [form, setForm] = useState({
		name: '',
		title: '',
		description: '',
		target: '',
		deadline: '',
		image: '',
	})

	return (
		<main className='w-full bg-[#1c1c24] '>
			<div className='max-w-4xl mx-auto flex justify-center items-center flex-col sm:p-10 p-4'>
				{/* Heading */}
				<div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
					<h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
						Start a Campaign
					</h1>
				</div>

				<form className='w-full mt-[65px] flex flex-col gap-[30px]'>
					<div className='flex flex-wrap gap-[40px]'>
						{/* Name */}
						<FormField
							labelName='Your Name *'
							placeholder='John Doe'
							inputType='text'
							value={form.name}
						/>
						{/* Title */}

						<FormField
							labelName='Campaign Title *'
							placeholder='Write a title'
							inputType='text'
							value={form.title}
						/>
					</div>

					{/* Description */}
					<FormField
						labelName='Story *'
						placeholder='Write your story'
						isTextArea
						value={form.description}
					/>

					<div className='flex flex-wrap gap-[40px]'>
						{/* Goal */}
						<FormField
							labelName='Goal *'
							placeholder='ETH 0.50'
							inputType='text'
							value={form.target}
						/>

						{/* End Date */}
						<FormField
							labelName='End Date *'
							placeholder='End Date'
							inputType='date'
							value={form.deadline}
						/>
					</div>

					{/* Compaign Iamges */}
					<FormField
						labelName='Campaign image *'
						placeholder='Place image URL of your campaign'
						inputType='url'
						value=''
					/>

					{/* Submit Button */}
					<div className='flex justify-center items-center mt-[40px]'>
						<Button
							btnType='submit'
							title='Submit new campaign'
							styles='bg-green-500'
						/>
					</div>
				</form>
			</div>
		</main>
	)
}

export default CreateCampaignPage
