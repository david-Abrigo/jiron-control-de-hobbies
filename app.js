/**
 * HobbyTracker & DevOps Learning Platform Logic
 */

// Estado inicial y almacenamiento local
const STORAGE_KEY = 'hobby_tracker_data_v1';

const DEFAULT_HOBBIES = [
  {
    id: '1',
    name: 'Tocar Guitarra Acústica',
    category: 'Música',
    level: 'Intermedio',
    hours: 4,
    notes: 'Aprender canciones de rock clásico y escalas pentatónicas.',
    favorite: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Desarrollo con Agentes IA & Python',
    category: 'Tecnología',
    level: 'Avanzado',
    hours: 8,
    notes: 'Experimentar con OpenCode, LangChain y microservicios Docker.',
    favorite: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Senderismo de Montaña',
    category: 'Aire Libre',
    level: 'Principiante',
    hours: 3,
    notes: 'Hacer una ruta nueva cada fin de semana con amigos.',
    favorite: false,
    createdAt: new Date().toISOString()
  }
];

let hobbies = [];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  loadHobbies();
  setupTabs();
  setupForm();
  setupFilters();
  setupAgentSimulator();
  setupCopyButtons();
  renderHobbies();
});

// Cargar hobbies desde LocalStorage
function loadHobbies() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      hobbies = JSON.parse(saved);
    } catch (e) {
      hobbies = [...DEFAULT_HOBBIES];
    }
  } else {
    hobbies = [...DEFAULT_HOBBIES];
    saveHobbies();
  }
}

// Guardar en LocalStorage
function saveHobbies() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hobbies));
  updateStats();
}

// Actualizar contadores
function updateStats() {
  const totalHobbiesEl = document.getElementById('total-hobbies');
  const totalHoursEl = document.getElementById('total-hours');
  const favoriteCountEl = document.getElementById('favorite-count');

  if (!totalHobbiesEl) return;

  const total = hobbies.length;
  const totalHours = hobbies.reduce((acc, h) => acc + (parseFloat(h.hours) || 0), 0);
  const favorites = hobbies.filter(h => h.favorite).length;

  totalHobbiesEl.textContent = total;
  totalHoursEl.textContent = `${totalHours}h`;
  favoriteCountEl.textContent = favorites;
}

// Renderizado de las tarjetas de hobbies
function renderHobbies() {
  const grid = document.getElementById('hobbies-grid');
  const emptyState = document.getElementById('empty-state');
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');

  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCategory = categoryFilter ? categoryFilter.value : 'ALL';

  const filtered = hobbies.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                          (item.notes && item.notes.toLowerCase().includes(searchTerm));
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    grid.innerHTML = filtered.map(hobby => `
      <div class="hobby-card" data-id="${hobby.id}">
        <div>
          <div class="hobby-top">
            <div>
              <h3 class="hobby-title">${escapeHtml(hobby.name)}</h3>
              <span class="badge-category">${escapeHtml(hobby.category)}</span>
            </div>
            <button class="btn-icon fav ${hobby.favorite ? 'active' : ''}" onclick="toggleFavorite('${hobby.id}')" title="Marcar como favorito">
              ${hobby.favorite ? '★' : '☆'}
            </button>
          </div>

          <div class="hobby-meta" style="margin-top: 0.75rem;">
            <span class="hobby-meta-item">🌱 ${escapeHtml(hobby.level)}</span>
            <span class="hobby-meta-item">⏱️ ${hobby.hours}h / semana</span>
          </div>

          ${hobby.notes ? `<div class="hobby-notes" style="margin-top: 0.75rem;">“${escapeHtml(hobby.notes)}”</div>` : ''}
        </div>

        <div class="hobby-actions">
          <span style="font-size: 0.75rem; color: var(--text-muted);">
            ID: #${hobby.id.slice(0, 5)}
          </span>
          <button class="btn-icon del" onclick="deleteHobby('${hobby.id}')" title="Eliminar hobby">
            🗑️
          </button>
        </div>
      </div>
    `).join('');
  }

  updateStats();
}

// Configurar pestañas
function setupTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Actualizar botones
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Actualizar contenidos
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      const targetEl = document.getElementById(targetTab);
      if (targetEl) targetEl.classList.add('active');
    });
  });
}

// Formulario de agregar hobby
function setupForm() {
  const form = document.getElementById('hobby-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('hobby-name');
    const categoryInput = document.getElementById('hobby-category');
    const levelInput = document.getElementById('hobby-level');
    const hoursInput = document.getElementById('hobby-hours');
    const notesInput = document.getElementById('hobby-notes');

    const newHobby = {
      id: Date.now().toString(),
      name: nameInput.value.trim(),
      category: categoryInput.value,
      level: levelInput.value,
      hours: parseFloat(hoursInput.value) || 1,
      notes: notesInput.value.trim(),
      favorite: false,
      createdAt: new Date().toISOString()
    };

    hobbies.unshift(newHobby);
    saveHobbies();
    renderHobbies();

    form.reset();
    hoursInput.value = '3';
    
    // Feedback visual suave
    nameInput.focus();
  });
}

// Filtros y buscador
function setupFilters() {
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');

  if (searchInput) {
    searchInput.addEventListener('input', renderHobbies);
  }
  if (categoryFilter) {
    categoryFilter.addEventListener('change', renderHobbies);
  }
}

