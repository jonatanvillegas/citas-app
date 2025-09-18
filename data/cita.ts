export type Cita = {
  fecha: string;
  estado: "confirmada" | "completada" | "pendiente";
  hora: string;
  doctor: string;
  especialidad: string;
  direccion: string;
  turno: number;
  notas?: string;
};

export const citas: Cita[] = [
  {
    fecha: "Martes, 16/09/2025",
    estado: "confirmada",
    hora: "10:00 AM",
    doctor: "Dr. Juan Pérez",
    especialidad: "Cardiología",
    direccion: "Consultorio 8",
    turno: 1,
    notas: "Revisar presión arterial",
  },
  {
    fecha: "Viernes, 21/11/2025",
    estado: "pendiente",
    hora: "02:00 PM",
    doctor: "Dra. Ana Gómez",
    especialidad: "Pediatría",
    direccion: "Consultoio 10",
    turno: 5,
    notas: "Revisar crecimiento y peso del paciente",
  },
  {
    fecha: "Sábado, 02/08/2025",
    estado: "completada",
    hora: "09:30 AM",
    doctor: "Dr. Carlos Ruiz",
    especialidad: "Dermatología",
    direccion: "Consultorio 5",
    turno: 8,
    notas: "Seguimiento de tratamiento de piel",
  },
  {
    fecha: "Lunes, 01/12/2025",
    estado: "confirmada",
    hora: "11:00 AM",
    doctor: "Dra. Laura Fernández",
    especialidad: "Ginecología",
    direccion: "Consultorio 1",
    turno: 2,
    notas: "Control anual y ecografía",
  },
];
