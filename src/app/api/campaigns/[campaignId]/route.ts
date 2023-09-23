import { crowdBlocksContract } from '@/utils'
import { NextResponse } from 'next/server'

export async function GET(
	req: Request,
	{ params }: { params: { campaignId: string } },
) {
	const campaignId = Number(params.campaignId)
	let campaign = await crowdBlocksContract.campaigns(campaignId)
	let campaignImage = await crowdBlocksContract.getCampaignImages(campaignId)
	let contributions = await crowdBlocksContract.getCampaignContributions(
		campaignId,
	)
	let numberofCampaignsOrganized = Number(
		await crowdBlocksContract.getIdofCampaignsOrganizedByOrganizer(
			await campaign[0],
		),
	)
	let organizer = await crowdBlocksContract.organizers(await campaign[0])
	let profile = await organizer[4]

	campaign = campaign.map((item: any) =>
		typeof item === 'bigint' ? Number(item) : item,
	)

	return NextResponse.json({
		message: 'OK',
		campaign,
		campaignImage,
		contributions,
		numberofCampaignsOrganized,
		profile,
	})
}
