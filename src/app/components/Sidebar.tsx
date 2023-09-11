'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAccount, useContractRead } from 'wagmi'
import type { IconType } from 'react-icons'
import { BiLogoBitcoin, BiUserPlus } from 'react-icons/bi'
import { MdCreate } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { CrowdFundingABI } from '@/abis/crowdFunding'

type Icon = {
	styles?: string
	link: string
	icon: IconType
	isActive?: boolean
	disabled?: boolean
}

const Icon = ({ styles, icon, link, isActive, disabled }: Icon) => {
	const NavIcon = icon
	return (
		<Link
			href={link}
			className={`w-8 h-8 rounded-[10px] ${
				isActive && 'bg-[#2c2f32]'
			} flex justify-center items-center ${
				isActive ? 'text-green-500' : 'text-[#808191]'
			} ${!disabled && 'cursor-pointer'} ${styles}`}>
			<NavIcon size={22} />
		</Link>
	)
}

const Sidebar = () => {
	const account = useAccount()
	const pathname = usePathname()
	const contractRead = useContractRead({
		address: '0x4d0b4A2014e64d76CcF0F2E1898bAeba440F7C02',
		abi: CrowdFundingABI,
		functionName: 'isOrganizer',
		args: [account.address],
	})

	return (
		<div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
			<Icon
				styles='w-[52px] h-[52px] bg-[#2c2f32]'
				link='/'
				icon={BiLogoBitcoin}
			/>

			<div className='flex-1 flex  flex-col justify-between items-center bg-[#1c1c24] rounded-xl px-2 py-4 mt-12'>
				<div className='flex flex-col justify-center items-center gap-3'>
					<Icon
						key='Home'
						icon={AiFillHome}
						link='/'
						isActive={pathname == '/'}
					/>
					{contractRead?.data === true && (
						<Icon
							key='Create Campaign'
							icon={MdCreate}
							link='/create-campaign'
							isActive={pathname == '/create-campaign'}
						/>
					)}
					{contractRead?.data === false && (
						<Icon
							key='Create Organizer'
							icon={BiUserPlus}
							link='/create-organizer'
							isActive={pathname == '/create-organizer'}
						/>
					)}
					<Icon
						key='Profile'
						icon={IoPersonCircleOutline}
						link='/profile'
						isActive={pathname == '/profile'}
					/>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
