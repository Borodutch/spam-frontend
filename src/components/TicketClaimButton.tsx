import { Spam__factory } from '@borodutch/spam-contract'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEthersSigner } from 'hooks/useEthers'
import { useState } from 'preact/hooks'
import OlderTicket from 'models/OlderTicket'
import env from 'helpers/env'
import lastClaimedTimestampAtom from 'atoms/lastClaimedTimestamp'

function evenPad(value: string) {
  return value.length % 2 === 0 ? value : `0${value}`
}

function turnIntoBytes(value: bigint) {
  return ethers.getBytes(
    ethers.zeroPadValue(`0x${evenPad(value.toString(16))}`, 32)
  )
}

export default function ({
  ticket,
}: {
  ticket: OlderTicket
  refreshClaimTimestamp: () => void
}) {
  const [loading, setLoading] = useState(false)
  const { address } = useAccount()
  const signer = useEthersSigner()
  const setLastClaimedTimestamp = useSetAtom(lastClaimedTimestampAtom)

  async function claimSpam() {
    setLoading(true)
    try {
      if (!ticket) {
        throw new Error('No ticket found')
      }
      if (!address) {
        throw new Error('No address found')
      }
      const contract = Spam__factory.connect(env.VITE_CONTRACT, signer)
      const { r, yParityAndS } = ethers.Signature.from(ticket.signature)
      const spammerBytes = turnIntoBytes(BigInt(address))
      const ticketTypeBytes = turnIntoBytes(0n)
      const spamAmountBytes = turnIntoBytes(
        ethers.parseEther(`${ticket.total}`)
      )
      const fromTimestampBytes = turnIntoBytes(
        BigInt(new Date(ticket.fromDate).getTime())
      )
      const toTimestampBytes = turnIntoBytes(
        BigInt(new Date(ticket.toDate).getTime())
      )
      const message = [
        ...spammerBytes,
        ...ticketTypeBytes,
        ...spamAmountBytes,
        ...fromTimestampBytes,
        ...toTimestampBytes,
      ]
      const tx = await contract.claimSpam(
        new Uint8Array(message),
        r,
        yParityAndS
      )
      await tx.wait()
      const bigintAddress = BigInt(address)
      setLastClaimedTimestamp(contract.lastClaimTimestamps(bigintAddress, 0n))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const lastClaimedTimestamp = useAtomValue(lastClaimedTimestampAtom)
  const disabled =
    !!lastClaimedTimestamp &&
    new Date(Number(lastClaimedTimestamp)).getTime() >=
      new Date(ticket.fromDate).getTime()
  return (
    <button
      class="btn btn-primary btn-xs"
      disabled={disabled || loading}
      onClick={claimSpam}
    >
      {loading && '🤔 '}Claim!
    </button>
  )
}
