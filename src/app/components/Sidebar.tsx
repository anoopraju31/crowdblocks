'use client'
import { navlinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { IconType } from 'react-icons'
import React from 'react'
import { BiLogoBitcoin } from 'react-icons/bi'

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
	const pathname = usePathname()
	return (
		<div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
			<Icon
				styles='w-[52px] h-[52px] bg-[#2c2f32]'
				link='/'
				icon={BiLogoBitcoin}
			/>

			<div className='flex-1 flex  flex-col justify-between items-center bg-[#1c1c24] rounded-xl px-2 py-4 mt-12'>
				<div className='flex flex-col justify-center items-center gap-3'>
					{navlinks.map((link) => (
						<Icon key={link.name} {...link} isActive={pathname == link.link} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Sidebar
