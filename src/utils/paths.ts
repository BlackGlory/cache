import { findUpPackageFilenameSync } from 'extra-filesystem'
import { go, assert, isntUndefined } from '@blackglory/prelude'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const currentDirname = fileURLToPath(new URL(import.meta.url))

export const packageFilename = go(() => {
  const result = findUpPackageFilenameSync(currentDirname)
  assert(isntUndefined(result), 'Not found package.json')
  return result
})

export const appRootPath = dirname(packageFilename)
