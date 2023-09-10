const { expect } = require('chai')
const { ethers } = require('hardhat')
const { campaigns } = require('../testData')

describe('crowdfunding', () => {
	let organizer1, organizer2, donor

	before(async () => {
		;[organizer1, organizer2, donor] = await ethers.getSigners()
		const CrowdBlocks = await ethers.getContractFactory('CrowdBlocks')
		crowdBlocks = await CrowdBlocks.deploy()
	})

	describe('Create a campaign', () => {
		it('Should create a campaign', async () => {
			const tx = await crowdBlocks.createCampaign(...campaigns[0])
			await tx.wait()

			const campaign = await crowdBlocks.campaigns(1)

			expect(campaign[0]).to.be.eq(organizer1.address)
			expect(campaign[1]).to.be.eq(campaigns[0][0])
			expect(campaign[2]).to.be.eq(campaigns[0][1])
			expect(campaign[4]).to.be.eq(campaigns[0][3])
			expect(campaign[5]).to.be.eq(campaigns[0][4])
		})
	})
})
