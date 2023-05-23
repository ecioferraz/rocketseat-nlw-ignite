import { cookies } from 'next/headers'

import { api } from '@/lib/api'
import Image from 'next/image'
import dayjs from 'dayjs'
import { Edit, Trash2 } from 'lucide-react'

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

  // const handleDelete = async () => {
  //   const response = confirm('Tem certeza que deseja excluir')
  // }

  return (
    <div className="space-y-4 p-8" key={id}>
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
      <div className="flex flex-row justify-end gap-2">
        <button className="flex items-center gap-2 rounded-full bg-purple-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-purple-600">
          <Edit className="h-4 w-4" />
          Editar
        </button>

        <button
          className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-red-600"
          // onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
          Excluir
        </button>
      </div>
    </div>
  )
}
