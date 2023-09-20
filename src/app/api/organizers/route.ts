import { crowdBlocksContract } from '@/utils'
import { NextResponse } from 'next/server'

type Params = {
	params: { address: string }
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const address = searchParams.get('address')

	let organizer = await crowdBlocksContract.organizers(address)
	console.log(organizer)
	organizer = organizer.map((item: any) =>
		typeof item === 'bigint' ? Number(item) : item,
	)

	return NextResponse.json({ organizer })
}
