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

	const handleFormFieldChange = (
		fieldName: string,
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setForm({ ...form, [fieldName]: e.target.value })
	}

	return (
		<main className='flex justify-center items-center flex-col '>
			{/* Heading */}
			<div className='flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px]'>
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
						handleChange={(e) => handleFormFieldChange('name', e)}
					/>
					{/* Title */}

					<FormField
						labelName='Campaign Title *'
						placeholder='Write a title'
						inputType='text'
						value={form.title}
						handleChange={(e) => handleFormFieldChange('title', e)}
					/>
				</div>

				{/* Description */}
				<FormField
					labelName='Story *'
					placeholder='Write your story'
					isTextArea
					value={form.description}
					handleChange={(e) => handleFormFieldChange('description', e)}
				/>

				<div className='flex flex-wrap gap-[40px]'>
					{/* Goal */}
					<FormField
						labelName='Goal *'
						placeholder='ETH 0.50'
						inputType='text'
						value={form.target}
						handleChange={(e) => handleFormFieldChange('target', e)}
					/>

					{/* End Date */}
					<FormField
						labelName='End Date *'
						placeholder='End Date'
						inputType='date'
						value={form.deadline}
						handleChange={(e) => handleFormFieldChange('deadline', e)}
					/>
				</div>

				{/* Compaign Iamges */}
				<FormField
					labelName='Campaign image *'
					placeholder='Place image URL of your campaign'
					inputType='url'
					value={form.image}
					handleChange={(e) => handleFormFieldChange('image', e)}
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
		</main>
	)
}

export default CreateCampaignPage
