import { CrowdFundingABI } from '@/abis/crowdFunding'
import { contractAddress } from '@/constants'
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
	contractAddress,
	CrowdFundingABI,
	provider,
)

export async function getCampaign(id: string) {
	try {
		const response = await fetch(`http://localhost:3000/api/campaigns/${id}`)

		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`)
		}

		const result = await response.json()

		return result
	} catch (err) {
		console.log(err)
	}
}
