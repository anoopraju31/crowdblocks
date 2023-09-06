import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { Button } from '.'
import Link from 'next/link'

const Navbar = () => {
	return (
		<header className='pt-4 bg-[#13131a]'>
			<div className='w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0 mx-auto flex md:flex-row flex-col-reverse justify-between gap-6'>
				<div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]'>
					<input
						type='text'
						placeholder='Search for campaigns'
						className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none'
					/>

					<div className='w-[72px] h-full rounded-[20px] bg-green-500 flex justify-center items-center cursor-pointer'>
						<BiSearch />
					</div>
				</div>

				<div className='sm:flex hidden flex-row justify-center gap-4'>
					<Button btnType='button' title='Connect' styles='bg-purple-500' />

					<Link href='/profile'>
						<div className='w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
							<svg x='0' y='0' width='24' height='24'>
								<rect
									x='0'
									y='0'
									width='24'
									height='24'
									transform='translate(6.525467147921928 -0.07667628804068606) rotate(491.2 12 12)'
									fill='#018E74'></rect>
								<rect
									x='0'
									y='0'
									width='24'
									height='24'
									transform='translate(-9.540876339975153 2.016251393825418) rotate(174.8 12 12)'
									fill='#18CAF2'></rect>
								<rect
									x='0'
									y='0'
									width='24'
									height='24'
									transform='translate(-6.575909483438352 19.994128215112603) rotate(223.8 12 12)'
									fill='#FA3E00'></rect>
							</svg>
						</div>
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Navbar
