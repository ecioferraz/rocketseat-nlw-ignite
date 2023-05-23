import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import EmptyMemories from '@/components/EmptyMemories'
import { api } from '@/lib/api'

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) return <EmptyMemories />

  const token = cookies().get('token')?.value

  const { data: memories } = await api.get('/memories', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return !memories.length ? (
    <EmptyMemories />
  ) : (
    <div className="flex flex-col gap-10 p-8">
      {memories.map(({ coverUrl, createdAt, excerpt, id }: Memory) => (
        <div className="space-y-4" key={id}>
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(createdAt).locale('pt-br').format('DD [de] MMMM, YYYY')}
          </time>
          <Image
            alt=""
            className="aspect-video w-full rounded-lg object-cover"
            height={280}
            src={coverUrl}
            width={592}
          />
          <p className="text-lg leading-relaxed text-gray-100">{excerpt}</p>
          <Link
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            href={`/memories/${id}`}
          >
            Leia mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
