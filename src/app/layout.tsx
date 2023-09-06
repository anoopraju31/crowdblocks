import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar, SideBar } from './components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row'>
					<div className='sm:flex hidden mr-10 relative'>
						<SideBar />
					</div>

					<div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
						<Navbar />

						{children}
					</div>
				</div>
			</body>
		</html>
	)
}
