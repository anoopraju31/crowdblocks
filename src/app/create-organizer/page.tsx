'use client'

import React, { useEffect, useState } from 'react'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import { redirect } from 'next/navigation'
import ReactLoading from 'react-loading'
import { Button, FormField } from '../components'
import { CrowdFundingABI } from '@/abis/crowdFunding'

type Form = {
	name: string
	email: string
	contact: string
	profile: string
	phone: string
}

type CheckOrganizerType = {
	data: boolean | undefined
}

const CreateOrganizerPage = () => {
	const [form, setForm] = useState<Form>({
		name: '',
		email: '',
		contact: '',
		profile: '',
		phone: '',
	})
	const [isDisabled, setIsDisabled] = useState(false)
	const { address, isConnected } = useAccount()
	const { data: isOrganizer }: CheckOrganizerType = useContractRead({
		address: '0x4d0b4A2014e64d76CcF0F2E1898bAeba440F7C02',
		abi: CrowdFundingABI,
		functionName: 'isOrganizer',
		args: [address],
	})
	const { isLoading, isSuccess, write } = useContractWrite({
		address: '0x4d0b4A2014e64d76CcF0F2E1898bAeba440F7C02',
		abi: CrowdFundingABI,
		functionName: 'createOrganizer',
	})

	useEffect(() => {
		if (!isConnected || isOrganizer) {
			redirect('/')
		}
	}, [isConnected, isOrganizer])

	useEffect(() => {
		const checkFill = () =>
			form.name === '' ||
			form.email === '' ||
			form.contact === '' ||
			form.profile === '' ||
			form.phone === ''

		setIsDisabled(checkFill())
	}, [form])

	useEffect(() => {
		if (isSuccess) redirect('/')
	}, [isSuccess])

	const handleFormFieldChange = (
		fieldName: string,
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setForm({ ...form, [fieldName]: e.target.value })
	}

	const handleSubmit = () => {
		write({
			args: [form.name, form.contact, form.email, form.profile, form.phone],
		})
	}

	return (
		<main className='flex justify-center items-center flex-col m-10'>
			{isLoading && (
				<div className='w-full h-screen bg-black/40 fixed top-0 left-0 right-0 flex justify-center items-center'>
					<p className='text-white text-2xl'> Loading </p>
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
							inputType='url'
							value={form.profile}
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
						styles='bg-green-500'
					/>
				</div>
			</form>
		</main>
	)
}

export default CreateOrganizerPage
