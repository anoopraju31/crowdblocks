import React from 'react'

type ButtonProps = {
	btnType: 'button' | 'submit' | 'reset' | undefined
	title: string
	handleClick?(): void
	styles: string
}

const Button = ({ btnType, title, handleClick, styles }: ButtonProps) => {
	return (
		<button
			type={btnType}
			className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
			onClick={handleClick}>
			{title}
		</button>
	)
}

export default Button
