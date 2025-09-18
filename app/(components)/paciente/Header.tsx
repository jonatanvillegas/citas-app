import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack"
import Feather from '@expo/vector-icons/Feather';
import { Pressable, Text } from "react-native";
import { useAuthStore } from '@/store/useAuthStore'
import { router } from "expo-router";


export default function Header() {

    const { usuario, logout } = useAuthStore();

    const handlerLogout = async () => { 
    await logout()
    router.replace('/(auth)/login')
   }
  return (
    <Box className="p-4 mt-4" style={{backgroundColor: '#e3f2fd'}}>
      <HStack className="items-center justify-between">
        {/* 🔹 Avatar con iniciales o imagen */}
        <HStack className="items-center space-x-3">
          <Avatar size="md">
            <AvatarFallbackText>
              <Text className="text-white font-bold">JJ</Text>
            </AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://i.pravatar.cc/150?img=32", 
              }}
            />
          </Avatar>
          <Text className="text-gray-950 text-lg font-bold ml-4">{usuario?.nombre}</Text>
        </HStack>

        {/* 🔹 Botón de salida */}
        <Pressable onPress={() => console.log("Salir...")}>
            <Feather name="log-in" size={24} color="red" onPress={handlerLogout}/>
        </Pressable>
      </HStack>
    </Box>
  );
}
