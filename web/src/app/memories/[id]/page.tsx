import dayjs from 'dayjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import MemoryOptions from '@/components/MemoryOptions'
import { api } from '@/lib/api'

interface MemoryDetailsProps {
  params: { id: string }
}

interface Memory {
  coverUrl: string
  createdAt: string
  content: string
}

export default async function MemoryDetails({
  params: { id },
}: MemoryDetailsProps) {
  const token = cookies().get('token')?.value

  const { data: memory } = await api.get(`/memories/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const { coverUrl, createdAt, content } = memory as Memory

  return (
    <div className="space-y-4 p-8" key={id}>
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar a timeline
      </Link>
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
      <p className="text-lg leading-relaxed text-gray-100">{content}</p>
      <MemoryOptions fileName={coverUrl.split('/')[4]} id={id} />
    </div>
  )
}
