import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CitasPendientesDoctor() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [citaSeleccionada, setCitaSeleccionada] = useState<any>(null); // Para manejar la cita actual

  const COLORS = {
    primary: "#1976D2",
    textPrimary: "#1a4971",
    textSecondary: "#6d93b8",
    textDark: "#0d2b43",
    background: "#e3f2fd",
    cardBackground: "#f5f9ff",
    border: "#bbdefb",
    white: "#ffffff",
    black: "#000000",
    success: "#2E7D32",
    warning: "#F9A825",
  };

  // Simulación de citas del doctor
  const citasDoctor = [
    {
      id: 1,
      fecha: "2025-09-27",
      hora: "08:00 AM",
      paciente: "María González",
      especialidad: "Medicina General",
      estado: "Pendiente",
    },
    {
      id: 2,
      fecha: "2025-09-27",
      hora: "11:30 AM",
      paciente: "Jorge Ocón",
      especialidad: "Medicina General",
      estado: "Pendiente",
    },
    {
      id: 3,
      fecha: "2025-09-28",
      hora: "10:10 AM",
      paciente: "Ana López",
      especialidad: "Medicina General",
      estado: "Pendiente",
    },
    {
      id: 4,
      fecha: "2025-09-28",
      hora: "02:20 PM",
      paciente: "Francisco Leiva",
      especialidad: "Medicina General",
      estado: "Pendiente",
    },
    {
      id: 5,
      fecha: "2025-09-30",
      hora: "08:30 AM",
      paciente: "Heidy Huete",
      especialidad: "Medicina General",
      estado: "Pendiente",
    },
    {
      id: 6,
      fecha: "2025-09-30",
      hora: "10:20 AM",
      paciente: "Nataly Lezcano",
      especialidad: "Medicina General",
      estado: "Pendiente",
    },
    {
      id: 7,
      fecha: "2025-10-15",
      hora: "01:00 PM",
      paciente: "Josue Bravo",
      especialidad: "Medicina General",
      estado: "Pendiente",
    },
    {
      id: 8,
      fecha: "2025-10-15",
      hora: "01:20 PM",
      paciente: "Leidy Luna",
      especialidad: "Medicina General",
      estado: "Pendiente",
    },
  ];

  // Generar las fechas marcadas automáticamente
  const markedDates = citasDoctor.reduce((acc, cita) => {
    acc[cita.fecha] = {
      selected: cita.fecha === fechaSeleccionada,
      selectedColor: COLORS.primary,
      selectedTextColor: COLORS.white,
      marked: true,
      dotColor: COLORS.primary,
    };
    return acc;
  }, {} as Record<string, any>);

  if (!markedDates[fechaSeleccionada]) {
    markedDates[fechaSeleccionada] = {
      selected: true,
      selectedColor: COLORS.primary,
      selectedTextColor: COLORS.white,
    };
  }

  const citasFiltradas = citasDoctor.filter(
    (cita) => cita.fecha === fechaSeleccionada
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Encabezado */}
      <View
        style={{
          backgroundColor: COLORS.primary,
          paddingVertical: 24,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: "800", color: COLORS.white }}>
          Citas Pendientes
        </Text>
        <Text style={{ fontSize: 15, color: COLORS.white, opacity: 0.9 }}>
          Visualiza las citas agendadas por fecha
        </Text>
      </View>

      {/* Calendario */}
      <View
        style={{
          backgroundColor: COLORS.cardBackground,
          padding: 16,
          marginHorizontal: 16,
          borderRadius: 16,
          marginBottom: 20,
          shadowColor: COLORS.black,
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Calendar
          onDayPress={(day) => setFechaSeleccionada(day.dateString)}
          markedDates={markedDates}
          theme={{
            todayTextColor: COLORS.primary,
            arrowColor: COLORS.primary,
            textDayFontWeight: "500",
            textMonthFontWeight: "700",
            textDayHeaderFontWeight: "600",
          }}
          enableSwipeMonths={true}
        />
      </View>

      {/* Listado */}
      <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: COLORS.textPrimary,
            marginBottom: 10,
          }}
        >
          Citas para el {fechaSeleccionada}
        </Text>

        {citasFiltradas.length === 0 ? (
          <Text style={{ color: COLORS.textSecondary }}>
            No hay citas pendientes para esta fecha.
          </Text>
        ) : (
          citasFiltradas.map((cita) => (
            <View
              key={cita.id}
              style={{
                backgroundColor: COLORS.cardBackground,
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                shadowColor: COLORS.black,
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: COLORS.textDark,
                  marginBottom: 4,
                }}
              >
                {cita.hora} - {cita.paciente}
              </Text>
              <Text style={{ color: COLORS.textSecondary, marginBottom: 4 }}>
                Especialidad: {cita.especialidad}
              </Text>
              <Text
                style={{
                  color:
                    cita.estado === "Pendiente"
                      ? COLORS.warning
                      : COLORS.success,
                  fontWeight: "600",
                }}
              >
                {cita.estado}
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  padding: 10,
                  borderRadius: 8,
                  alignItems: "center",
                  marginTop: 10,
                }}
                onPress={() => setCitaSeleccionada(cita)} // Abrir modal con detalle
              >
                <Text style={{ color: COLORS.white, fontWeight: "600" }}>
                  Ver Detalle
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* Modal Detalle de Cita */}
      <Modal
        visible={!!citaSeleccionada}
        transparent
        animationType="slide"
        onRequestClose={() => setCitaSeleccionada(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 16,
              padding: 20,
              width: "90%",
              shadowColor: COLORS.black,
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
                color: COLORS.textDark,
                marginBottom: 10,
              }}
            >
              Detalle de la Cita
            </Text>
            {citaSeleccionada && (
              <>
                <Text style={{ fontSize: 16, marginBottom: 6 }}>
                  <Text style={{ fontWeight: "700" }}>Paciente: </Text>
                  {citaSeleccionada.paciente}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 6 }}>
                  <Text style={{ fontWeight: "700" }}>Fecha: </Text>
                  {citaSeleccionada.fecha}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 6 }}>
                  <Text style={{ fontWeight: "700" }}>Hora: </Text>
                  {citaSeleccionada.hora}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 6 }}>
                  <Text style={{ fontWeight: "700" }}>Especialidad: </Text>
                  {citaSeleccionada.especialidad}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 6,
                    color:
                      citaSeleccionada.estado === "Pendiente"
                        ? COLORS.warning
                        : COLORS.success,
                    fontWeight: "700",
                  }}
                >
                  Estado: {citaSeleccionada.estado}
                </Text>
              </>
            )}

            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: COLORS.primary,
                padding: 12,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={() => setCitaSeleccionada(null)} 
            >
              <Text style={{ color: COLORS.white, fontWeight: "700" }}>
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
