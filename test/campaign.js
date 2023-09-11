const { expect } = require('chai')
const { ethers } = require('hardhat')
const { organizerData, campaigns } = require('../testData')

describe('crowdfunding', () => {
	let organizer1, organizer2, donor1, donor2

	before(async () => {
		;[organizer1, organizer2, donor1, donor2] = await ethers.getSigners()
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

		it('Should include the campaign id in organizer details', async () => {
			const idofCampaignsOrganizedByOrganizer =
				await crowdBlocks.getIdofCampaignsOrganizedByOrganizer(
					organizer1.address,
				)

			expect(idofCampaignsOrganizedByOrganizer[0]).to.be.eq(1)
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

		it('Should return all the ids of active campaigns', async () => {
			const allActiveCampaigns = await crowdBlocks.getAllActiveCampaigns()

			expect(allActiveCampaigns[0]).to.be.eq(1)
			expect(allActiveCampaigns[1]).to.be.eq(2)
		})

		it('Should return all the ids of active campaigns', async () => {
			const allCompletedCampaigns = await crowdBlocks.getAllCompletedCampaigns()

			expect(allCompletedCampaigns.length).to.be.eq(0)
		})

		it('Should return the contract balance', async () => {
			const balance = await crowdBlocks.getContractBalance()

			expect(balance).to.be.eq(0)
		})
	})

	describe('Donate to a campaign', () => {
		it('Should retrieve details of campaign 1', async () => {
			const campaign = await crowdBlocks.campaigns(1)

			expect(campaign[0]).to.be.eq(organizer1.address)
			expect(campaign[1]).to.be.eq(campaigns[0][0])
			expect(campaign[2]).to.be.eq(campaigns[0][1])
			expect(campaign[4]).to.be.eq(campaigns[0][3])
			expect(campaign[5]).to.be.eq(campaigns[0][4])
		})

		it('Should donate to campaign 1', async () => {
			const donationTx = await crowdBlocks.connect(donor1).donateToCampaign(1, {
				value: ethers.parseUnits('1000000000000000000', 'wei'),
			})
			await donationTx.wait()

			const contractBalance = await crowdBlocks.getContractBalance()
			const campaign = await crowdBlocks.campaigns(1)
			const userContributions = await crowdBlocks.getUserContributions(
				donor1.address,
			)

			expect(contractBalance).to.be.eq(1000000000000000000n)
			expect(campaign[6]).to.be.eq(1000000000000000000n)
			expect(userContributions[0][0]).to.be.eq(1)
			expect(userContributions[0][1]).to.be.eq(1000000000000000000n)
		})

		it('Should emit DonatedToCampaign', async () => {
			await expect(
				crowdBlocks.connect(donor1).donateToCampaign(1, {
					value: ethers.parseUnits('100000000000', 'wei'),
				}),
			)
				.to.emit(crowdBlocks, 'DonatedToCampaign')
				.withArgs(1, donor1.address)
		})
	})

	describe('Complete a campaign', () => {
		it('Should Emit CampaignComplete event', async () => {
			await expect(
				crowdBlocks.connect(donor1).donateToCampaign(1, {
					value: ethers.parseUnits('1000000000000000000', 'wei'),
				}),
			)
				.to.emit(crowdBlocks, 'DonatedToCampaign')
				.withArgs(1, donor1.address)
				.to.emit(crowdBlocks, 'CampaignComplete')
				.withArgs(
					1,
					organizer1.address,
					campaigns[0][0],
					2000000100000000000n,
					2000000000000000000n,
				)
		})

		it('Should check the campaign status', async () => {
			const campaign = await crowdBlocks.campaigns(1)
			expect(campaign[7]).to.be.eq(true)
		})

		it('Should check the contract balance', async () => {
			const balance = await crowdBlocks.getContractBalance()
			expect(balance).to.be.eq(0n)
		})
	})
})
