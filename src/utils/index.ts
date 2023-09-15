import { CrowdFundingABI } from '@/abis/crowdFunding'
import { AlchemyProvider, ethers } from 'ethers'

export const getNumberOfDaysLeft = (timestamp: number): number => {
	let timestampPresent = Math.floor(new Date().getTime() / 1000.0)

	return Math.ceil((timestamp - timestampPresent) / (60 * 60 * 24))
}

const provider = new AlchemyProvider(
	'sepolia',
	process.env.NEXT_PUBLIC_ALCHEMY_ID,
)
export const crowdBlocksContract = new ethers.Contract(
	'0x4d0b4A2014e64d76CcF0F2E1898bAeba440F7C02',
	CrowdFundingABI,
	provider,
)
