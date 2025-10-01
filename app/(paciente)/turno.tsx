import { View, Text } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function Turno() {
  // Paleta de colores
  const COLORS = {
    primary: "#1976D2",
    textPrimary: "#1a4971",
    textSecondary: "#6d93b8",
    textDark: "#0d2b43",
    background: "#e3f2fd",
    cardBackground: "#f5f9ff",
    white: "#ffffff",
    black: "#000000",
    border: "#bbdefb",
  };

  // SIMULACIÓN DE ESTADO DE TURNO
  
  // Para simular pantalla "No tiene turno"
  const [tieneTurno] = useState(false);
  const [numeroTurno] = useState<number | null>(null);

  // Para simular pantalla "Turno asignado"
  // const [tieneTurno] = useState(true);
  // const [numeroTurno] = useState<number>(15);

  const totalTurnos = 50;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: COLORS.primary,
          paddingVertical: 24,
          paddingHorizontal: 16,
          alignItems: "center",
          marginBottom: 20,
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "800",
            color: COLORS.white,
            marginBottom: 6,
          }}
        >
          Mi Turno
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: COLORS.white,
            opacity: 0.9,
          }}
        >
          Visualiza tu número de turno en tiempo real
        </Text>
      </View>

      {/* --- Si NO tiene turno --- */}
      {!tieneTurno ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <MaterialIcons
            name="event-busy"
            size={90}
            color={COLORS.primary}
            style={{ marginBottom: 16 }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: COLORS.textDark,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            No tienes un turno asignado
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: COLORS.textSecondary,
              textAlign: "center",
            }}
          >
            Para obtener tu turno en consulta general, por favor dirígete a la
            secretaría del hospital.
          </Text>
        </View>
      ) : (
        /* --- Si tiene turno --- */
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: COLORS.cardBackground,
            borderRadius: 20,
            padding: 24,
            alignItems: "center",
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: COLORS.textPrimary,
              marginBottom: 16,
            }}
          >
            Tu número de turno es:
          </Text>

          {/* Círculo con número */}
          <View
            style={{
              position: "relative",
              width: 150,
              height: 150,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                position: "absolute",
                width: 150,
                height: 150,
                borderRadius: 75,
                borderWidth: 10,
                borderColor: "#e5e7eb",
              }}
            />
            {numeroTurno !== null && (
              <View
                style={{
                  position: "absolute",
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  borderWidth: 10,
                  borderColor: COLORS.primary,
                  borderRightColor: "transparent",
                  borderBottomColor: "transparent",
                  transform: [
                    {
                      rotate: `${
                        numeroTurno === 1
                          ? 360
                          : ((numeroTurno - 1) / (totalTurnos - 1)) * 360
                      }deg`,
                    },
                  ],
                }}
              />
            )}

            {/* Número en el centro */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 48,
                  fontWeight: "800",
                  color: COLORS.primary,
                }}
              >
                {numeroTurno}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.textSecondary,
              textAlign: "center",
            }}
          >
            Por favor espera a que tu número sea llamado en pantalla o por el
            personal del hospital.
          </Text>
        </View>
      )}
    </View>
  );
}
