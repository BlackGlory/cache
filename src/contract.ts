export interface IAPI {
  has(namespace: string, key: string): Promise<boolean>
  get(namespace: string, key: string): Promise<string | null>
  set(
    namespace: string
  , key: string
  , payload: string
  , timeToLive: number /* ms */
  , timeBeforeDeletion: number /* ms */
  ): Promise<null>
  del(namespace: string, key: string): Promise<null>
  clear(namespace: string): Promise<null>

  getAllItemKeys(namespace: string): Promise<string[]>
  getAllNamespaces(): Promise<string[]>
  stats(namespace: string): Promise<IStats>
}

export interface IStats {
  namespace: string
  items: number
}
