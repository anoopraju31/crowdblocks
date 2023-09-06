import React from 'react'
import { Button, StatBox } from '../components'
import Image from 'next/image'

const CompaignDetailsPage = () => {
	return (
		<main className='w-full min-h-screen py-10 bg-[#1c1c24]'>
			<div className='w-full max-w-7xl mx-auto flex md:flex-row flex-col mt-10 gap-[30px]'>
				{/* Images */}
				<div className='flex-1 flex-col'>
					<Image
						src='/premium_photo.avif'
						alt='campaign'
						width={600}
						height={400}
						className='w-full h-[410px] object-cover rounded-xl'
					/>
					<div className='relative w-full h-[5px] bg-[#3a3a43] mt-2'>
						<div
							className='absolute h-full bg-[#4acd8d]'
							style={{
								width: `10%`,
								maxWidth: '100%',
							}}></div>
					</div>
				</div>
				{/* Stats */}
				<div className='flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]'>
					<StatBox />
					<StatBox />
					<StatBox />
				</div>
			</div>
		</main>
	)
}

export default CompaignDetailsPage
