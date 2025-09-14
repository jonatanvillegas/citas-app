import { router } from "expo-router";
import { Text, View } from "react-native";
import { useEffect } from "react";
import { Image } from "expo-image";

export default function Index() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 4000);

    return () => clearTimeout(timeout); // limpiar en caso de desmontar antes
  }, []);

  return (
    <View >
      <View >
        <Text>Página de Splash</Text>
        {/* Podés agregar tu logo o animación */}
      </View>
    </View>
  );
}
