import GeneratedTicket from 'models/GeneratedTIcket'
import env from 'helpers/env'

export default async function generateTicket(
  address: `0x${string}`,
  signature: string
) {
  return (await (
    await fetch(`${env.VITE_BACKEND}/tickets/generate`, {
      headers: {
        address,
        signature,
        'Content-Type': 'application/json',
      },
    })
  )
    .json()
    .then((res) => {
      if (res.status >= 400) {
        console.log(res)
        throw new Error(res.message)
      }
      return res
    })) as GeneratedTicket
}
