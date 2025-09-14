import { Stack } from "expo-router";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function pacienteLayout() {
  return (
    <GluestackUIProvider>
      <Stack screenOptions={{headerShown:false}} />
    </GluestackUIProvider>
  )
}
