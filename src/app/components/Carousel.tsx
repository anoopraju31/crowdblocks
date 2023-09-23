'use client'
import Image from 'next/image'
import { useState } from 'react'

type CarouselProps = {
	images: string[]
}

type ImageContainerProps = {
	isCurrent: boolean
	image: string
}

type IndicatorType = {
	id: number
	isCurrent: boolean
	handleChange: () => void
}

const ImageContainer = ({ isCurrent, image }: ImageContainerProps) => (
	<div
		className={`${isCurrent ? 'block' : 'hidden'} duration-700 ease-in-out`}
		data-carousel-item>
		<Image
			src={image}
			className='absolute block h-full object-contain -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
			alt=''
			width={600}
			height={400}
		/>
	</div>
)

const Indicator = ({ id, isCurrent, handleChange }: IndicatorType) => (
	<button
		key={id}
		type='button'
		className={`w-3 h-3 rounded-full ${
			isCurrent ? 'bg-gray-700' : 'bg-gray-400'
		}`}
		aria-current={isCurrent}
		onClick={handleChange}
		aria-label={`Slide ${id}`}
		data-carousel-slide-to={id}></button>
)

const Carousel = ({ images }: CarouselProps) => {
	const [currentSlide, setCurrentSlide] = useState<number>(0)
	return (
		<div
			id='default-carousel'
			className='relative w-full'
			data-carousel='slide'>
			{/* Carousel wrapper  */}
			<div className='relative h-56 overflow-hidden rounded-lg md:h-96'>
				{images.map((image, idx) => (
					<ImageContainer
						key={image}
						isCurrent={currentSlide == idx}
						image={image}
					/>
				))}
			</div>

			{/* Slider indicators */}
			{images.length > 1 && (
				<div className='absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2'>
					{images.map((image, idx) => (
						<Indicator
							key={image}
							id={idx}
							isCurrent={currentSlide == idx}
							handleChange={() => setCurrentSlide(idx)}
						/>
					))}
				</div>
			)}

			{/* Slider controls */}
			{images.length > 1 && (
				<>
					{/* Previous Button */}
					<button
						type='button'
						className='absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
						onClick={() =>
							setCurrentSlide((prev) =>
								prev === 0 ? images.length - 1 : (prev - 1) % images.length,
							)
						}
						data-carousel-prev>
						<span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
							<svg
								className='w-4 h-4 text-white dark:text-gray-800'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 6 10'>
								<path
									stroke='currentColor'
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M5 1 1 5l4 4'
								/>
							</svg>
							<span className='sr-only'>Previous</span>
						</span>
					</button>

					{/* Next Button */}
					<button
						type='button'
						className='absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
						onClick={() =>
							setCurrentSlide((prev) => (prev + 1) % images.length)
						}
						data-carousel-next>
						<span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
							<svg
								className='w-4 h-4 text-white dark:text-gray-800'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 6 10'>
								<path
									stroke='currentColor'
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='m1 9 4-4-4-4'
								/>
							</svg>
							<span className='sr-only'>Next</span>
						</span>
					</button>
				</>
			)}
		</div>
	)
}

export default Carousel
