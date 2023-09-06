import Image from 'next/image'
import { CampaignCard } from './components'

export default function Home() {
	return (
		<main className='my-8 md:md-14'>
			<h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>
				{' '}
				All Campaigns{' '}
			</h1>

			{/* All Campaigns */}
			<section className='flex flex-wrap mt-[20px] gap-[26px]'>
				<CampaignCard />
				<CampaignCard />
				<CampaignCard />
				<CampaignCard />
				<CampaignCard />
				<CampaignCard />
				<CampaignCard />
				<CampaignCard />
				<CampaignCard />
				<CampaignCard />
				<CampaignCard />
				<CampaignCard />
				<CampaignCard />
				<CampaignCard />
			</section>
		</main>
	)
}
