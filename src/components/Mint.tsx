import { Spam__factory } from '@borodutch/spam-contract'
import { useEthersSigner } from 'hooks/useEthers'
import { useState } from 'preact/hooks'
import Link from 'components/Link'
import env from 'helpers/env'

export default function () {
  const [amount, setAmount] = useState(1000)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [actionSuccess, setActionSuccess] = useState(false)
  const signer = useEthersSigner()

  async function eatSpam() {
    setLoading(true)
    setActionSuccess(false)
    try {
      if (!signer) {
        throw new Error('No signer')
      }
      const contract = Spam__factory.connect(env.VITE_CONTRACT, signer)
      const tx = await contract.eatSpam()
      await tx.wait()
      setActionSuccess(true)
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : `${error}`)
    } finally {
      setLoading(false)
    }
  }

  async function prayToSpamGod() {
    setLoading(true)
    setActionSuccess(false)
    try {
      if (!signer) {
        throw new Error('No signer')
      }
      const contract = Spam__factory.connect(env.VITE_CONTRACT, signer)
      const tx = await contract.prayToSpamGod()
      await tx.wait()
      setActionSuccess(true)
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : `${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <input
        type="number"
        class="input input-bordered w-full"
        placeholder="How much $SPAM do you want?"
        min={0}
        value={amount}
        onChange={(e) => setAmount(parseInt(e.currentTarget.value))}
      />
      <div class="label">
        <span class="label-text-alt">
          Cost: ~{(amount / 100000).toFixed(3)} ETH
        </span>
      </div>
      <div className="flex flex-col items-start gap-4 mt-8">
        <Link url="https://dexscreener.com/base/0x10c2820e29c97D380aaAD53C9CB507a840d460a5">
          <button class="btn btn-primary btn-wide btn-lg">
            👏 Swap $ETH for $SPAM 👏
          </button>
        </Link>
        <button
          class="btn btn-primary btn-wide btn-lg"
          onClick={eatSpam}
          disabled={loading}
        >
          {loading ? ' 🤔' : ''}Eat some $SPAM
        </button>
        <button
          class="btn btn-primary btn-wide btn-lg"
          onClick={prayToSpamGod}
          disabled={loading}
        >
          {loading ? ' 🤔' : ''}Pray to the $SPAM God 🙏
        </button>
        {actionSuccess && (
          <div role="alert" class="alert alert-success break-all">
            <span role="img" aria-label="success">
              🎉
            </span>{' '}
            You did something with $SPAM successfully!
          </div>
        )}
        {error && (
          <div role="alert" class="alert alert-error break-all">
            {error}
          </div>
        )}
      </div>
    </>
  )
}
