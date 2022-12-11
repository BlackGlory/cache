export function toInternalKey(namespace: string, key: string): string {
  return JSON.stringify([namespace, key])
}

export function fromInternalKey(internalKey: string): {
  namespace: string
, key: string
 } {
  const [namespace, key] = JSON.parse(internalKey) as [string, string]
  return { namespace, key }
}
