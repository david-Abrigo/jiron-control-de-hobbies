# 🎯 Registro de Hobbies & DevOps Hub (Docker + OpenCode + Render)

Aplicación web moderna y ligera para el registro y gestión de hobbies personales, empaquetada con **Docker** y lista para desplegar en **Render**, con soporte para agentes de **Open Code** y un flujo completo de Git & GitHub.

---

## 🚀 Inicio Rápido Local

Para probar la aplicación en tu navegador localmente:
1. Abre el archivo `index.html` en cualquier navegador web.

O ejecútala con Docker:
```bash
docker build -t hobby-tracker .
docker run -p 8080:80 hobby-tracker
```
Abre en tu navegador: `http://localhost:8080`

---

## 🤖 Agente Open Code

Para interactuar con el agente en Open Code:
```bash
npx opencode-ai run "Analiza mis hobbies registrados y sugiere mejoras"
```
O ejecuta el script de ejemplo:
```bash
python agente_opencode.py
```

---

## 📘 Guía Completa de Git, GitHub y Render

Consulta el archivo [GUIA_PASO_A_PASO.md](GUIA_PASO_A_PASO.md) para ver los comandos detallados de:
- Inicialización de Git
- Conexión a GitHub
- Creación de ramas (`feature/...`)
- Fusión (Merge) a `main`
- Despliegue en Render con Dockerfile
