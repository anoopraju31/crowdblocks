'use client'
import React from 'react'
import { Dropdown } from '../components'
import { categories, status } from '@/constants'

const CampaignsPage = () => {
	return (
		<main className='my-8 md:md-14'>
			<div className='flex justify-between items-center'>
				<h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>
					All Campaigns
				</h1>
				<div className='flex gap-4'>
					<Dropdown title='status' values={status} />
					<Dropdown title='category' values={categories} />
				</div>
			</div>
			CampaignsPage
		</main>
	)
}

export default CampaignsPage
