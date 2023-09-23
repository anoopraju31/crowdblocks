'use client'
import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { useAccount, useContractWrite } from 'wagmi'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import { category, contractAddress, web3StorageClient } from '@/constants'
import { useOrganizer } from '../hooks'
import { Button, Dropdown, FormField, Loading } from '../components'

type CampaignForm = {
	category: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null
	title: string
	description: string
	target: string
	deadline: string
	images: File[]
}

const CreateCampaignPage = () => {
	const [form, setForm] = useState<CampaignForm>({
		category: null,
		title: '',
		description: '',
		target: '',
		deadline: '',
		images: [],
	})
	const [isDisabled, setIsDisabled] = useState(false)
	const [isUploading, setIsuploading] = useState(false)
	const { isConnected } = useAccount()
	const [isOrganizer] = useOrganizer()
	const { isLoading, isSuccess, write } = useContractWrite({
		address: contractAddress,
		abi: CrowdFundingABI,
		functionName: 'createCampaign',
		onSettled(data, error) {
			setIsuploading(false)
			console.log('Settled', { data, error })
		},
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
			form.category === null ||
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

	// handle category change
	const handleDropdown = (value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => {
		setForm((prevForm) => ({ ...prevForm, category: value }))
	}

	// Submit form data
	const handleSubmit = async () => {
		setIsuploading(true)
		const date = new Date(form.deadline)
		const timestamp = date.getTime() / 1000

		const client = web3StorageClient
		const cid = await client.put(form.images)
		const ipfsLinks = await form.images.map(
			(image) => `https://${cid}.ipfs.dweb.link/${image.name}`,
		)

		if (ipfsLinks.length === form.images.length) setIsuploading(false)

		write({
			args: [
				form.category,
				form.title,
				form.description,
				ipfsLinks,
				timestamp,
				Number(form.target) * 10 ** 18,
			],
		})
	}

	return (
		<main className='flex justify-center items-center flex-col pb-20 md:m-10 border-b sm:border-b-0 border-[#3a3a43]'>
			{/* Loading */}
			{(isLoading || isUploading) && <Loading isUploading={isUploading} />}

			{/* Heading */}
			<div className='flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px]'>
				<h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
					Start a Campaign
				</h1>
			</div>

			<form className='w-full mt-[65px] flex flex-col gap-[30px]'>
				<div className='flex flex-col md:flex-row gap-[40px]'>
					{/* Title */}
					<FormField
						labelName='Campaign Title *'
						placeholder='Write a title'
						inputType='text'
						value={form.title}
						handleChange={(e) => handleFormFieldChange('title', e)}
					/>

					{/* Category */}
					<Dropdown
						title='Category'
						values={category}
						label='Category *'
						isOutlined
						handleChange={handleDropdown}
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
