export default function makeLocationId({ pathname, search, hash }) {
  return `${pathname}${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`
}
