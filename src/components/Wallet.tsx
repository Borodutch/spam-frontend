import '@rainbow-me/rainbowkit/styles.css'

import { PropsWithChildren } from 'preact/compat'
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { base } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import env from 'helpers/env'

const { chains, publicClient } = configureChains(
  [base],
  [alchemyProvider({ apiKey: env.VITE_ALCHEMY_BASE }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: '$SPAM',
  projectId: 'b5a3956f9dc9a3590b2244140b7caf82',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export default function ({ children }: PropsWithChildren) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode chains={chains} theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
