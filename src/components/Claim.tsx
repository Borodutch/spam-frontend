import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useEthersSigner } from 'hooks/useEthers'
import { useState } from 'preact/hooks'
import ClaimDashboard from 'components/ClaimDashboard'
import getVerificationMessage from 'helpers/getVerificationMessage'

export default function () {
  const signer = useEthersSigner()
  const [signature, setSignature] = useState('')
  const { address, isConnected } = useAccount()

  async function authorize() {
    try {
      if (!signer) {
        throw new Error('No signer')
      }
      if (!address) {
        throw new Error('No address')
      }
      const signature = await signer.signMessage(
        getVerificationMessage(address)
      )
      setSignature(signature)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col items-stetch gap-4">
      <h2>NEW 😱 CLAIM $SPAM FOR FARCASTER ACTIVITY!</h2>
      <ConnectButton />
      {isConnected && (
        <>
          {!signature && (
            <button class="btn btn-primary btn-lg" onClick={authorize}>
              Authorize $SPAM
            </button>
          )}
          {signature && <ClaimDashboard signature={signature} />}
        </>
      )}
    </div>
  )
}
