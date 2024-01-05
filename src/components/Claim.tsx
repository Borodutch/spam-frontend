import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useAtom } from 'jotai'
import { useEthersSigner } from 'hooks/useEthers'
import ClaimDashboard from 'components/ClaimDashboard'
import getVerificationMessage from 'helpers/getVerificationMessage'
import signaturesAtom from 'atoms/signatures'

export default function () {
  const signer = useEthersSigner()
  const [signatures, setSignatures] = useAtom(signaturesAtom)
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
      setSignatures((signatures) => ({ ...signatures, [address]: signature }))
    } catch (error) {
      console.error(error)
    }
  }

  const signature = address ? signatures[address] : null

  return (
    <div className="flex flex-col items-stetch gap-4">
      <h2>NEW 😱 CLAIM $SPAM FOR FARCASTER ACTIVITY!</h2>
      <ul>
        <li>You get 5 $SPAM for every unique cast containing "$SPAM"</li>
        <li>Casts that only contain the word $SPAM don't count</li>
        <li>Every like on a cast increases the claim for the cast by 1%</li>
        <li>So does every recast</li>
        <li>Go use $SPAM in your casts!</li>
        <li>You can claim every 24 hours 🫦</li>
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
