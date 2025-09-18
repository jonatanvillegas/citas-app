import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Header from "../(components)/paciente/Header";

export default function PacienteLayout() {
  return (
    <GluestackUIProvider>
      {/* 🔹 Header global */}
      <Header />

      {/* 🔹 Tabs */}
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Citas",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="turno"
          options={{
            title: "Turno",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </GluestackUIProvider>
  );
}
