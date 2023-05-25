import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import Icon from '@expo/vector-icons/Feather'
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import NWLLogo from '../src/assets/nwl-spacetime-logo.svg'
import { useEffect, useState } from 'react'
import { api } from '../src/lib/api'
import 'dayjs/locale/pt-br'
import MemoryCard from './components/MemoryCard'
import { MemoryProps } from './[id]'

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()
  const [memories, setMemories] = useState<MemoryProps[]>([])
  const [refresh, setRefresh] = useState(true)

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
    setRefresh(false)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
      refreshControl={
        <RefreshControl
          colors={['#36dc81']}
          refreshing={refresh}
          onRefresh={loadMemories}
          tintColor={'#36dc81'}
        />
      }
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
          <MemoryCard
            coverUrl={coverUrl}
            createdAt={createdAt}
            details
            excerpt={excerpt}
            id={id}
            key={id}
          />
        ))}
      </View>
    </ScrollView>
  )
}
