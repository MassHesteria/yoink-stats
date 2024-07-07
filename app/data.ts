export const getHostName = (): string => {
  if (process.env['HOST']) {
    return process.env['HOST']
  }
  if (process.env['VERCEL_URL']) {
    return 'https://' + process.env['VERCEL_URL']
  }
  return 'http://localhost:3000'
}