'use client'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import { contractAddress } from '@/constants'
import React from 'react'
import { useAccount, useContractRead } from 'wagmi'

type CheckOrganizerType = {
	data?: boolean | undefined
}

const useOrganizer = () => {
	const { address } = useAccount()
	const { data: isOrganizer }: CheckOrganizerType = useContractRead({
		address: contractAddress,
		abi: CrowdFundingABI,
		functionName: 'isOrganizer',
		args: [address],
	})

	return [isOrganizer]
}

export default useOrganizer
