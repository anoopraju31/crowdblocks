'use client'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Button } from '.'
import Link from 'next/link'
import { navlinks } from '@/constants'

const Navbar = () => {
	const [toggleDrawer, setToggleDrawer] = useState(false)
	const pathname = usePathname()

	return (
		<header className=' bg-[#13131a]'>
			{/* Large screen Navbar */}
			<div className='flex md:flex-row flex-col-reverse justify-between gap-6'>
				<div className='lg:flex-1 flex flex-row s-full md:max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]'>
					<input
						type='text'
						placeholder='Search for campaigns'
						className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none'
					/>

					<div className='w-[72px] h-full rounded-[20px] bg-green-500 flex justify-center items-center cursor-pointer'>
						<BiSearch />
					</div>
				</div>

				<div className='md:flex hidden flex-row justify-center gap-4'>
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

				{/* Small screen navigation */}
				<div className='md:hidden flex justify-between items-center relative'>
					<div className='w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
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

					<div
						onClick={() => setToggleDrawer((prev) => !prev)}
						className='w-[34px] h-[34px] rounded-full text-white hover:bg-green-500 flex justify-center items-center p-2 cursor-pointer'>
						<GiHamburgerMenu size={24} />
					</div>

					<div
						className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] rounded-[10px] z-10 shadow-secondary py-4 ${
							!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'
						} transition-all duration-700`}>
						<ul className='mb-4 mx-4'>
							{navlinks.map((link) => {
								const Icon = link.icon
								return (
									<li
										key={link.name}
										onClick={() => {
											setToggleDrawer(false)
										}}>
										<Link
											href={link.link}
											className={`flex p-4 rounded-[10px] cursor-pointer ${
												pathname === link.link && 'bg-[#3a3a43]'
											}`}>
											<div
												className={`w-[24px] h-[24px] object-contain  ${
													pathname === link.link
														? 'text-green-500'
														: 'text-white'
												}`}>
												<Icon />
											</div>

											<p
												className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
													pathname === link.name
														? 'text-green-500'
														: 'text-[#808191]'
												}`}>
												{link.name}
											</p>
										</Link>
									</li>
								)
							})}
						</ul>

						<div className='flex mx-4'>
							<Button
								btnType='button'
								title='Connect'
								styles='bg-purple-500 w-full'
							/>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Navbar
