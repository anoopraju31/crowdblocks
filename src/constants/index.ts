import { MdCreate } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'
import { IoPersonCircleOutline } from 'react-icons/io5'
import type { IconType } from 'react-icons'
//@ts-ignore
import { Web3Storage } from 'web3.storage'

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
		link: '/create-campaign',
	},
	{
		name: 'profile',
		icon: IoPersonCircleOutline,
		link: '/profile',
	},
]

export const contractAddress = '0x03a1Aa5a31e1578CA0b0c71168c8263667068850'

export const status = ['all', 'active', 'closed']
export const categories = [
	'all',
	'Healthcare',
	'Education',
	'Environment',
	'Technology',
	'Art & Science',
	'Social Causes',
	'Animal Welfare',
	'Sports',
	'Communal',
]

export const category = [
	'Animal Welfare',
	'Art & Science',
	'Communal',
	'Education',
	'Environment',
	'Healthcare',
	'Social Causes',
	'Sports',
	'Technology',
]

export const web3StorageClient = new Web3Storage({
	token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY,
})
