'use client'
import { useState } from 'react'
import { StatBox } from '.'
import { CrowdFundingABI } from '@/abis/crowdFunding'
import { useContractRead } from 'wagmi'
import { CampaignType } from '@/types'
import { getNumberOfDaysLeft } from '@/utils'

type CampaignStatsType = {
	targetAmount: number
	collectedAmount: number
	numberOfDaysLeft: number
	campaignId: number
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

	useContractRead({
		address: '0x4d0b4A2014e64d76CcF0F2E1898bAeba440F7C02',
		abi: CrowdFundingABI,
		functionName: 'campaigns',
		args: [campaignId],
		onSuccess(data: CampaignType) {
			if (data !== null) {
				//  @ts-ignore
				setTarget(Number(data[5]) / 10 ** 18)
				//  @ts-ignore
				setCollected(Number(data[6]) / 10 ** 18)
				//  @ts-ignore
				setDaysLeft(getNumberOfDaysLeft(Number(data[4])))
			}
		},
		watch: true,
	})
	return (
		<div className='flex md:w-[300px] w-full flex-col justify-between gap-[30px]'>
			<StatBox title='Days Left' value={daysLeft} />
			<StatBox title={`Raise of ${target} ETH`} value={collected} />
			<StatBox title='Total Backers' value={13} />
		</div>
	)
}

export default CampaignStats
