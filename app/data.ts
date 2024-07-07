export const deserializeFromBase64 = (base64: string) => {
  const jsonString = Buffer.from(base64, 'base64').toString('utf-8');
  return JSON.parse(jsonString);
};

export const serializeToBase64 = (json: any) => {
  const jsonString = JSON.stringify(json);
  return Buffer.from(jsonString).toString('base64');
};

export const getHostName = (): string => {
  if (process.env['HOST']) {
    return process.env['HOST']
  }
  if (process.env['VERCEL_URL']) {
    return 'https://' + process.env['VERCEL_URL']
  }
  return 'http://localhost:3000'
}

export const getShareLink = (message: string, args: any|null) => {
  let baseRoute = getHostName();
  if (args != null) {
    args.t = Date.now()
    baseRoute += `/share/${serializeToBase64(args)}`
    //console.log(baseRoute)
  }
  const shareLink =
    `https://warpcast.com/~/compose?text=${encodeURIComponent(message)}` +
    "&embeds[]=" + encodeURIComponent(baseRoute);
  return shareLink
}
