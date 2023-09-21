'use client'
import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import ReactLoading from 'react-loading'
import { useAccount, useContractWrite } from 'wagmi'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import { category, contractAddress } from '@/constants'
import { useOrganizer } from '../hooks'
import { Button, Dropdown, FormField } from '../components'

type CampaignForm = {
	category: string
	title: string
	description: string
	target: string
	deadline: string
	images: File[]
}

const CreateCampaignPage = () => {
	const [form, setForm] = useState<CampaignForm>({
		category: '',
		title: '',
		description: '',
		target: '',
		deadline: '',
		images: [],
	})
	const [isDisabled, setIsDisabled] = useState(false)
	const { isConnected } = useAccount()
	const [isOrganizer] = useOrganizer()
	const { isLoading, isSuccess, write } = useContractWrite({
		address: contractAddress,
		abi: CrowdFundingABI,
		functionName: 'createCampaign',
	})

	// prevent unauthorized access
	useEffect(() => {
		if (!isConnected || !isOrganizer) {
			redirect('/')
		}
	}, [isConnected, isOrganizer])

	// check if all fields are filled or not
	useEffect(() => {
		const checkFill = () =>
			form.title === '' ||
			form.description === '' ||
			form.target === '' ||
			form.deadline === '' ||
			form.images.length === 0

		setIsDisabled(checkFill())
	}, [form])

	// if transactions successful redirect to home
	useEffect(() => {
		if (isSuccess) redirect('/')
	}, [isSuccess])

	// handle form change
	const handleFormFieldChange = (
		fieldName: string,
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		if (fieldName !== 'images')
			setForm((prevForm) => ({ ...prevForm, [fieldName]: e.target.value }))
		else {
			const target = e.target as HTMLInputElement
			const files = Array.from(target.files as FileList)
			setForm((prevForm) => ({ ...prevForm, [fieldName]: files }))
		}
	}

	const handleDropdown = (value: string) => {
		setForm((prevForm) => ({ ...prevForm, category: value }))
	}

	// Submit form data
	const handleSubmit = () => {
		const date = new Date(form.deadline)
		const timestamp = date.getTime() / 1000

		write({
			args: [
				form.category,
				form.title,
				form.description,
				form.images,
				timestamp,
				Number(form.target) * 10 ** 18,
			],
		})

		// console.log([
		// 	form.category,
		// 	form.title,
		// 	form.description,
		// 	form.images,
		// 	timestamp,
		// 	Number(form.target) * 10 ** 18,
		// ])
	}

	return (
		<main className='flex justify-center items-center flex-col pb-20 md:m-10 border-b sm:border-b-0 border-[#3a3a43]'>
			{isLoading && (
				<div className='w-full h-screen bg-black/40 fixed top-0 left-0 right-0 flex justify-center items-center'>
					<p className='text-white text-2xl'> Loading </p>
					<ReactLoading type='bubbles' color='#fff' />
				</div>
			)}

			{/* Heading */}
			<div className='flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px]'>
				<h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
					Start a Campaign
				</h1>
			</div>

			<form className='w-full mt-[65px] flex flex-col gap-[30px]'>
				<div className='flex flex-col md:flex-row gap-[40px]'>
					{/* Category */}
					<Dropdown
						title='Category'
						values={category}
						isOutlined
						handleChange={handleDropdown}
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
					inputType='file'
					handleChange={(e) => handleFormFieldChange('images', e)}
				/>

				{/* Submit Button */}
				<div className='flex justify-center items-center mt-[40px]'>
					<Button
						btnType='button'
						title='Submit new campaign'
						styles='bg-green-500 disabled:opacity-40 disabled:text-black disabled:cursor-default'
						isDisabled={isDisabled}
						handleClick={handleSubmit}
					/>
				</div>
			</form>
		</main>
	)
}

export default CreateCampaignPage
