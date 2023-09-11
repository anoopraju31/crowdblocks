require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.19',
	settings: {
		optimizer: {
			enabled: true,
			runs: 1000,
		},
		viaIR: true,
	},
	defaultNetwork: 'sepolia',
	networks: {
		sepolia: {
			url: process.env.API_URL,
			accounts: [process.env.PRIVATE_KEY],
		},
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
}
