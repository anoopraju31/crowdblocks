import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Navbar = () => {
	return (
		<header className='pt-4 bg-[#13131a]'>
			<div className='w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0 mx-auto flex md:flex-row flex-col-reverse justify-between gap-6'>
				<div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]'>
					<input
						type='text'
						placeholder='Search for campaigns'
						className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none'
					/>

					<div className='w-[72px] h-full rounded-[20px] bg-green-500 flex justify-center items-center cursor-pointer'>
						<BiSearch />
					</div>
				</div>
			</div>
		</header>
	)
}

export default Navbar
