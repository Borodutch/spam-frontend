import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_CONTRACT: str(),
  VITE_ALCHEMY_BASE: str(),
})
