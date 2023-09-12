'use client'
import React, { useEffect, useState } from 'react'
import { Button, FormField } from '../components'
import { useAccount, useContractRead } from 'wagmi'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import { redirect } from 'next/navigation'

type Form = {
	name: string
	title: string
	description: string
	target: string
	deadline: string
	image: string
}

const CreateCampaignPage = () => {
	const [form, setForm] = useState<Form>({
		name: '',
		title: '',
		description: '',
		target: '',
		deadline: '',
		image: '',
	})

	const account = useAccount()
	console.log(account)

	const contractRead = useContractRead({
		address: '0x4d0b4A2014e64d76CcF0F2E1898bAeba440F7C02',
		abi: CrowdFundingABI,
		functionName: 'isOrganizer',
		args: [account.address],
	})

	useEffect(() => {
		if (!contractRead.data) {
			redirect('/')
		}
	}, [contractRead])

	const handleFormFieldChange = (
		fieldName: string,
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setForm({ ...form, [fieldName]: e.target.value })
	}

	return (
		<main className='flex justify-center items-center flex-col m-10'>
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
