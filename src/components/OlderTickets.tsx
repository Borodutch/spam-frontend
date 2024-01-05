import { Spam__factory } from '@borodutch/spam-contract'
import { useAccount } from 'wagmi'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'preact/hooks'
import { useEthersSigner } from 'hooks/useEthers'
import OlderTicket from 'models/OlderTicket'
import SuspenseWithError from 'components/SuspenseWithError'
import TicketClaimButton from 'components/TicketClaimButton'
import env from 'helpers/env'
import getDateString from 'helpers/getDateString'
import lastClaimedTimestampAtom from 'atoms/lastClaimedTimestamp'

function OlderTicketsSuspended({ tickets }: { tickets: OlderTicket[] }) {
  const lastClaimedTimestamp = useAtomValue(lastClaimedTimestampAtom)
  return (
    <>
      <p>
        {lastClaimedTimestamp
          ? `The last time you've claimed spam was at ${getDateString(
              lastClaimedTimestamp
            )}.`
          : "You haven't claimed $SPAM yet!"}
      </p>
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr id={ticket.signature}>
                <td>{getDateString(ticket.fromDate)}</td>
                <td>{getDateString(ticket.toDate)}</td>
                <td>{ticket.total}</td>
                <td>
                  <TicketClaimButton ticket={ticket} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default function ({ tickets }: { tickets: OlderTicket[] }) {
  const { address } = useAccount()
  const signer = useEthersSigner()

  if (!address || !signer) {
    return <p>Doesn't look like there is an address connected!</p>
  }
  const setLastClaimedTimestamp = useSetAtom(lastClaimedTimestampAtom)
  useEffect(() => {
    if (!address) {
      setLastClaimedTimestamp(null)
      return
    }
    const bigintAddress = BigInt(address)
    const contract = Spam__factory.connect(env.VITE_CONTRACT, signer)
    setLastClaimedTimestamp(contract.lastClaimTimestamps(bigintAddress, 0n))
  }, [address, setLastClaimedTimestamp, signer])
  return (
    <SuspenseWithError errorText="Failed to load last claim date">
      <OlderTicketsSuspended tickets={tickets} />
    </SuspenseWithError>
  )
}
