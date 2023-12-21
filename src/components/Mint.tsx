import { Spam__factory } from '@borodutch/spam-contract'
import { useEthersSigner } from 'hooks/useEthers'
import { useState } from 'preact/hooks'
import Link from 'components/Link'
import env from 'helpers/env'

export default function () {
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
      <p>
        The contract is{' '}
        <Link url="https://basescan.org/address/0x89ca325bd05f851b2b91b3e9fb2d15a59d3d82c6#writeProxyContract">
          <span className="break-all">
            0x10c2820e29c97D380aaAD53C9CB507a840d460a5
          </span>
        </Link>{' '}
        on the Base chain.
      </p>
      <div className="flex flex-col items-start gap-4 mt-8">
        <Link url="https://dexscreener.com/base/0x10c2820e29c97D380aaAD53C9CB507a840d460a5">
          <button class="btn btn-primary btn-wide btn-lg">
            👏 Buy $SPAM 👏
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
