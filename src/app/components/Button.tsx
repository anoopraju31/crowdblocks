import React from 'react'

type ButtonProps = {
	btnType: 'button' | 'submit' | 'reset' | undefined
	title: string
	handleClick?(): void
	styles: string
	isDisabled?: boolean
}

const Button = ({
	btnType,
	title,
	handleClick,
	styles,
	isDisabled = false,
}: ButtonProps) => {
	return (
		<button
			type={btnType}
			disabled={isDisabled}
			className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
			onClick={handleClick}>
			{title}
		</button>
	)
}

export default Button
