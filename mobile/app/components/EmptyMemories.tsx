import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function EmptyMemories() {
  return (
    <View className="mt-8 flex flex-1 items-center space-y-4 self-center px-12">
      <Text className="text-center font-body text-sm  leading-relaxed text-white">
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <Link href="new" asChild>
          <Text className="font-body text-sm leading-relaxed text-white underline">
            criar agora
          </Text>
        </Link>
        !
      </Text>
    </View>
  )
}
