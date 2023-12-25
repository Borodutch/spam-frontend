import Buy from 'components/Buy'
import Claim from 'components/Claim'
import CrucialActions from 'components/CrucialActions'
import Wallet from 'components/Wallet'

export default function () {
  return (
    <Wallet>
      <div className="container mx-auto max-w-prose p-10 prose">
        <h1>$SPAM</h1>
        <Buy />
        <Claim />
        <CrucialActions />
      </div>
    </Wallet>
  )
}
