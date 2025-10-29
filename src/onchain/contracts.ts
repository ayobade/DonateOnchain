import CONTRACTS from '../../frontend/src/contracts/addresses.js'
import AdminRegistryAbi from '../../frontend/src/contracts/AdminRegistry.sol.abi.json'
import NGORegistryAbi from '../../frontend/src/contracts/NGORegistry.sol.abi.json'
import DesignerRegistryAbi from '../../frontend/src/contracts/DesignerRegistry.sol.abi.json'
import FileManagerAbi from '../../frontend/src/contracts/FileManager.sol.abi.json'
import CampaignRegistryAbi from '../../frontend/src/contracts/CampaignRegistry.sol.abi.json'
import DonationManagerAbi from '../../frontend/src/contracts/DonationManager.sol.abi.json'
import ProofNFTAbi from '../../frontend/src/contracts/ProofNFT.sol.abi.json'
import DesignMarketplaceAbi from '../../frontend/src/contracts/DesignMarketplace.sol.abi.json'

export const addresses = CONTRACTS

export const abis = {
  AdminRegistry: AdminRegistryAbi as const,
  NGORegistry: NGORegistryAbi as const,
  DesignerRegistry: DesignerRegistryAbi as const,
  FileManager: FileManagerAbi as const,
  CampaignRegistry: CampaignRegistryAbi as const,
  DonationManager: DonationManagerAbi as const,
  ProofNFT: ProofNFTAbi as const,
  DesignMarketplace: DesignMarketplaceAbi as const,
}

export type AddressMap = typeof addresses



