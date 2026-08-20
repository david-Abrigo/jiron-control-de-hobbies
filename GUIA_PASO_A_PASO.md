# 📘 Guía Completa: Git, GitHub, Ramas, Open Code y Despliegue en Render con Docker

Esta guía contiene la explicación detallada y los comandos exactos para completar el flujo de trabajo profesional desde tu máquina local hasta la nube en producción.

---

## 📑 Tabla de Contenidos
1. [Paso 1: Uso de Git (Control de Versiones Local)](#paso-1-uso-de-git)
2. [Paso 2: Uso de GitHub (Repositorio Remoto)](#paso-2-uso-de-github)
3. [Paso 3: Creación de una Rama (Branching)](#paso-3-creación-de-una-rama)
4. [Paso 4: Unión de su Rama contra el Main (Merge / Fusión)](#paso-4-unión-de-su-rama-contra-el-main)
5. [Paso 5: Creación de su Primer Agente en Open Code](#paso-5-creación-de-su-primer-agente-en-open-code)
6. [Paso 6: Publicación y Despliegue en Render con Docker](#paso-6-publicación-y-despliegue-en-render-con-docker)

---

## 🛠️ Paso 1: Uso de Git

Git es un sistema de control de versiones distribuido que te permite rastrear los cambios en tu código a lo largo del tiempo.

### Comandos a ejecutar:

1. **Abrir tu terminal en la carpeta del proyecto:**
   ```powershell
   cd "C:\Users\User\Documents\Gemini cli proyects\Docker first"
   ```

2. **Inicializar el repositorio de Git:**
   ```powershell
   git init
   ```

3. **Verificar el estado de los archivos:**
   ```powershell
   git status
   ```

4. **Agregar todos los archivos al área de preparación (Staging Area):**
   ```powershell
   git add .
   ```

5. **Crear tu primer commit (guardar la foto del proyecto):**
   ```powershell
   git commit -m "feat: proyecto inicial de registro de hobbies y dockerfile"
   ```

---

## 🌐 Paso 2: Uso de GitHub

GitHub es la plataforma en la nube para alojar y compartir repositorios Git.

### Comandos a ejecutar:

1. **Crea un nuevo repositorio en GitHub:**
   - Ve a [github.com/new](https://github.com/new).
   - Nómbralo por ejemplo: `registro-hobbies-docker`.
   - Déjalo **Público** (o Privado) y **no** selecciones "Initialize with README" (ya tenemos el proyecto creado).

2. **Renombrar la rama principal a `main`:**
   ```powershell
   git branch -M main
   ```

3. **Enlazar tu repositorio local con GitHub:**
   *(Reemplaza `TU_USUARIO` con tu usuario real de GitHub)*
   ```powershell
   git remote add origin https://github.com/TU_USUARIO/registro-hobbies-docker.git
   ```

4. **Subir tu código a GitHub por primera vez:**
   ```powershell
   git push -u origin main
   ```

---

## 🌿 Paso 3: Creación de una Rama (Branch)

Las ramas permiten desarrollar nuevas características o corregir errores de forma aislada sin afectar el código estable de la rama `main`.

### Comandos a ejecutar:

1. **Crear y pasarse inmediatamente a una nueva rama:**
   ```powershell
   git checkout -b feature/agente-opencode
   ```
   *(O de forma equivalente con el comando moderno: `git switch -c feature/agente-opencode`)*

2. **Verificar en qué rama te encuentras:**
   ```powershell
   git branch
   ```

3. **Realizar cualquier modificación en el código** (por ejemplo, editar `index.html` o agregar una nueva nota).

4. **Guardar los cambios dentro de la nueva rama:**
   ```powershell
   git add .
   git commit -m "feat: mejoras en el agente opencode y configuracion de docker"
   ```

5. **Subir la nueva rama a GitHub:**
   ```powershell
   git push -u origin feature/agente-opencode
   ```

---

## 🔀 Paso 4: Unión de su Rama contra el Main (Merge)

Una vez que los cambios de tu rama están listos y probados, se deben fusionar de vuelta a la rama principal (`main`).

### Opción A: Desde la Terminal (Merge Local)

1. **Regresar a la rama principal `main`:**
   ```powershell
   git checkout main
   ```

2. **Asegurarte de tener la versión más reciente:**
   ```powershell
   git pull origin main
   ```

3. **Fusionar la rama `feature/agente-opencode` dentro de `main`:**
   ```powershell
   git merge feature/agente-opencode
   ```

4. **Subir los cambios ya fusionados a GitHub:**
   ```powershell
   git push origin main
   ```

5. *(Opcional)* **Eliminar la rama local una vez fusionada:**
   ```powershell
   git branch -d feature/agente-opencode
   ```

### Opción B: Mediante Pull Request (Recomendado en GitHub)
1. Entra a tu repositorio en GitHub.
2. Verás el botón verde **"Compare & pull request"**.
3. Revisa los cambios, escribe una descripción y haz clic en **"Create pull request"**.
4. Haz clic en **"Merge pull request"** y confirma el merge.

---

## 🤖 Paso 5: Creación de su Primer Agente en Open Code

Open Code es una potente herramienta de línea de comandos para ejecutar agentes de IA autónomos que resuelven tareas de código y análisis.

### Formas de usarlo:

1. **Verificar que Open Code esté disponible:**
   ```powershell
   npx opencode-ai --version
   ```

2. **Ejecutar tu primer agente interactivo con un prompt directo:**
   ```powershell
   npx opencode-ai run "Lee el archivo index.html y sugiere 3 nuevas categorias de hobbies"
   ```

3. **Ejecutar el script del Agente en Python incluido:**
   ```powershell
   python agente_opencode.py
   ```

---

## 🚀 Paso 6: Publicación y Despliegue en Render con Docker

Render permite desplegar aplicaciones web estáticas y contenedores Docker de forma gratuita y automática.

### Paso a paso en Render:

1. **Ingresa a tu cuenta:**
   - Ve a [dashboard.render.com](https://dashboard.render.com).
   - Inicia sesión con tu cuenta de **GitHub**.

2. **Crear un nuevo servicio:**
   - Haz clic en el botón superior **"New +"** y selecciona **"Web Service"**.

3. **Conectar el repositorio:**
   - Selecciona tu repositorio de GitHub: `registro-hobbies-docker`.

4. **Configurar el servicio:**
   - **Name**: `registro-hobbies-app` (o el nombre que prefieras).
   - **Region**: Selecciona la más cercana (ej. Oregon, Frankfurt, Ohio).
   - **Branch**: `main`.
   - **Runtime**: Selecciona **Docker** (Render detectará automáticamente el archivo `Dockerfile`).
   - **Instance Type**: Selecciona **Free**.

5. **Desplegar:**
   - Haz clic en el botón **"Create Web Service"**.
   - Render construirá la imagen con `nginx:alpine` y desplegará tu app en un enlace público del tipo:
     `https://registro-hobbies-app.onrender.com`.

6. **¡Despliegue Continuo (CI/CD) Activado!**:
   - A partir de este momento, cada vez que hagas un `git push origin main`, Render compilará y actualizará tu aplicación automáticamente sin que tengas que hacer nada manual.

---

🎉 **¡Felicidades! Has completado el ciclo completo de desarrollo, versionado, ramificación, automatización con agentes y despliegue continuo con Docker en la nube.**
