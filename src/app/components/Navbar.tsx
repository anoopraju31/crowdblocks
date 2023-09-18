'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useContractRead } from 'wagmi'
import { BiSearch, BiUserPlus, BiLogoBitcoin } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CheckOrganizerType } from '@/types'
import type { IconType } from 'react-icons'
import { MdCreate } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import { contractAddress } from '@/constants'

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
		address: contractAddress,
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

				<div className='lg:flex hidden flex-row justify-center gap-4'>
					<ConnectButton />
				</div>

				<div className='hidden md:flex  lg:hidden flex-row justify-center gap-4'>
					<ConnectButton showBalance={false} />
				</div>

				{/* Small screen navigation */}
				<div className='md:hidden flex justify-between items-center relative'>
					<div className='text-green-500'>
						<BiLogoBitcoin size={30} />
					</div>

					<div
						onClick={() => setToggleDrawer((prev) => !prev)}
						className='w-[34px] h-[34px] rounded-full text-white hover:bg-green-500 flex justify-center items-center p-2 cursor-pointer'>
						<GiHamburgerMenu size={26} />
					</div>

					<div
						className={`absolute top-[60px] right-0 left-0 bg-[#13131ac8] rounded-[10px] z-10 shadow-secondary py-4 ${
							!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'
						} transition-all duration-700 backdrop-blur-3xl`}>
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
									icon={BiUserPlus}
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
									icon={IoPersonCircleOutline}
									link='/profile'
									name='Profile'
									pathname={pathname}
									toggle={closeDrawer}
								/>
							)}
						</ul>

						<div className='flex py-4 mx-4'>
							<ConnectButton showBalance={true} />
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Navbar
