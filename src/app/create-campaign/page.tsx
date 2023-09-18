'use client'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { Button, FormField } from '../components'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import { redirect } from 'next/navigation'
import { CheckOrganizerType } from '@/types'
import { contractAddress } from '@/constants'

type Form = {
	title: string
	description: string
	target: string
	deadline: string
	images: File[]
}

const CreateCampaignPage = () => {
	const [form, setForm] = useState<Form>({
		title: '',
		description: '',
		target: '',
		deadline: '',
		images: [],
	})
	const [isDisabled, setIsDisabled] = useState(false)

	const { address, isConnected } = useAccount()
	const { data: isOrganizer }: CheckOrganizerType = useContractRead({
		address: contractAddress,
		abi: CrowdFundingABI,
		functionName: 'isOrganizer',
		args: [address],
	})
	const { data, isLoading, isSuccess, write } = useContractWrite({
		address: contractAddress,
		abi: CrowdFundingABI,
		functionName: 'createCampaign',
	})

	useEffect(() => {
		if (!isConnected || !isOrganizer) {
			redirect('/')
		}
	}, [isConnected, isOrganizer])

	useEffect(() => {
		const checkFill = () =>
			form.title === '' ||
			form.description === '' ||
			form.target === '' ||
			form.deadline === '' ||
			form.images.length === 0

		setIsDisabled(checkFill())
	}, [form])

	useEffect(() => {
		if (isSuccess) redirect('/')
	}, [isSuccess])

	const handleFormFieldChange = (
		fieldName: string,
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		if (fieldName !== 'images')
			setForm({ ...form, [fieldName]: e.target.value })
		else {
			const target = e.target as HTMLInputElement
			const files = Array.from(target.files as FileList)
			setForm({ ...form, [fieldName]: files })
			console.log(files)
		}
	}

	const handleSubmit = () => {
		const date = new Date(form.deadline)
		const timestamp = date.getTime() / 1000

		write({
			args: [
				form.title,
				form.description,
				form.images,
				timestamp,
				Number(form.target) * 10 ** 18,
			],
		})
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
				{/* Title */}
				<FormField
					labelName='Campaign Title *'
					placeholder='Write a title'
					inputType='text'
					value={form.title}
					handleChange={(e) => handleFormFieldChange('title', e)}
				/>

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
					// value={form.images}
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
