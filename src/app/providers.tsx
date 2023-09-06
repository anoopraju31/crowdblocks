'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon, sepolia, polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import '@rainbow-me/rainbowkit/styles.css'

type ProvidersType = {
	children: ReactNode
}

const { chains, publicClient } = configureChains(
	[mainnet, polygon, sepolia],
	[
		alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
		publicProvider(),
	],
)
const { connectors } = getDefaultWallets({
	appName: 'CrowdBlocks',
	projectId: process.env.PROJECT_ID as string,
	chains,
})
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
})

const appInfo = {
	appName: 'CrowdBlocks',
}

const Providers = ({ children }: ProvidersType) => {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains} appInfo={appInfo}>
				{mounted && children}
			</RainbowKitProvider>
		</WagmiConfig>
	)
}

export default Providers
