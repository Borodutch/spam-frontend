import GeneratedTicket from 'models/GeneratedTIcket'
import OlderTicket from 'models/OlderTicket'
import env from 'helpers/env'

export async function generateTicket(
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
      if (res.statusCode >= 400) {
        console.log(res)
        throw new Error(res.message)
      }
      return res
    })) as GeneratedTicket
}

export async function getOlderTickets(
  address: `0x${string}`,
  signature: string
) {
  return (await (
    await fetch(`${env.VITE_BACKEND}/tickets`, {
      headers: {
        address,
        signature,
        'Content-Type': 'application/json',
      },
    })
  )
    .json()
    .then((res) => {
      if (res.statusCode >= 400) {
        console.log(res)
        throw new Error(res.message)
      }
      return res
    })) as OlderTicket[]
}
