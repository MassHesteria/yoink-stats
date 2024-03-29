export const getHostName = (): string => {
  return process.env.NEXT_PUBLIC_VERCEL_ENV
         ? "https://yoink-stats.vercel.app"
         : "http://localhost:3001"
}