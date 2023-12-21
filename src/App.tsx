import Mint from 'components/Mint'
import Wallet from 'components/Wallet'

export default function () {
  return (
    <Wallet>
      <div className="container mx-auto max-w-prose p-10 prose">
        <h1>$SPAM</h1>
        <div role="alert" class="alert alert-warning">
          I'll add claiming $SPAM based on Farcaster activity soon. For now, you
          can mint $SPAM below.
        </div>
        <p>
          There will always be only 6,942,000 $SPAM that can be minted.
          Farcaster claims don't use up the mint cap. For 1 ETH you will get
          100,000 $SPAM.
        </p>
        <Mint />
      </div>
    </Wallet>
  )
}
