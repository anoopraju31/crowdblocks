'use client'
import { useState } from 'react'
import { StatBox } from '.'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import { useContractRead } from 'wagmi'
import { CampaignType } from '@/types'
import { getNumberOfDaysLeft } from '@/utils'
import { contractAddress } from '@/constants'

type CampaignStatsType = {
	targetAmount: number
	collectedAmount: number
	numberOfDaysLeft: number
	campaignId: number
}

type ContributionsType = {
	address: string
	donation: bigint
	timestamp: bigint
}

const CampaignStats = ({
	targetAmount,
	collectedAmount,
	numberOfDaysLeft,
	campaignId,
}: CampaignStatsType) => {
	const [target, setTarget] = useState(targetAmount)
	const [collected, setCollected] = useState(collectedAmount)
	const [daysLeft, setDaysLeft] = useState(numberOfDaysLeft)
	const [backers, setBackers] = useState<number>(0)

	useContractRead({
		address: contractAddress,
		abi: CrowdFundingABI,
		functionName: 'campaigns',
		args: [campaignId],
		onSuccess(data: CampaignType) {
			if (data !== null) {
				//  @ts-ignore
				setTarget(Number(data[6]) / 10 ** 18)
				//  @ts-ignore
				setCollected(Number(data[7]) / 10 ** 18)
				//  @ts-ignore
				setDaysLeft(getNumberOfDaysLeft(Number(data[5])))
			}
		},
		watch: true,
	})

	useContractRead({
		address: contractAddress,
		abi: CrowdFundingABI,
		functionName: 'getCampaignContributions',
		args: [campaignId],
		onSuccess(data: ContributionsType[]) {
			// @ts-ignore
			setBackers(data ? data.length : 0)
		},
		watch: true,
	})

	return (
		<div className='flex md:w-[300px] w-full flex-col justify-between gap-[30px]'>
			<StatBox title='Days Left' value={daysLeft} />
			<StatBox title={`Raise of ${target} ETH`} value={collected} />
			<StatBox title='Total Backers' value={backers} />
		</div>
	)
}

export default CampaignStats
