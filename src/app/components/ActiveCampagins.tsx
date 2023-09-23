import { crowdBlocksContract } from '@/utils'
import { CampaignCard } from '.'

export const revalidate = 3600

const ActiveCampagins = async () => {
	const campaigns = await crowdBlocksContract.getAllActiveCampaigns()

	return (
		<section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-[20px] gap-[26px]'>
			{campaigns.length === 0 ? (
				<h1 className='w-full h-full col-span-12 underline text-white text-center'>
					{' '}
					No Active Campaigns available now!{' '}
				</h1>
			) : (
				// campaigns.map((campaignId: BigInt) => (
				// 	<CampaignCard
				// 		key={Number(campaignId)}
				// 		campaignId={Number(campaignId)}
				// 	/>
				// ))
				<></>
			)}
		</section>
	)
}

export default ActiveCampagins
