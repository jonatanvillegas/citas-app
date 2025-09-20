import { Stack, Tabs } from "expo-router";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from "../(components)/paciente/Header";

export default function SecretariaLayout() {
  return (
    <GluestackUIProvider>
      {/* 🔹 Header global */}
            <Header />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Cola",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="insert-row-above" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="agendarCita"
          options={{
            title: "Cita",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </GluestackUIProvider>
  )
}