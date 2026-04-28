import FingerprintJS from '@fingerprintjs/fingerprintjs'

let cachedVisitorId: string | null = null
let fpPromise: ReturnType<typeof FingerprintJS.load> | null = null

export const useFingerprint = () => {
  const getVisitorId = async (): Promise<string> => {
    if (cachedVisitorId) return cachedVisitorId
    if (!fpPromise) fpPromise = FingerprintJS.load()
    const fp = await fpPromise
    const result = await fp.get()
    cachedVisitorId = result.visitorId
    return cachedVisitorId
  }

  return { getVisitorId }
}