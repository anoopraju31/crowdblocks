const { expect } = require('chai')
const { ethers } = require('hardhat')
const { organizerData, campaigns } = require('../testData')

describe('crowdfunding', () => {
	let organizer1, organizer2, donor

	before(async () => {
		;[organizer1, organizer2, donor] = await ethers.getSigners()
		const CrowdBlocks = await ethers.getContractFactory('CrowdBlocks')
		crowdBlocks = await CrowdBlocks.deploy()
	})

	describe('Create a campaign', () => {
		it('Should create a campaign', async () => {
			const organizertx = await crowdBlocks.createOrganizer(...organizerData)
			await organizertx.wait()

			const tx = await crowdBlocks.createCampaign(...campaigns[0])
			await tx.wait()

			const campaign = await crowdBlocks.campaigns(1)

			expect(campaign[0]).to.be.eq(organizer1.address)
			expect(campaign[1]).to.be.eq(campaigns[0][0])
			expect(campaign[2]).to.be.eq(campaigns[0][1])
			expect(campaign[4]).to.be.eq(campaigns[0][3])
			expect(campaign[5]).to.be.eq(campaigns[0][4])
		})

		it('Should revert if the sender is not an organizer', async () => [
			await expect(
				crowdBlocks.connect(organizer2).createCampaign(...campaigns[0]),
			).to.be.rejectedWith('Only organizer is allowed to create campaign'),
		])

		it('Should emit CampaignCreated event', async () => {
			await expect(
				crowdBlocks.connect(organizer1).createCampaign(...campaigns[1]),
			).to.emit(crowdBlocks, 'CampaignCreated')
		})

		it('Should return the image from a campaign', async () => {
			const campaignImage = await crowdBlocks.getCampaignImage(1)

			expect(campaignImage).to.be.eq(campaigns[0][2][0])
		})

		it('Should return all the images from a campaign', async () => {
			const campaignImages = await crowdBlocks.getCampaignImages(1)

			expect(campaignImages[0]).to.be.eq(campaigns[0][2][0])
		})
	})
})
