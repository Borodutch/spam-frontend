import { atomWithStorage } from 'jotai/utils'

export default atomWithStorage<Record<string, string>>('signatures', {})
