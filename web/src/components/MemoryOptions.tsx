'use client'

import { api } from '@/lib/api'
import cookie from 'js-cookie'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface MemoryOptionsProps {
  fileName: string
  id: string
}

export default function MemoryOptions({ fileName, id }: MemoryOptionsProps) {
  const router = useRouter()

  const handleDelete = async () => {
    const response = confirm('Tem certeza que deseja excluir essa lembrança?')

    if (response) {
      const token = cookie.get('token')
      const headers = { Authorization: `Bearer ${token}` }

      await api.delete(`/upload/${fileName}`, { headers })

      await api.delete(`/memories/${id}`, { headers })

      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="flex flex-row justify-end gap-2">
      {/* <button className="flex items-center gap-2 rounded-full bg-purple-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-purple-600">
        <Edit className="h-4 w-4" />
        Editar
      </button> */}

      <button
        className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-red-600"
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4" />
        Excluir
      </button>
    </div>
  )
}
