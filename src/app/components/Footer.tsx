import React from 'react'
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
} from 'react-icons/fa'
import { BiLogoBitcoin } from 'react-icons/bi'

const Footer = () => {
	return (
		<footer className='text-[#808191]'>
			<div className='container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col'>
				<a className='flex title-font font-medium items-center md:justify-start justify-center text-white'>
					<div className='text-green-500'>
						<BiLogoBitcoin size={30} />
					</div>

					<span className='ml-3 text-xl'>Crowdblocks</span>
				</a>
				<p className='text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4'>
					© 2023 Crowdblocks
				</p>
				<span className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'>
					<a
						className='text-gray-400'
						href='https://www.facebook.com'
						target='_blank'>
						<FaFacebookF />
					</a>
					<a
						className='ml-3 text-gray-400'
						href='https://www.instagram.com'
						target='_blank'>
						<FaInstagram />
					</a>
					<a
						className='ml-3 text-gray-400'
						href='https://www.twitter.com'
						target='_blank'>
						<FaTwitter />
					</a>
					<a
						className='ml-3 text-gray-400'
						href='https://www.linkedin.com'
						target='_blank'>
						<FaLinkedinIn />
					</a>
				</span>
			</div>
		</footer>
	)
}

export default Footer
