const { expect } = require('chai')
const { ethers, waffle } = require('hardhat')

describe('crowdfunding', () => {
	let owner, organizer1, organizer2, donor

	before(async () => {
		;[organizer1, organizer2, donor] = await ethers.getSigners()
		const CrowdBlocks = await ethers.getContractFactory('CrowdBlocks')
		crowdBlocks = await CrowdBlocks.deploy()
	})

	describe('Create an organizer', () => {
		it('Should create an organizer', async () => {
			const organizerData = [
				'Anoop Raju',
				'BDB202 Meenachil Hostel',
				'anoop2019@iiitkottayam.ac.in',
				'https://web-static.wrike.com/cdn-cgi/image/width=880,format=auto,q=80/blog/content/uploads/2022/06/iStock-1322301439.jpg?av=c54f6504d1bbea32efb28835736b9900',
				9876543210,
			]
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
	})
})
