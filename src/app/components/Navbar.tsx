'use client'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
	useAccount,
	useContractRead,
	useEnsAvatar,
	useEnsName,
	useWalletClient,
} from 'wagmi'
import { CheckOrganizerType } from '@/types'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import type { IconType } from 'react-icons'
import { MdCreate } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'
import { IoPersonCircleOutline } from 'react-icons/io5'

type NavLinkProps = {
	icon: IconType
	name: string
	link: string
	pathname: string
	toggle: () => void
}

const NavLink = ({ icon, name, link, pathname, toggle }: NavLinkProps) => {
	const Icon = icon
	return (
		<li className='mb-4' onClick={toggle}>
			<Link
				href={link}
				className={`flex p-4 rounded-[10px] hover:bg-green-500 hover:text-white cursor-pointer ${
					pathname === link ? 'bg-green-500 text-white' : 'text-[#808191] '
				}`}>
				<div className={`w-[24px] h-[24px] object-contain`}>
					<Icon size={26} />
				</div>

				<p className='ml-[20px] font-epilogue font-semibold text-[14px]'>
					{name}
				</p>
			</Link>
		</li>
	)
}

const Navbar = () => {
	const [toggleDrawer, setToggleDrawer] = useState(false)
	const pathname = usePathname()
	const { address, isConnected } = useAccount()
	const { data: isOrganizer }: CheckOrganizerType = useContractRead({
		address: '0x4d0b4A2014e64d76CcF0F2E1898bAeba440F7C02',
		abi: CrowdFundingABI,
		functionName: 'isOrganizer',
		args: [address],
		watch: true,
	})
	const closeDrawer = () => setToggleDrawer(false)

	return (
		<header className=' bg-[#13131a]'>
			{/* Large screen Navbar */}
			<div className='flex md:flex-row flex-col-reverse justify-between gap-6'>
				<div className='lg:flex-1 '>
					{pathname === '/' && (
						<div className='flex flex-row s-full md:max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]'>
							<input
								type='text'
								placeholder='Search for campaigns'
								className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none'
							/>

							<div className='w-[72px] h-full rounded-[20px] bg-green-500 flex justify-center items-center cursor-pointer'>
								<BiSearch />
							</div>
						</div>
					)}
				</div>

				<div className='md:flex hidden flex-row justify-center gap-4'>
					{/* <Button btnType='button' title='Connect' styles='bg-purple-500' /> */}
					<ConnectButton />

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
							<NavLink
								icon={AiFillHome}
								link='/'
								name='Home'
								pathname={pathname}
								toggle={closeDrawer}
							/>
							{isConnected && !isOrganizer && (
								<NavLink
									icon={IoPersonCircleOutline}
									link='/create-organizer'
									name='Register As Organizer'
									pathname={pathname}
									toggle={closeDrawer}
								/>
							)}
							{isConnected && isOrganizer && (
								<NavLink
									icon={MdCreate}
									link='/create-campaign'
									name='Create Campaign'
									pathname={pathname}
									toggle={closeDrawer}
								/>
							)}
							{isConnected && (
								<NavLink
									icon={AiFillHome}
									link='/profile'
									name='Profile'
									pathname={pathname}
									toggle={closeDrawer}
								/>
							)}
						</ul>

						<div className='flex mx-4'>
							{/* <Button
								btnType='button'
								title='Connect'
								styles='bg-purple-500 w-full'
							/> */}
							<ConnectButton
								showBalance={false}
								chainStatus='icon'
								accountStatus='avatar'
							/>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Navbar
