import { Stack } from "expo-router";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function SecretariaLayout() {
  return (
    <GluestackUIProvider>
      <Stack screenOptions={{headerShown:false}} />
    </GluestackUIProvider>
  )
}