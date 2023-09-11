const { expect } = require('chai')
const { ethers } = require('hardhat')
const { organizerData, organizer2Data } = require('../testData')

describe('crowdfunding', () => {
	let organizer1, organizer2, donor

	before(async () => {
		;[organizer1, organizer2, donor] = await ethers.getSigners()
		const CrowdBlocks = await ethers.getContractFactory('CrowdBlocks')
		crowdBlocks = await CrowdBlocks.deploy()
	})

	describe('Create an organizer', () => {
		it('Should create an organizer', async () => {
			const tx = await crowdBlocks.createOrganizer(...organizerData)
			await tx.wait()

			const organizer = await crowdBlocks.organizers(organizer1.address)

			expect(organizer[0]).to.be.eq(organizer1.address)
			expect(organizer[1]).to.be.eq(organizerData[0])
			expect(organizer[2]).to.be.eq(organizerData[1])
			expect(organizer[3]).to.be.eq(organizerData[2])
			expect(organizer[4]).to.be.eq(organizerData[3])
			expect(organizer[5]).to.be.eq(organizerData[4])
		})

		it('Should emit OrganizerCreated event', async () => {
			await expect(
				crowdBlocks.connect(organizer2).createOrganizer(...organizer2Data),
			)
				.to.emit(crowdBlocks, 'OrganizerCreated')
				.withArgs(organizer2.address, organizer2Data[0], organizer2Data[2])
		})

		it('Should revert if an organizer with same address exists', async () => {
			await expect(
				crowdBlocks.connect(organizer1).createOrganizer(...organizerData),
			).to.be.rejectedWith('Organizer exists with this address')
		})

		it('Should Check isOrangizer', async () => {
			const check1 = await crowdBlocks.isOrganizer()
			const check2 = await crowdBlocks.connect(donor).isOrganizer()

			expect(check1).to.be.eq(true)
			expect(check2).to.be.eq(false)
		})
	})
})
