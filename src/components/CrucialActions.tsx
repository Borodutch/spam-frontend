import { ContractTransactionResponse } from 'ethers'
import { Spam__factory } from '@borodutch/spam-contract'
import { useEthersSigner } from 'hooks/useEthers'
import { useState } from 'preact/hooks'
import env from 'helpers/env'

export default function () {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [actionSuccess, setActionSuccess] = useState(false)
  const signer = useEthersSigner()

  async function performTransaction(
    action: Promise<ContractTransactionResponse>
  ) {
    setLoading(true)
    setActionSuccess(false)
    try {
      const tx = await action
      await tx.wait()
      setActionSuccess(true)
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : `${error}`)
    } finally {
      setLoading(false)
    }
  }

  async function eatSpam() {
    const contract = Spam__factory.connect(env.VITE_CONTRACT, signer)
    await performTransaction(contract.eatSpam())
  }

  async function prayToSpamGod() {
    const contract = Spam__factory.connect(env.VITE_CONTRACT, signer)
    await performTransaction(contract.prayToSpamGod())
  }

  return (
    <div className="flex flex-col gap-4 items-stretch">
      <h2>👇 Crucial actions</h2>
      <button
        class="btn btn-primary btn-lg"
        onClick={eatSpam}
        disabled={loading}
      >
        {loading ? ' 🤔' : ''}Eat some $SPAM
      </button>
      <button
        class="btn btn-primary btn-lg"
        onClick={prayToSpamGod}
        disabled={loading}
      >
        {loading ? ' 🤔' : ''}Pray to the $SPAM God 🙏
      </button>
      {actionSuccess && (
        <div role="alert" class="alert alert-success">
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
  )
}
