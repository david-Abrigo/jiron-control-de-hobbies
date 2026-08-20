"""
==============================================================================
Agente de Recomendación de Hobbies con OpenCode / Python
==============================================================================
Este script demuestra cómo construir tu primer agente autónomo básico que:
1. Lee o define una lista de hobbies del usuario.
2. Analiza categorías, dedicación horaria y niveles de experiencia.
3. Genera un plan de acción semanal estructurado mediante un ciclo ReAct.
"""

import json
import time
import sys

# Asegurar compatibilidad de caracteres UTF-8 en terminales Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def tool_analizar_carga_horaria(hobbies):
    """Herramienta (Tool) para calcular horas totales y balance."""
    total_horas = sum(h.get('horas', 0) for h in hobbies)
    categorias = set(h.get('categoria', 'Otros') for h in hobbies)
    return {
        "total_horas_semanales": total_horas,
        "categorias_activas": list(categorias),
        "estado_balance": "Óptimo" if total_horas <= 15 else "Riesgo de sobrecarga"
    }

def ejecutar_primer_agente_opencode():
    print("=" * 60)
    print("🤖 INICIANDO TU PRIMER AGENTE EN OPEN CODE")
    print("=" * 60)

    # 1. Datos de entrada (Hobbies de ejemplo o leídos de archivo)
    hobbies_usuario = [
        {"nombre": "Tocar Guitarra", "categoria": "Música", "nivel": "Intermedio", "horas": 4},
        {"nombre": "Desarrollo en Python & Docker", "categoria": "Tecnología", "nivel": "Avanzado", "horas": 8},
        {"nombre": "Senderismo", "categoria": "Aire Libre", "nivel": "Principiante", "horas": 3}
    ]

    print("\n[Paso 1: Input] Datos de hobbies cargados:")
    for h in hobbies_usuario:
        print(f"  • {h['nombre']} ({h['categoria']}) - {h['nivel']} - {h['horas']}h/sem")

    # 2. Ciclo de razonamiento ReAct (Thought -> Action -> Observation)
    print("\n[Paso 2: Ciclo ReAct del Agente]")
    print("🤔 [Pensamiento]: Debo evaluar si el usuario tiene tiempo disponible y balance entre creatividad y tecnología...")
    time.sleep(1)

    print("⚡ [Acción]: Ejecutando herramienta 'tool_analizar_carga_horaria'...")
    resultado_tool = tool_analizar_carga_horaria(hobbies_usuario)
    time.sleep(1)

    print(f"👁️ [Observación]: Resultado de la herramienta: {json.dumps(resultado_tool, ensure_ascii=False)}")
    time.sleep(1)

    # 3. Respuesta final del Agente
    print("\n[Paso 3: Respuesta Generada por el Agente]")
    print("=" * 60)
    print("🎯 RECOMENDACIÓN SEMANAL PERSONALIZADA:")
    print(f"• Horas totales: {resultado_tool['total_horas_semanales']}h/semana ({resultado_tool['estado_balance']}).")
    print("• Sugerencia de rutina:")
    print("  - Lunes y Miércoles: 1 hora de Guitarra (Música).")
    print("  - Martes, Jueves y Viernes: 2 horas de Python & Docker (Tecnología).")
    print("  - Sábado o Domingo: 3 horas de Senderismo (Aire Libre).")
    print("• Tip de Open Code: Recuerda versionar tus cambios en Git y desplegar en Render!")
    print("=" * 60)

if __name__ == "__main__":
    ejecutar_primer_agente_opencode()

# Actualizado por rama feature/agente-opencode: Agente listo para Render y OpenCode
