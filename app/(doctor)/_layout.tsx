import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Header from "../(components)/paciente/Header"; 

export default function DoctorLayout() {
  return (
    <GluestackUIProvider>
      {/* 🔹 Header global */}
      <Header />

      {/* 🔹 Tabs para Doctor */}
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Citas Pendientes",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
          <Tabs.Screen
            name="CitasPendientesDoctor" 
            options={{
              title: "Pacientes",         
              tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
              ),
            }}
          />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </GluestackUIProvider>
  );
}
