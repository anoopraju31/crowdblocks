import React from 'react'

type StatBoxProps = {
	title: string
	value: number
}

const StatBox = ({ title, value }: StatBoxProps) => {
	return (
		<div className='w-full flex flex-col items-center '>
			<h4 className='font-epilogue font-bold text-2xl text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate'>
				{title}
			</h4>
			<p className='font-epilogue font-normal text-[16px] text-white bg-zinc-500 rounded-b-[10px] px-3 py-2 w-full rouned-b-[10px] text-center'>
				{value}
			</p>
		</div>
	)
}

export default StatBox
