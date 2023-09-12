'use client'

import { useState } from 'react'
import { Button, FormField } from '../components'

type Form = {
	name: string
	email: string
	contact: string
	profile: string
	phone: string
}

const CreateOrganizerPage = () => {
	const [form, setForm] = useState<Form>({
		name: '',
		email: '',
		contact: '',
		profile: '',
		phone: '',
	})

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
					<Button btnType='submit' title='Register' styles='bg-green-500' />
				</div>
			</form>
		</main>
	)
}

export default CreateOrganizerPage
