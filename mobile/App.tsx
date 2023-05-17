import { StatusBar } from 'expo-status-bar'
import { ImageBackground } from 'react-native'
import { styled } from 'nativewind'

import {
  Roboto_400Regular as Roboto400Regular,
  Roboto_700Bold as Roboto700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold as BaiJamjuree700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from './src/assets/bg-blur.png'
import Stripes from './src/assets/stripes.svg'

const StyledStripes = styled(Stripes)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto400Regular,
    Roboto700Bold,
    BaiJamjuree700Bold,
  })

  if (!hasLoadedFonts) return null

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900"
    >
      <StyledStripes className="absolute left-0" />

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
