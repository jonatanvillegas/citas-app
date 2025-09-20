import React from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity } from "react-native";

export default function Index() {
  const COLORS = {
    primary: "#1976D2",
    textPrimary: "#1a4971",
    textSecondary: "#6d93b8",
    textDark: "#0d2b43",
    placeholderText: "#767676",
    background: "#e3f2fd",
    cardBackground: "#f5f9ff",
    inputBackground: "#f0f8ff",
    border: "#bbdefb",
    white: "#ffffff",
    black: "#000000",
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Encabezado */}
      <View
        style={{
          backgroundColor: COLORS.primary,
          paddingVertical: 24,
          paddingHorizontal: 16,
          marginBottom: 24,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: "800", color: COLORS.white }}>
          Buscar Pacientes
        </Text>
        <Text style={{ fontSize: 14, color: COLORS.white, opacity: 0.9 }}>
          Asigna un número de cola para su chequeo
        </Text>
      </View>

      {/* Tarjeta buscador */}
      <View
        style={{
          backgroundColor: COLORS.cardBackground,
          padding: 20,
          borderRadius: 20,
          marginHorizontal: 16,
          shadowColor: COLORS.black,
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <TextInput
          placeholder="Buscar por nombre o cédula..."
          placeholderTextColor={COLORS.placeholderText}
          style={{
            backgroundColor: COLORS.inputBackground,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontSize: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: COLORS.border,
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: 14,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: "600" }}>
            Asignar Número
          </Text>
        </TouchableOpacity>

        {/* Resultado simulado */}
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: COLORS.textPrimary }}>
            Número de cola asignado:
          </Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "800",
              color: COLORS.primary,
              marginTop: 8,
            }}
          >
            #12
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
