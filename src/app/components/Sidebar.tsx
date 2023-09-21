'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAccount } from 'wagmi'
import type { IconType } from 'react-icons'
import { BiLogoBitcoin, BiUserPlus } from 'react-icons/bi'
import { MdCreate, MdCampaign } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { useOrganizer } from '../hooks'

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
	const { isConnected } = useAccount()
	const [isOrganizer] = useOrganizer()
	const pathname = usePathname()

	return (
		<div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
			<Icon
				styles='w-[52px] h-[52px] bg-[#2c2f32] text-green-500'
				link='/'
				icon={BiLogoBitcoin}
			/>

			<div className='flex-1 flex  flex-col justify-between items-center bg-[#1c1c24] rounded-xl px-2 py-4 mt-12'>
				<div className='flex flex-col justify-center items-center gap-3'>
					<Icon icon={AiFillHome} link='/' isActive={pathname == '/'} />
					<Icon
						icon={MdCampaign}
						link='/campaigns'
						isActive={pathname == '/campaigns'}
					/>
					{isOrganizer && (
						<Icon
							icon={MdCreate}
							link='/create-campaign'
							isActive={pathname == '/create-campaign'}
						/>
					)}
					{!isOrganizer && isConnected && (
						<Icon
							icon={BiUserPlus}
							link='/create-organizer'
							isActive={pathname == '/create-organizer'}
						/>
					)}
					{isConnected && (
						<Icon
							icon={IoPersonCircleOutline}
							link='/profile'
							isActive={pathname == '/profile'}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default Sidebar
