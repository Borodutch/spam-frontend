import { atom } from 'jotai'

export default atom<Promise<bigint> | null>(null)
