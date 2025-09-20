import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker"; // 👈 instalar: expo install @react-native-picker/picker
import { Calendar } from "react-native-calendars";

export default function AgendarCita() {
  const [step, setStep] = useState(1);

  // Estado para los selects
  const [hospital, setHospital] = useState("");
  const [puesto, setPuesto] = useState("");
  const [area, setArea] = useState("");
  const [doctor, setDoctor] = useState("");

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [paciente, setPaciente] = useState("");

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

  const nextStep = () => setStep(step + 1);

  // Datos de prueba
  const hospitales = ["Hospital Central", "Hospital Occidental", "Hospital Infantil"];
  const puestos = ["Puesto Norte", "Puesto Sur", "Puesto Este"];
  const areas = ["Pediatría", "Cardiología", "Medicina General", "Ginecología"];
  const doctores = ["Dr. Juan Pérez", "Dra. Ana López", "Dr. Carlos García"];
  const horasDisponibles = ["08:00", "09:30", "11:00", "14:00", "15:30"];

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
          Agendar Cita
        </Text>
      </View>

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
        {/* Paso 1 */}
        {step === 1 && (
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: COLORS.textPrimary }}>
              1. Buscar paciente por cédula
            </Text>
            <TextInput
              placeholder="Ingrese cédula..."
              placeholderTextColor={COLORS.placeholderText}
              value={paciente}
              onChangeText={setPaciente}
              style={{
                backgroundColor: COLORS.inputBackground,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginVertical: 16,
                borderWidth: 1,
                borderColor: COLORS.border,
              }}
            />
            <TouchableOpacity
              onPress={nextStep}
              style={{
                backgroundColor: COLORS.primary,
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.white, fontWeight: "600" }}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Paso 2 */}
        {step === 2 && (
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: COLORS.textPrimary, marginBottom: 12 }}>
              2. Seleccione Hospital, Puesto, Área y Doctor
            </Text>

            {/* Hospital */}
            <Text style={{ fontWeight: "600", marginTop: 10 }}>Hospital</Text>
            <Picker
              selectedValue={hospital}
              onValueChange={(value) => setHospital(value)}
              style={{ backgroundColor: COLORS.inputBackground, marginVertical: 8 }}
            >
              <Picker.Item label="Seleccione un hospital" value="" />
              {hospitales.map((h, i) => (
                <Picker.Item key={i} label={h} value={h} />
              ))}
            </Picker>

            {/* Puesto */}
            <Text style={{ fontWeight: "600", marginTop: 10 }}>Puesto de Salud</Text>
            <Picker
              selectedValue={puesto}
              onValueChange={(value) => setPuesto(value)}
              style={{ backgroundColor: COLORS.inputBackground, marginVertical: 8 }}
            >
              <Picker.Item label="Seleccione un puesto" value="" />
              {puestos.map((p, i) => (
                <Picker.Item key={i} label={p} value={p} />
              ))}
            </Picker>

            {/* Área */}
            <Text style={{ fontWeight: "600", marginTop: 10 }}>Área</Text>
            <Picker
              selectedValue={area}
              onValueChange={(value) => setArea(value)}
              style={{ backgroundColor: COLORS.inputBackground, marginVertical: 8 }}
            >
              <Picker.Item label="Seleccione un área" value="" />
              {areas.map((a, i) => (
                <Picker.Item key={i} label={a} value={a} />
              ))}
            </Picker>

            {/* Doctor */}
            <Text style={{ fontWeight: "600", marginTop: 10 }}>Doctor</Text>
            <Picker
              selectedValue={doctor}
              onValueChange={(value) => setDoctor(value)}
              style={{ backgroundColor: COLORS.inputBackground, marginVertical: 8 }}
            >
              <Picker.Item label="Seleccione un doctor" value="" />
              {doctores.map((d, i) => (
                <Picker.Item key={i} label={d} value={d} />
              ))}
            </Picker>

            <TouchableOpacity
              onPress={nextStep}
              style={{
                backgroundColor: COLORS.primary,
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <Text style={{ color: COLORS.white, fontWeight: "600" }}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        )}
        {step === 3 && (
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: COLORS.textPrimary,
                marginBottom: 12,
              }}
            >
              3. Seleccione Fecha
            </Text>

            <Calendar
              // Bloquear días anteriores
              minDate={new Date().toISOString().split("T")[0]}
              // asegurar que no se congele cuando navegas entre meses
              onDayPress={day => {
                  setFecha(day.dateString);
              }}
              markedDates={
                fecha
                  ? { [fecha]: { selected: true, selectedColor: COLORS.primary } }
                  : {} // siempre enviar un objeto válido
              }
              enableSwipeMonths={true} // permite cambiar de mes sin bug
              theme={{
                todayTextColor: COLORS.primary,
                arrowColor: COLORS.primary,
                textDayFontWeight: "500",
                textMonthFontWeight: "700",
                textDayHeaderFontWeight: "600",
              }}
              style={{
                borderRadius: 12,
                marginBottom: 20,
              }}
            />

            <TouchableOpacity
              onPress={nextStep}
              // disabled={!fecha}
              style={{
                backgroundColor: fecha ? COLORS.primary : COLORS.border,
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.white, fontWeight: "600" }}>
                Siguiente
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {step === 4 && (
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: COLORS.textPrimary, marginBottom: 12 }}>
              4. Seleccione Hora
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {horasDisponibles.map((h, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setHora(h)}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 12,
                    margin: 6,
                    backgroundColor: hora === h ? COLORS.primary : COLORS.inputBackground,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                  }}
                >
                  <Text style={{ color: hora === h ? COLORS.white : COLORS.textPrimary, fontWeight: "600" }}>
                    {h}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={nextStep}
              disabled={!hora}
              style={{
                backgroundColor: hora ? COLORS.primary : COLORS.border,
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ color: COLORS.white, fontWeight: "600" }}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        )}
        {step === 5 && (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: COLORS.textPrimary,
                marginBottom: 20,
              }}
            >
              5. Resumen de la Cita
            </Text>

            <Text style={{ color: COLORS.textSecondary, fontSize: 16, marginBottom: 4 }}>
              Paciente: {paciente || "Juan Pérez"}
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 16, marginBottom: 4 }}>
              Hospital: {hospital || "Hospital Central"}
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 16, marginBottom: 4 }}>
              Área: {area || "Medicina General"}
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 16, marginBottom: 4 }}>
              Doctor: {doctor || "Dra. López"}
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 16, marginBottom: 4 }}>
              Fecha: {fecha || "2025-09-20"}
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 16, marginBottom: 20 }}>
              Hora: {hora || "10:30"}
            </Text>

            <View style={{ flexDirection: "row", gap: 16 }}>
              {/* Botón Guardar */}
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  padding: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  flex: 1,
                  marginHorizontal: 5,
                }}
              >
                <Text style={{ color: COLORS.white, fontWeight: "600" }}>Guardar</Text>
              </TouchableOpacity>

              {/* Botón Cancelar */}
              <TouchableOpacity
                onPress={() => setStep(1)}
                style={{
                  backgroundColor: "#E53935",
                  padding: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  flex: 1,
                  marginHorizontal: 5,
                }}
              >
                <Text style={{ color: COLORS.white, fontWeight: "600" }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
