import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import Icon from '@expo/vector-icons/Feather'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import NWLLogo from '../src/assets/nwl-spacetime-logo.svg'
import { useEffect, useState } from 'react'
import { api } from '../src/lib/api'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

interface Memory {
  coverUrl: string
  createdAt: string
  excerpt: string
  id: string
}

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()
  const [memories, setMemories] = useState<Memory[]>([])

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  const loadMemories = async () => {
    const token = await SecureStore.getItemAsync('token')

    const { data } = await api.get('/memories', {
      headers: { Authorization: `Bearer ${token}` },
    })

    setMemories(data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <NWLLogo />

        <View className="flex-row gap-2">
          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon color="#000" name="plus" size={16} />
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
            onPress={signOut}
          >
            <Icon color="#000" name="log-out" size={16} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map(({ coverUrl, createdAt, excerpt, id }) => (
          <View className="space-y-4" key={id}>
            <View className="flex-row items-center gap-2">
              <View className="h-px w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-100">
                {dayjs(createdAt).locale('pt-br').format('D [de] MMMM, YYYY')}
              </Text>
            </View>
            <View className="space-y-4 px-8">
              <Image
                alt=""
                className="aspect-video w-full rounded-lg"
                source={{ uri: coverUrl }}
              />
              <Text className="font-body text-base leading-relaxed text-gray-100">
                {excerpt}
              </Text>
              <Link href="/memories/id" asChild>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="font-body text-sm text-gray-200">
                    Ler mais
                  </Text>
                  <Icon color="#9e9ea0" name="arrow-right" size={16}></Icon>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
