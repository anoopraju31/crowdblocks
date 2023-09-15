'use client'
import React, { useEffect, useState } from 'react'
import { Button, FormField } from '.'
import { useAccount, useContractWrite } from 'wagmi'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import { parseEther } from 'ethers'
import ReactLoading from 'react-loading'

type DonationFormType = {
	campaignId: number
}

const DonationForm = ({ campaignId }: DonationFormType) => {
	const [amount, setAmount] = useState<number | string>('')
	const [isDisabled, setIsDisabled] = useState(false)
	const { isConnected } = useAccount()
	const { isLoading, isSuccess, write } = useContractWrite({
		address: '0x4d0b4A2014e64d76CcF0F2E1898bAeba440F7C02',
		abi: CrowdFundingABI,
		functionName: 'donateToCampaign',
	})

	useEffect(() => {
		if (!isConnected && (amount === '' || amount === 0)) setIsDisabled(true)
	}, [isConnected, amount])

	const handleSubmit = () => {
		write({
			args: [campaignId],
			value: parseEther(String(amount)),
		})

		setAmount('')
	}
	return (
		<div className='relative mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
			{isLoading && (
				<div className='w-full h-full bg-[#1c1c24]/60 rounded-[10px] absolute top-0 left-0 right-0 flex justify-center items-center'>
					<p className='text-white text-xl'> Loading </p>
					<ReactLoading type='bubbles' color='#fff' />
				</div>
			)}
			<p className='font-epilogue fount-medium text-[20px] pt-1 leading-[30px] text-center text-[#808191]'>
				Fund the campaign
			</p>
			<div className='mt-5'>
				<FormField
					placeholder='ETH 0.1'
					inputType='number'
					value={amount}
					handleChange={(e) => setAmount(e.target.value)}
				/>

				<div className='my-[20px] p-4 bg-[#13131a] rounded-[10px]'>
					<h4 className='font-epilogue font-semibold text-[14px] leading-[22px] text-white'>
						Back it because you believe in it.
					</h4>
					<p className='mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]'>
						Support the project for no reward, just because it speaks to you.
					</p>
				</div>

				<Button
					btnType='button'
					isDisabled={isDisabled}
					title='Fund Campaign'
					styles=' w-full bg-green-500 disabled:opacity-40 disabled:text-black disabled:cursor-default'
					handleClick={handleSubmit}
				/>
			</div>
		</div>
	)
}

export default DonationForm
