import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain, http } from 'viem'
import { createConfig } from 'wagmi'

// ✅ Define Hedera Testnet
export const hederaTestnet = defineChain({
  id: 296, // Hedera Testnet chain ID
  name: 'Hedera Testnet',
  network: 'hedera-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'HBAR',
    symbol: 'HBAR',
  },
  rpcUrls: {
    default: { http: ['https://testnet.hashio.io/api'] },
    public: { http: ['https://testnet.hashio.io/api'] },
  },
  blockExplorers: {
    default: { name: 'HashScan', url: 'https://hashscan.io/testnet' },
  },
  testnet: true,
})

// ✅ Your WalletConnect Project ID
const projectId = '76aec883a60155fae2012fbcb508a430'

// ✅ Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [hederaTestnet],
  transports: {
    [hederaTestnet.id]: http('https://testnet.hashio.io/api'),
  },
})

export const reownAppKit = createAppKit({
  adapters: [wagmiAdapter as any],
  projectId,
  networks: [hederaTestnet] as any,
  themeMode: 'light',
  metadata: {
    name: 'DonateOnchain',
    description: 'Web3 Donation Platform',
    url: 'https://donateonchain.com',
    icons: ['https://donateonchain.com/logo.png'],
  },
})


export const wagmiConfig = createConfig({
  chains: [hederaTestnet],
  transports: {
    [hederaTestnet.id]: http('https://testnet.hashio.io/api'),
  
  },
})
