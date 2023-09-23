'use client'

import React, { useEffect, useState } from 'react'
import { useAccount, useContractWrite } from 'wagmi'
import { redirect } from 'next/navigation'
import ReactLoading from 'react-loading'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import { contractAddress, web3StorageClient } from '@/constants'
import { useOrganizer } from '../hooks'
import { Button, FormField } from '../components'

type Form = {
	name: string
	email: string
	contact: string
	profile: File | null
	phone: string
}

const CreateOrganizerPage = () => {
	const [form, setForm] = useState<Form>({
		name: '',
		email: '',
		contact: '',
		profile: null,
		phone: '',
	})
	const [isDisabled, setIsDisabled] = useState(false)
	const [isUploading, setIsuploading] = useState(false)
	const { isConnected } = useAccount()
	const [isOrganizer] = useOrganizer()
	const { isLoading, isSuccess, write } = useContractWrite({
		address: contractAddress,
		abi: CrowdFundingABI,
		functionName: 'createOrganizer',
		onSettled(data, error) {
			setIsuploading(false)
			console.log('Settled', { data, error })
		},
	})

	// prevent unauthorized access
	useEffect(() => {
		if (!isConnected || isOrganizer) {
			redirect('/')
		}
	}, [isConnected, isOrganizer])

	// check if all fields are filled or not
	useEffect(() => {
		const checkFill = () =>
			form.name === '' ||
			form.email === '' ||
			form.contact === '' ||
			form.profile === null ||
			form.phone === ''

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
		if (fieldName === 'profile') {
			const target = e.target as HTMLInputElement
			const files = Array.from(target.files as FileList)
			setForm((prevForm) => ({ ...prevForm, [fieldName]: files[0] }))
		} else setForm((prevForm) => ({ ...prevForm, [fieldName]: e.target.value }))
	}

	// Submit form data
	const handleSubmit = async () => {
		setIsuploading(true)

		const client = web3StorageClient
		const cid = await client.put(form.profile)
		// @ts-ignore
		const ipfsHash = await `https://${cid}.ipfs.dweb.link/${form.profile.name}`

		if (ipfsHash) setIsuploading(false)

		write({
			args: [form.name, form.contact, form.email, ipfsHash, form.phone],
		})
	}

	return (
		<main className='flex justify-center items-center flex-col pb-20 md:m-10 border-b sm:border-b-0 border-[#3a3a43]'>
			{(isLoading || isUploading) && (
				<div className='w-full h-screen bg-black/40 fixed top-0 left-0 right-0 flex justify-center items-center'>
					<p className='text-white text-2xl'>
						{' '}
						{isUploading ? 'Uploading images to ipfs' : 'Loading'}
					</p>
					<ReactLoading type='bubbles' color='#fff' />
				</div>
			)}
			{/* Heading */}
			<div className='flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px]'>
				<h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
					Register as Organizer
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
						labelName='Email *'
						placeholder='Enter your email'
						inputType='email'
						value={form.email}
						handleChange={(e) => handleFormFieldChange('email', e)}
					/>
				</div>

				<div className='flex flex-col lg:flex-row gap-[40px]'>
					<div className='w-full lg:w-1/2'>
						{/* contact */}
						<FormField
							labelName='Contact Address *'
							placeholder='Enter your contact address'
							isTextArea
							value={form.contact}
							handleChange={(e) => handleFormFieldChange('contact', e)}
						/>
					</div>

					<div className='w-full lg:w-1/2 flex flex-col gap-[40px]'>
						{/* Phone Number */}
						<FormField
							labelName='Phone Number *'
							placeholder='Enter your phone number'
							inputType='text'
							value={form.phone}
							handleChange={(e) => handleFormFieldChange('phone', e)}
						/>

						{/* Profile Image */}
						<FormField
							labelName='Profile Picture *'
							placeholder='Place your profile image'
							inputType='file'
							handleChange={(e) => handleFormFieldChange('profile', e)}
						/>
					</div>
				</div>

				{/* Submit Button */}
				<div className='flex justify-center items-center mt-[40px]'>
					<Button
						btnType='button'
						title='Register'
						isDisabled={isDisabled}
						handleClick={handleSubmit}
						styles='bg-green-500 disabled:opacity-40 disabled:text-black disabled:cursor-default'
					/>
				</div>
			</form>
		</main>
	)
}

export default CreateOrganizerPage
