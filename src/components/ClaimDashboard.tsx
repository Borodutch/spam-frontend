import { Spam__factory } from '@borodutch/spam-contract'
import { ethers } from 'ethers'
import { generateTicket, getOlderTickets } from 'helpers/api'
import { useAccount } from 'wagmi'
import { useEthersSigner } from 'hooks/useEthers'
import { useState } from 'preact/hooks'
import GeneratedTicket from 'models/GeneratedTIcket'
import OlderTicket from 'models/OlderTicket'
import OlderTickets from 'components/OlderTickets'
import env from 'helpers/env'

export default function ({ signature }: { signature: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [ticket, setTicket] = useState<GeneratedTicket | null>(null)
  const [olderTickets, setOlderTickets] = useState<OlderTicket[] | null>(null)

  const { address } = useAccount()
  const signer = useEthersSigner()

  async function getTicket() {
    setSuccess(false)
    setLoading(true)
    setError('')
    try {
      if (!address) throw new Error('No address found')
      const ticket = await generateTicket(address, signature)
      setTicket(ticket)
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : `${error}`)
    } finally {
      setLoading(false)
    }
  }

  async function fetchOlderTickets() {
    setLoading(true)
    setError('')
    try {
      if (!address) throw new Error('No address found')
      const tickets = await getOlderTickets(address, signature)
      setOlderTickets(tickets)
    } catch (error) {
      console.error(error)
      setOlderTickets(null)
      setError(error instanceof Error ? error.message : `${error}`)
    } finally {
      setLoading(false)
    }
  }

  async function claimSpam() {
    setLoading(true)
    setSuccess(false)
    try {
      if (!ticket) {
        throw new Error('No ticket found')
      }
      const contract = Spam__factory.connect(env.VITE_CONTRACT, signer)
      const { r, yParityAndS } = ethers.Signature.from(
        ticket.signature.signature
      )
      const tx = await contract.claimSpam(
        new Uint8Array(ticket.signature.message),
        r,
        yParityAndS
      )
      await tx.wait()
      setSuccess(true)
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : `${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div role="alert" class="alert alert-success">
        You have authorized $SPAM! Now let's see if you have any $SPAM to claim
        🫦
      </div>
      {!ticket && (
        <button
          class="btn btn-primary btn-lg"
          onClick={getTicket}
          disabled={loading}
        >
          {loading ? ' 🤔' : ''}Get ticket to claim $SPAM 💎🤲
        </button>
      )}
      {ticket && (
        <div class="alert alert-success flex flex-col gap-4 items-stretch">
          <p>
            You have a ticket to claim {ticket.total} $SPAM! It consists of{' '}
            {ticket.baseAmount} $SPAM for unique casts containing $SPAM,{' '}
            {ticket.additionalForLikes} $SPAM for likes, and{' '}
            {ticket.additionalForRecasts} $SPAM for recasts. Do not reload this
            page or you will lose this ticket!
          </p>
          <button
            class="btn btn-primary btn-lg"
            onClick={() => {
              void claimSpam()
            }}
          >
            Claim $SPAM 💎🤲
          </button>
        </div>
      )}
      {success && (
        <div role="alert" class="alert alert-success">
          <span role="img" aria-label="success">
            🎉
          </span>{' '}
          You successfully claimed $SPAM! Check your wallet for details 🚀
        </div>
      )}
      <button
        class="btn btn-primary btn-lg"
        onClick={fetchOlderTickets}
        disabled={loading}
      >
        {loading ? ' 🤔' : ''}
        {olderTickets?.length ? 'Refresh' : 'Get'} older tickets to claim $SPAM
        ⏳
      </button>
      {error && (
        <div role="alert" class="alert alert-error break-all">
          {error}
        </div>
      )}
      {olderTickets?.length && <OlderTickets tickets={olderTickets} />}
    </>
  )
}
