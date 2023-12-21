import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Spam__factory } from '@borodutch/spam-contract'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'
import { useEthersSigner } from 'hooks/useEthers'
import { useState } from 'preact/hooks'
import env from 'helpers/env'

export default function () {
  const [amount, setAmount] = useState(1000)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [actionSuccess, setActionSuccess] = useState(false)
  const { isConnected } = useAccount()
  const signer = useEthersSigner()

  async function mint() {
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      if (!signer) {
        throw new Error('No signer')
      }
      const contract = Spam__factory.connect(env.VITE_CONTRACT, signer)
      const tx = await contract.mint({
        value: ethers.parseEther(`${amount / 100000}`),
      })
      await tx.wait()
      setSuccess(true)
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : `${error}`)
    } finally {
      setLoading(false)
    }
  }

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
        <ConnectButton />
        {isConnected && (
          <button
            disabled={loading}
            class="btn btn-primary btn-wide btn-lg"
            onClick={mint}
          >
            {loading ? ' 🤔' : ''}The mint $SPAM button
          </button>
        )}
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
        {success && (
          <div role="alert" class="alert alert-success break-all">
            <span role="img" aria-label="success">
              🎉
            </span>{' '}
            You now have +{amount} $SPAM.
          </div>
        )}
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
