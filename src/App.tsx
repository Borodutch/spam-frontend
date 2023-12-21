import Mint from 'components/Mint'
import Wallet from 'components/Wallet'

export default function () {
  return (
    <Wallet>
      <div className="container mx-auto max-w-prose p-10 prose">
        <h1>$SPAM</h1>
        <div role="alert" class="alert alert-warning">
          I'll add claiming $SPAM based on Farcaster activity soon. For now, you
          can swap $ETH to $SPAM below.
        </div>
        <Mint />
      </div>
    </Wallet>
  )
}
