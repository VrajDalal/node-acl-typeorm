import { randomBytes } from "crypto"
import { test } from "node:test"

export const genrateString = (length: number) => {
  const prefix = 'VR'
  const suffix = 'AJ'
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }
  return prefix + randomString + suffix
}

export const validateObjectId = (id: string): boolean => {
  const regex = /^VR.*AJ$/   // regular expression
  const valid = regex.test(id)
  return valid;
}
