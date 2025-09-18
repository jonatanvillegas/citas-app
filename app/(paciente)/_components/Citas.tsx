import { View, Text } from "react-native";
import React from "react";

type Props = {
  fecha: string;
  estado: "confirmada" | "completada" | "pendiente";
  hora: string;
  doctor: string;
  especialidad: string;
  direccion: string;
  turno: number;
  notas?: string;
};

// Paleta de colores
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

// Colores para cada estado
const estadoColors: Record<
  "confirmada" | "completada" | "pendiente",
  { bg: string; text: string; border: string }
> = {
  confirmada: { bg: "#E3F2FD", text: COLORS.primary, border: "#90CAF9" }, 
  completada: { bg: "#E8F5E9", text: "#2E7D32", border: "#A5D6A7" },      
  pendiente: { bg: "#FFF8E1", text: "#FF6F00", border: "#FFCC80" },      
};

export default function CitaCard({
  fecha,
  estado,
  hora,
  doctor,
  especialidad,
  direccion,
  turno,
  notas,
}: Props) {
  const { bg, text, border } = estadoColors[estado];

  // Total turnos (progreso)
  const totalTurnos = 10;
  let grados = 0;
  if (turno === 1) grados = 360;
  else if (turno > 1 && turno <= totalTurnos)
    grados = ((turno - 1) / (totalTurnos - 1)) * 360;

  return (
    <View
      className="bg-white p-6 rounded-3xl shadow-lg mb-6"
      style={{
        borderWidth: 1,
        borderColor: COLORS.primary,
        width: "95%",
        alignSelf: "center",
      }}
    >
      {/* Encabezado doctor y especialidad */}
      <View className="mb-4">
        <Text className="text-lg font-bold text-gray-900">{doctor}</Text>
        <Text className="text-base font-medium text-gray-600">
          {especialidad}
        </Text>
      </View>

      {/* Fecha y estado */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-sm font-semibold text-gray-700">{fecha}</Text>
        <Text
          style={{
            backgroundColor: bg,
            color: text,
            borderColor: border,
            borderWidth: 1,
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 999,
            fontSize: 12,
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {estado}
        </Text>
      </View>

      {/* Detalles */}
      <View className="space-y-2">
        <Text className="text-gray-700">🕒 {hora}</Text>
        <Text className="text-gray-700">📍 {direccion}</Text>

        {/* Turno con círculo */}
        <View className="items-center mt-6">
          <View className="relative w-24 h-24">
            <View
              className="absolute w-24 h-24 rounded-full border-8"
              style={{
                borderColor: turno === 1 ? COLORS.primary : "#e5e7eb",
              }}
            />
            {turno > 1 && (
              <View
                className="absolute w-24 h-24 rounded-full border-8"
                style={{
                  borderColor: COLORS.primary,
                  borderRightColor: "transparent",
                  borderBottomColor: "transparent",
                  transform: [{ rotate: `${grados}deg` }],
                }}
              />
            )}
            <View className="absolute inset-0 flex items-center justify-center">
              <Text className="text-2xl font-extrabold text-gray-900">
                {turno}
              </Text>
            </View>
          </View>
          <Text className="mt-2 text-sm font-semibold text-gray-600">
            Turno
          </Text>
        </View>
      </View>

      {/* Notas */}
      {notas && (
        <View className="mt-5 bg-gray-50 rounded-xl p-3 border border-gray-200">
          <Text className="text-gray-600 text-sm leading-5">
            <Text className="font-semibold text-gray-800">📝 Notas: </Text>
            {notas}
          </Text>
        </View>
      )}
    </View>
  );
}
