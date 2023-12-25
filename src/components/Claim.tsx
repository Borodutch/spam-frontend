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
      <ul>
        <li>You get 5 $SPAM for every unique cast containing "$SPAM"</li>
        <li>Casts that only contain the word $SPAM don't count</li>
        <li>Every like on a cast increases the claim for the cast by 1%</li>
        <li>So does every recast</li>
        <li>Go use $SPAM in your casts!</li>
      </ul>
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
