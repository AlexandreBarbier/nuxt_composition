import { ssrRef } from '@nuxtjs/composition-api'

const error = ssrRef<Error | undefined>(undefined)
export default () => {
  const setError = (err: Error) => {
    error.value = err
    setTimeout(() => {
      resetError()
    }, 5000)
  }

  const resetError = () => {
    error.value = undefined
  }

  return {
    error,
    setError,
    resetError,
  }
}
