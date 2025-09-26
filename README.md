📅 Citas App

Aplicación móvil desarrollada con Expo para la gestión de citas, utilizando Firebase como backend (autenticación, base de datos y almacenamiento) y Gluestack UI para el diseño de interfaces modernas y responsivas.

🚀 Tecnologías utilizadas

Expo – Framework para desarrollo de apps con React Native.

Firebase – Backend as a Service:

🔑 Autenticación de usuarios

☁️ Firestore (base de datos en tiempo real)


Gluestack UI – Biblioteca de componentes para construir interfaces con diseño consistente.

React Navigation – Manejo de navegación en la aplicación.

Zustand Gestión de estado simple y escalable.

📂 Estructura del proyecto
citas-app/
│── assets/             # Recursos estáticos (imágenes, íconos, fuentes)
│── src/
│   ├── components/     # Componentes reutilizables
│   ├── screens/        # Vistas principales (Login, Citas, Perfil, etc.)
│   ├── navigation/     # Configuración de navegación
│   ├── services/       # Conexión con Firebase
│   ├── store/          # Estado global (ej. Zustand)
│   └── utils/          # Funciones auxiliares
│── App.js              # Punto de entrada de la app
│── package.json
│── README.md

🔑 Funcionalidades principales

Registro e inicio de sesión con Firebase Auth.

Creación, edición y eliminación de citas.

Notificaciones locales para recordar citas.

Vista de perfil del usuario.

Interfaz amigable gracias a Gluestack UI.

⚙️ Instalación y ejecución

Clona el repositorio:

git clone https://github.com/jonatanvillegas/citas-app
cd citas-app


Instala dependencias:

npm install
# o
yarn install


Inicia la app en desarrollo:

npx expo start


Escanea el QR con la app de Expo Go o ejecútala en un emulador.
