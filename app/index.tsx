import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button className="p-3">
      <ButtonSpinner color="gray" />
      <ButtonText className="font-medium text-sm ml-2">
       enviando solicitud 
      </ButtonText>
    </Button>
    </View>
  );
}