// Acciones sobre tarjetas
window.toggleFavorite = function(id) {
  const item = hobbies.find(h => h.id === id);
  if (item) {
    item.favorite = !item.favorite;
    saveHobbies();
    renderHobbies();
  }
};

window.deleteHobby = function(id) {
  if (confirm('¿Deseas eliminar este hobby de tu lista?')) {
    hobbies = hobbies.filter(h => h.id !== id);
    saveHobbies();
    renderHobbies();
  }
};

// Simulador de Agente Open Code
function setupAgentSimulator() {
  const runBtn = document.getElementById('btn-run-agent');
  const promptSelect = document.getElementById('agent-prompt-select');
  const terminal = document.getElementById('agent-terminal-output');
  const copyBtn = document.getElementById('btn-copy-agent-output');

  if (!runBtn || !terminal) return;

  runBtn.addEventListener('click', () => {
    const selectedTask = promptSelect.value;
    runAgentExecution(selectedTask, terminal);
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = terminal.innerText;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = '¡Copiado!';
        setTimeout(() => copyBtn.textContent = 'Copiar Salida', 2000);
      });
    });
  }
}

function runAgentExecution(taskType, terminal) {
  terminal.innerHTML = '';
  
  const hobbyNames = hobbies.map(h => h.name).join(', ') || 'Programación, Guitarra';
  const totalHours = hobbies.reduce((acc, h) => acc + (parseFloat(h.hours) || 0), 0);

  const logs = [
    { type: 'term-info', text: `[OpenCode CLI v1.18.18] Iniciando sesión de agente...` },
    { type: 'term-info', text: `[Contexto Local] Cargando ${hobbies.length} hobbies detectados: (${hobbyNames})` },
    { type: 'term-thought', text: `🤔 [Pensamiento] El usuario solicita: '${taskType}'. Analizando disponibilidad semanal (${totalHours}h) y categorías actuales...` },
    { type: 'term-action', text: `⚡ [Acción] Ejecutando tool: 'hobby_analyzer' con parámetros { count: ${hobbies.length}, mode: '${taskType}' }` },
    { type: 'term-thought', text: `💡 [Razonamiento] Generando recomendaciones optimizadas para mantener constancia sin saturar la rutina diaria.` }
  ];

  let finalResponse = '';

  if (taskType === 'plan_7_dias') {
    finalResponse = `
📋 PLAN DE 7 DÍAS ESTRUCTURADO POR OPEN CODE:
• Día 1 (Lunes): 45m de práctica técnica intensiva en ${hobbies[0]?.name || 'tu hobby principal'}.
• Día 2 (Martes): 30m de lectura teórica y exploración de nuevos recursos.
• Día 3 (Miércoles): Sesión práctica enfocada en corregir puntos débiles.
• Día 4 (Jueves): Día de descanso activo / sesión ligera de 20 minutos.
• Día 5 (Viernes): Desarrollo de un mini-proyecto creativo personal.
• Día 6 (Sábado): 1 hora de práctica libre o colaborativa.
• Día 7 (Domingo): Revisión semanal de avances y registro de metas para la siguiente semana.`;
  } else if (taskType === 'recomendaciones') {
    finalResponse = `
💡 3 HOBBIES COMPLEMENTARIOS SUGERIDOS:
1. 🧘 Mindfulness & Meditación (Ayuda a la concentración en ${hobbies[0]?.name || 'tus actividades'}).
2. 📝 Escritura Creativa o Journaling (Ideal para documentar tu progreso y reflexiones).
3. 📸 Fotografía Digital y Edición (Estimula la creatividad visual y observación).`;
  } else if (taskType === 'optimizacion_tiempo') {
    finalResponse = `
⏳ DIAGNÓSTICO DE CARGA SEMANAL:
• Horas actuales totales: ${totalHours} horas / semana.
• Recomendación de Open Code: Divide tus sesiones en bloques Pomodoro (25m de práctica + 5m de descanso).
• Distribución sugerida: 70% dedicado a hobbies de alta energía y 30% a actividades relajantes.`;
  } else {
    finalResponse = `
✅ CHECKLIST DE HÁBITOS PARA PRINCIPIANTES:
[ ] 1. Preparar el espacio o herramientas 5 minutos antes de iniciar.
[ ] 2. Registrar al menos 1 aprendizaje nuevo al finalizar cada sesión.
[ ] 3. Mantener hidratación y postura ergonómica adecuada.
[ ] 4. Compartir tus avances con la comunidad para mantener motivación.`;
  }

  let index = 0;
  function printNext() {
    if (index < logs.length) {
      const log = logs[index];
      const p = document.createElement('p');
      p.className = `term-line ${log.type}`;
      p.textContent = log.text;
      terminal.appendChild(p);
      terminal.scrollTop = terminal.scrollHeight;
      index++;
      setTimeout(printNext, 450);
    } else {
      setTimeout(() => {
        const resultP = document.createElement('p');
        resultP.className = 'term-line term-result';
        resultP.innerHTML = `<br><strong>🤖 Respuesta Final del Agente:</strong><pre style="margin-top:0.4rem; color:#a7f3d0; font-family:var(--font-mono);">${finalResponse}</pre>`;
        terminal.appendChild(resultP);
        terminal.scrollTop = terminal.scrollHeight;
      }, 500);
    }
  }

  printNext();
}

// Botones de copiado de código
function setupCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          const originalText = btn.textContent;
          btn.textContent = '¡Copiado!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copied');
          }, 2000);
        });
      }
    });
  });
}

// Utilidad anti-XSS
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
