'use client'
import ReactLoading from 'react-loading'

type LoadingProps = {
	isUploading: boolean
}

const Loading = ({ isUploading }: LoadingProps) => {
	return (
		<div className='w-full h-screen bg-black/40 fixed top-0 left-0 right-0 flex justify-center items-center'>
			<p className='text-white text-2xl'>
				{' '}
				{isUploading ? 'Uploading images to ipfs' : 'Loading'}
			</p>
			<ReactLoading type='bubbles' color='#fff' />
		</div>
	)
}

export default Loading
