import { ScrollView, Text, View } from "react-native";
import React from "react";
import Citas from "./Citas";
import { citas, Cita } from "../../data/cita";

export default function Index() {
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

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      contentContainerStyle={{ paddingBottom: 5 }}
    >
      {/* Encabezado principal */}
      <View
        style={{
          backgroundColor: COLORS.primary,
          width: "100%",
          paddingVertical: 24,
          paddingHorizontal: 16,
          marginBottom: 24,
          alignItems: "center",
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
            color: COLORS.white,
            marginBottom: 6,
            textAlign: "center",
          }}
        >
          Mis Citas Médicas
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: COLORS.white,
            opacity: 0.9,
            textAlign: "center",
          }}
        >
          Visualiza y administra tus próximas citas médicas
        </Text>
      </View>

      {/* Tarjeta */}
      <View
        style={{
          backgroundColor: COLORS.cardBackground,
          padding: 20,
          borderRadius: 20,
          marginBottom: 24,
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          width: "92%",
          alignSelf: "center", 
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: COLORS.textPrimary,
            marginBottom: 8,
          }}
        >
          Citas por turnos
        </Text>
        <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>
          Visualiza el detalle de tus próximas citas organizadas por turno.
        </Text>
      </View>

      {/* Listado de Citas */}
      {citas.map((cita: Cita, index: number) => (
        <View key={index} style={{ alignItems: "center", width: "100%" }}>
          <Citas
            fecha={cita.fecha}
            estado={cita.estado}
            hora={cita.hora}
            doctor={cita.doctor}
            especialidad={cita.especialidad}
            direccion={cita.direccion}
            turno={cita.turno}
            notas={cita.notas}
          />
        </View>
      ))}
    </ScrollView>
  );
}
