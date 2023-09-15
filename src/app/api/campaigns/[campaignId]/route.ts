import { crowdBlocksContract } from '@/utils'
import { NextResponse } from 'next/server'

export async function GET(
	req: Request,
	{ params }: { params: { campaignId: string } },
) {
	const campaignId = Number(params.campaignId)
	let campaign = await crowdBlocksContract.campaigns(campaignId)
	let campaignImage = await crowdBlocksContract.getCampaignImages(campaignId)
	// console.log(campaignImage)

	campaign = campaign.map((item: any) =>
		typeof item === 'bigint' ? Number(item) : item,
	)

	return NextResponse.json({ message: 'OK', campaign, campaignImage })
}
