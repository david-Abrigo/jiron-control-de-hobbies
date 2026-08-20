# 🎯 Jiron • Registro de Hobbies & Control de Tiempo

Una aplicación web moderna, interactiva y de alta fidelidad diseñada para registrar, organizar y planificar hobbies, proyectos personales y rutinas creativas. Incluye un tablero visual de gestión de tareas, un calendario de horarios semanal, un asistente inteligente potenciado por **Open Code** y empaquetado con **Docker** para despliegue en producción.

---

## ✨ Características Principales

- 📊 **Control de Tiempo & Horarios (Time Tracker):**
  - Calendario interactivo semanal para organizar sesiones de práctica y dedicación.
  - Indicador de línea de tiempo en tiempo real.
  - Vistas configurables por Día, Semana y Mes.

- 🎨 **Organización por Categorías:**
  - **Diseño UI & Creatividad:** Hobbies artísticos, música y diseño gráfico.
  - **Proyectos en Equipo & Docker:** Desarrollo colaborativo y arquitectura cloud.
  - **Desarrollo Front-end:** Creación de interfaces y aplicaciones web.
  - **Desarrolladores Python:** Lógica de agentes, automatización y análisis.

- 📋 **Tablero de Estados de Actividades (Kanban):**
  - Seguimiento de metas en columnas: *Borrador*, *En Progreso*, *En Edición* y *Completado*.
  - Indicadores de éxito, lista de verificación de hábitos y marcado de favoritos.

- 🤖 **Asistente de Hobbies con Agente Open Code:**
  - Integración con **OpenCode AI** para generar planes de práctica de 7 días personalizados.
  - Diagnóstico de carga horaria para evitar agotamiento (*burnout*).
  - Recomendaciones de nuevos hobbies complementarios.

- 🐳 **Contenedorizado con Docker:**
  - Configuración ligera basada en `nginx:alpine` lista para desplegar en **Render**, Railway o cualquier entorno de nube.

---

## 🚀 Inicio Rápido

### Opción 1: Uso Directo en Navegador
Simplemente abre el archivo `index.html` en tu navegador web preferido:
```bash
# Doble clic en index.html o abrir desde terminal:
start index.html
```

### Opción 2: Ejecución con Docker
Puedes construir y correr la imagen del contenedor localmente:

```bash
# 1. Construir la imagen de Docker
docker build -t jiron-hobbies .

# 2. Ejecutar el contenedor en el puerto 8080
docker run -d -p 8080:80 --name app-hobbies jiron-hobbies
```
Luego abre en tu navegador: `http://localhost:8080`

---

## 🤖 Uso del Agente Open Code

Para interactuar con el agente de análisis de hobbies desde tu terminal:

```bash
# Ejecutar el script del agente en Python (Ciclo ReAct)
python agente_opencode.py

# O ejecutar consultas directas con la CLI de OpenCode
npx opencode-ai run "Analiza mis hobbies registrados y sugiere 3 recomendaciones de mejora"
```

---

## 📁 Estructura del Proyecto

```text
├── index.html              # Estructura principal y componentes del Dashboard
├── styles.css              # Sistema de diseño, temas y estilos visuales
├── app.js                  # Lógica de gestión de hobbies, eventos y simulador
├── Dockerfile              # Configuración de Docker con Nginx para producción
├── nginx.conf              # Configuración del servidor web Nginx
├── agente_opencode.py      # Script funcional del primer Agente IA en Python
├── .dockerignore           # Exclusión de archivos para la imagen Docker
├── .gitignore              # Archivos excluidos del repositorio Git
├── GUIA_PASO_A_PASO.md     # Documentación técnica de Git, GitHub, Ramas y Render
└── README.md               # Documentación general de la aplicación
```

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5 semántico, CSS3 moderno (Variables CSS, Flexbox, CSS Grid), JavaScript Vanilla.
- **Servidor Web & Despliegue:** Nginx Alpine, Docker, Render Cloud.
- **Inteligencia Artificial:** OpenCode AI (`opencode-ai`), Python 3.
- **Control de Versiones:** Git, GitHub.

---

## 👤 Autor

Desarrollado por **[David Abrigo](https://github.com/david-Abrigo)**.
Proyecto de libre uso y aprendizaje.
