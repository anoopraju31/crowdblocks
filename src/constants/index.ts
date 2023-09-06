import { MdCreate } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'
import { IoPersonCircleOutline } from 'react-icons/io5'
import type { IconType } from 'react-icons'

export interface NavLinkType {
	name: string
	icon?: IconType
	link: string
}

export const navlinks = [
	{
		name: 'Home',
		icon: AiFillHome,
		link: '/',
	},
	{
		name: 'campaign',
		icon: MdCreate,
		link: '/create-compaign',
	},
	{
		name: 'profile',
		icon: IoPersonCircleOutline,
		link: '/profile',
	},
]
