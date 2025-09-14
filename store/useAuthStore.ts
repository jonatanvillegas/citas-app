import { create } from 'zustand';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db,auth } from '@/Config/firebaseConfig';

type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  rol: "doctor" | "secretaria" | "paciente";
  creadoEn: Date;
};

type AuthState = {
  usuario: Usuario | null;
  loading: boolean;
  error: string | null;
  registrar: (nombre: string, correo: string, password: string) => Promise<void>;
  login: (correo: string, contraseña: string) => Promise<void>;
  logout: () => Promise<void>;
  inicializarSesion: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  loading: false,
  error: null,

  registrar: async (nombre, correo, password) => {
    try {
      set({ loading: true, error: null });

      const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      const nuevoUsuario: Usuario = {
        id: user.uid,
        nombre,
        correo,
        rol: "paciente", // Por defecto
        creadoEn: new Date(),
      };

      await setDoc(doc(db, "usuarios", user.uid), nuevoUsuario);
      set({ usuario: nuevoUsuario, loading: false });
      
      
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  login: async (correo, contraseña) => {
    set({ loading: true, error: null });

    try {
      const userCredential = await signInWithEmailAndPassword(auth, correo, contraseña);

      const user = userCredential.user;
    
      // Buscar en "usuarios"
      const userDoc = await getDoc(doc(db, "usuarios", user.uid));
    
      if (userDoc.exists()) {
        const userData = userDoc.data() as Usuario;
        set({ usuario: userData, loading: false });
      } else {
        // Si no está en "usuarios", buscar en "doctor"
        const driverDoc = await getDoc(doc(db, "doctor", user.uid));
        
        if (driverDoc.exists()) {
          const driverData = driverDoc.data() as Usuario;
          set({ usuario: driverData, loading: false });
        } else {
          throw new Error("Usuario no encontrado en Firestore");
        }
      }
    
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  logout: async () => {
  try {
    await signOut(auth);
    set({ usuario: null, loading: false, error: null });
  } catch (error: any) {
    set({ error: error.message, loading: false });
  }
},
  
inicializarSesion: () => {
  set({ loading: true });

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "usuarios", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data() as Usuario;
        set({ usuario: userData, loading: false });
      } else {
        // Buscar en "doctor" si no está en "usuarios"
        const driverDoc = await getDoc(doc(db, "doctor", user.uid));

        if (driverDoc.exists()) {
          const driverData = driverDoc.data() as Usuario;
          set({ usuario: driverData, loading: false });
        } else {
          set({ usuario: null, loading: false });
        }
      }
    } else {
      set({ usuario: null, loading: false });
    }
  });
},
}));
