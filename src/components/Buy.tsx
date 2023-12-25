import Link from 'components/Link'

export default function () {
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
      <div className="flex flex-col items-stretch gap-4 mt-8">
        <button
          class="btn btn-primary btn-lg"
          onClick={() => {
            window.open(
              'https://dexscreener.com/base/0x10c2820e29c97D380aaAD53C9CB507a840d460a5',
              '_blank'
            )
          }}
        >
          👏 Buy $SPAM 👏
        </button>
      </div>
    </>
  )
}
