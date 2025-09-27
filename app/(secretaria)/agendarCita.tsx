import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/Config/firebaseConfig";
import { ScrollView, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker"; // 👈 instalar: expo install @react-native-picker/picker
import { Calendar } from "react-native-calendars";

type Usuario = {
  id: string;
  nombre: string;
  cedula: string;
  correo: string;
  rol: "doctor" | "secretaria" | "paciente";
  creadoEn: Date;
};

type Cita = {
  id?: string;
  pacienteId: string;
  pacienteNombre: string;
  doctorId: string;
  doctorNombre: string;
  hospitalId: string;
  puestoId: string;
  area: string;
  fecha: string;
  hora: string;
  creadoEn: Date;
};


export default function AgendarCita() {
  const [step, setStep] = useState(1);

  // Estado para los selects
  const [hospital, setHospital] = useState("");
  const [puesto, setPuesto] = useState("");
  const [area, setArea] = useState("");
  const [doctor, setDoctor] = useState("");

  const [pacientesEncontrados, setPacientesEncontrados] = useState<Usuario[]>([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<Usuario | null>(null);
  const [buscando, setBuscando] = useState(false);


  const [hospitales, setHospitales] = useState<any[]>([]);
  const [puestos, setPuestos] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [doctores, setDoctores] = useState<any[]>([]);
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);


  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [paciente, setPaciente] = useState("");

  const buscarPaciente = async () => {
    if (!paciente) return;

    setBuscando(true);
    try {
      const q = query(
        collection(db, "usuarios"),
        where("rol", "==", "paciente"),
        where("cedula", "==", paciente)
      );

      const snapshot = await getDocs(q);
      const resultados: Usuario[] = [];
      snapshot.forEach(doc => resultados.push(doc.data() as Usuario));

      setPacientesEncontrados(resultados);
    } catch (error: any) {
      console.error("Error buscando paciente:", error.message);
    } finally {
      setBuscando(false);
    }
  };

  const guardarCita = async () => {
    if (!pacienteSeleccionado || !doctor || !fecha || !hora) {
      alert("Faltan datos para guardar la cita.");
      return;
    }

    try {
      const doctorSeleccionado = doctores.find(d => d.id === doctor);

      const nuevaCita: Cita = {
        pacienteId: pacienteSeleccionado.id,
        pacienteNombre: pacienteSeleccionado.nombre,
        doctorId: doctorSeleccionado?.id || "",
        doctorNombre: doctorSeleccionado?.nombre || "",
        hospitalId: hospital,
        puestoId: puesto,
        area,
        fecha,
        hora,
        creadoEn: new Date(),
      };

      await addDoc(collection(db, "citas"), nuevaCita);

      alert("✅ Cita guardada con éxito");
      setStep(1); // volver al inicio
      // opcional: limpiar estados
      setPaciente("");
      setPacienteSeleccionado(null);
      setHospital("");
      setPuesto("");
      setArea("");
      setDoctor("");
      setFecha("");
      setHora("");
    } catch (error: any) {
      console.error("Error guardando cita:", error.message);
      alert("❌ Hubo un error al guardar la cita");
    }
  };

  const cargarDatos = async () => {
    try {
      // Centros de salud (hospitales y puestos)
      const centrosSnapshot = await getDocs(collection(db, "centrosSalud"));
      const hospitalesData: any[] = [];
      const puestosData: any[] = [];

      centrosSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.tipo === "hospital") hospitalesData.push({ id: doc.id, nombre: data.nombre });
        if (data.tipo === "puesto_de_salud") puestosData.push({ id: doc.id, nombre: data.nombre });
      });

      setHospitales(hospitalesData);
      setPuestos(puestosData);

      // Áreas: tomar de doctores únicos
      const doctoresSnapshot = await getDocs(collection(db, "doctores"));
      const areasSet = new Set<string>();
      const doctoresData: any[] = [];

      doctoresSnapshot.forEach((doc) => {
        const data = doc.data();
        areasSet.add(data.especialidad);
        doctoresData.push({ id: doc.id, nombre: data.nombre, especialidad: data.especialidad, centroSaludId: data.centroSaludId });
      });

      setAreas(Array.from(areasSet));
      setDoctores(doctoresData);

    } catch (error: any) {
      console.error("Error cargando datos:", error.message);
    }
  };

  const cargarHorarios = async (doctorId: string) => {
    try {
      if (!doctorId) {
        setHorasDisponibles([]);
        return;
      }

      const q = query(
        collection(db, "horarios"),
        where("doctorId", "==", doctorId)
      );

      const snapshot = await getDocs(q);
      const horas: string[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.disponible) {
          horas.push(data.horaInicio);
        }
      });

      // Ordenar en el cliente
      horas.sort((a, b) => a.localeCompare(b));

      setHorasDisponibles(horas);


    } catch (error: any) {
      console.error("Error cargando horarios:", error.message);
      setHorasDisponibles([]);
    }
  };

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

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    console.log("Doctor cambiado:", doctor);
    cargarHorarios(doctor);
  }, [doctor]);
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
              onPress={buscarPaciente}
              style={{
                backgroundColor: COLORS.primary,
                padding: 12,
                borderRadius: 12,
                alignItems: "center",
                marginBottom: 16
              }}
            >
              <Text style={{ color: COLORS.white, fontWeight: "600" }}>Buscar</Text>
            </TouchableOpacity>

            {/* Mostrar resultados */}
            {buscando && <Text>Buscando...</Text>}
            {pacientesEncontrados.map(p => (
              <TouchableOpacity
                key={p.id}
                onPress={() => setPacienteSeleccionado(p)}
                style={{
                  padding: 12,
                  backgroundColor: pacienteSeleccionado?.id === p.id ? COLORS.primary : COLORS.inputBackground,
                  borderRadius: 12,
                  marginBottom: 8
                }}
              >
                <Text style={{ color: pacienteSeleccionado?.id === p.id ? COLORS.white : COLORS.textPrimary }}>
                  {p.nombre} - {p.cedula}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={nextStep}
              disabled={!pacienteSeleccionado} // ✅ solo habilitado si hay paciente seleccionado
              style={{
                backgroundColor: pacienteSeleccionado ? COLORS.primary : COLORS.border,
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 10
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
              {hospitales.map((h) => (
                <Picker.Item key={h.id} label={h.nombre} value={h.id} />
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
                <Picker.Item key={p.id} label={p.nombre} value={p.id} />
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
              {doctores
                .filter((d) => d.centroSaludId === hospital && d.especialidad === area)
                .map((d) => (
                  <Picker.Item key={d.id} label={d.nombre} value={d.id} />
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
                onPress={guardarCita} // ✅ aquí
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
