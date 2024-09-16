import { db } from '@/lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q')

  if (!q) return new Response('Invalid query', { status: 400 })

  const results = await db.profile.findMany({
    where: {
      id: {
        contains: q,
        mode: 'insensitive',
      },
    },
    take: 6,
  })

  return new Response(JSON.stringify(results))
}
