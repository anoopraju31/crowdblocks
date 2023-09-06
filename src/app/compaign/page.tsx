import React from 'react'
import { Button, StatBox } from '../components'
import Image from 'next/image'

const CompaignDetailsPage = () => {
	return (
		<main className='w-full min-h-screen py-10 bg-[#1c1c24]'>
			<div className='w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0 mx-auto flex md:flex-row flex-col mt-10 gap-[30px]'>
				<div className='flex-1 flex-col'>
					{/* Images */}
					<Image
						src='/premium_photo.avif'
						alt='campaign'
						width={600}
						height={400}
						className='w-full h-[410px] object-cover rounded-xl'
					/>
					{/* Progress */}
					<div className='relative w-full h-[5px] bg-zinc-500 rounded mt-2'>
						<div
							className='absolute h-full bg-green-500 rounded'
							style={{
								width: `10%`,
								maxWidth: '100%',
							}}></div>
					</div>
				</div>

				{/* Stats */}
				<div className='flex md:w-[300px] w-full flex-wrap justify-between gap-[30px]'>
					<StatBox title='Days Left' value={120} />
					<StatBox title='Raise of $1600' value={100} />
					<StatBox title='Total Backers' value={13} />
				</div>
			</div>
		</main>
	)
}

export default CompaignDetailsPage
