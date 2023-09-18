import React from 'react'

type FormFieldProps = {
	labelName?: string
	placeholder: string
	inputType?: string
	isTextArea?: boolean
	value?: string | number | string[]
	handleChange: (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => void
}

const FormField = ({
	labelName,
	placeholder,
	inputType,
	isTextArea,
	value,
	handleChange,
}: FormFieldProps) => {
	return (
		<label className='flex-1 w-full flex flex-col group'>
			{labelName && (
				<span className='font-epilogue font-medium text-[14px] leading-[22px] mb-[10px] text-white'>
					{labelName}
				</span>
			)}
			{isTextArea ? (
				<textarea
					required
					value={value}
					rows={10}
					placeholder={placeholder}
					onChange={handleChange}
					className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] focus:border-green-500 bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]'
				/>
			) : (
				<input
					required
					value={value}
					type={inputType}
					step='0.00001'
					multiple
					placeholder={placeholder}
					onChange={handleChange}
					className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] focus:border-green-500 bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]'
				/>
			)}
		</label>
	)
}

export default FormField
