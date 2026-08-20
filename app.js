/**
 * Jiron • Time Tracker & DevOps Dashboard Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupModals();
  setupPeriodSwitcher();
  setupKanbanStars();
  setupAgentSimulator();
  setupHobbyForm();
});

// Navegación en la Sidebar
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const titleEl = document.getElementById('current-view-title');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const view = item.getAttribute('data-view');
      
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      if (view === 'view-opencode') {
        openModal('modal-opencode');
      } else if (view === 'view-devops') {
        openModal('modal-devops');
      } else {
        const spanText = item.querySelector('span')?.textContent || 'Time Tracker';
        if (titleEl) titleEl.textContent = spanText;
      }
    });
  });
}

// Gestión de Modales
function setupModals() {
  // Modal Agregar Hobby
  const btnOpenAdd = document.getElementById('btn-open-add-modal');
  const btnCloseAdd = document.getElementById('btn-close-modal');
  if (btnOpenAdd) btnOpenAdd.addEventListener('click', () => openModal('modal-add-hobby'));
  if (btnCloseAdd) btnCloseAdd.addEventListener('click', () => closeModal('modal-add-hobby'));

  // Modal Agente Open Code
  const btnCloseAgent = document.getElementById('btn-close-agent-modal');
  if (btnCloseAgent) btnCloseAgent.addEventListener('click', () => closeModal('modal-opencode'));

  // Modal Guía DevOps
  const btnQuickGuide = document.getElementById('btn-open-guide-quick');
  const btnCloseDevops = document.getElementById('btn-close-devops-modal');
  if (btnQuickGuide) btnQuickGuide.addEventListener('click', () => openModal('modal-devops'));
  if (btnCloseDevops) btnCloseDevops.addEventListener('click', () => closeModal('modal-devops'));

  // Cerrar al hacer clic en el backdrop
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// Conmutador de Periodo (Month, Day, Week)
function setupPeriodSwitcher() {
  const buttons = document.querySelectorAll('.period-btn:not(.dots)');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// Estrellas de favoritos en Kanban
function setupKanbanStars() {
  document.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });
}

// Formulario de Agregar Nuevo Hobby
function setupHobbyForm() {
  const form = document.getElementById('hobby-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('hobby-name').value;
    const category = document.getElementById('hobby-category').value;
    const hours = document.getElementById('hobby-hours').value;

    // Toast feedback
    alert(`✨ ¡Hobby "${name}" (${category} • ${hours}h/sem) registrado con éxito!`);
    form.reset();
    closeModal('modal-add-hobby');
  });
}

// Simulador de Agente Open Code
function setupAgentSimulator() {
  const runBtn = document.getElementById('btn-run-agent');
  const promptSelect = document.getElementById('agent-prompt-select');
  const terminal = document.getElementById('agent-terminal-output');
  const copyBtn = document.getElementById('btn-copy-terminal');

  if (!runBtn || !terminal) return;

  runBtn.addEventListener('click', () => {
    const selectedTask = promptSelect.value;
    terminal.innerHTML = '';

    const logs = [
      { cls: 't-info', text: `[OpenCode AI v1.18.18] Conectando con entorno local...` },
      { cls: 't-thought', text: `🤔 [Pensamiento]: Procesando '${selectedTask}' con los horarios del Task Management.` },
      { cls: 't-info', text: `⚡ [Acción]: Ejecutando herramienta de optimización de horario...` }
    ];

    let finalMsg = '';
    if (selectedTask === 'plan_7_dias') {
      finalMsg = `
📅 PLAN DE 7 DÍAS RECOMENDADO:
• Lunes: 09:00 - UI & Mobile App Design (2h)
• Martes: 09:45 - API Integration & Backend en Python (1.5h)
• Miércoles: 09:45 - Estudio de Algoritmos & Open Code (1h)
• Jueves: 09:00 - Wireframing & UX Architecture (1.5h)
• Viernes: 09:45 - Pruebas y QA en Docker (1h)
• Sábado: 09:45 - Prototipado y creación de microservicios (2h)
• Domingo: Revisión de métricas y descanso activo.`;
    } else if (selectedTask === 'recomendaciones') {
      finalMsg = `
💡 3 HOBBIES COMPLEMENTARIOS SUGERIDOS:
1. 🎨 Ilustración Vectorial (Mejora tus habilidades en UI/UX).
2. 🧘 Mindfulness Diario (Mejora la concentración al programar).
3. 📸 Fotografía Urbana (Estimula la perspectiva visual).`;
    } else {
      finalMsg = `
⏳ OPTIMIZACIÓN DE TIEMPO:
• Carga actual detectada: 14.5 horas semanales distribuidas.
• Recomendación: Bloques de trabajo profundo de 45 min con 10 min de descanso.`;
    }

    let i = 0;
    function printNext() {
      if (i < logs.length) {
        const p = document.createElement('p');
        p.className = `t-line ${logs[i].cls}`;
        p.textContent = logs[i].text;
        terminal.appendChild(p);
        terminal.scrollTop = terminal.scrollHeight;
        i++;
        setTimeout(printNext, 400);
      } else {
        setTimeout(() => {
          const res = document.createElement('p');
          res.className = 't-line';
          res.style.color = '#34d399';
          res.innerHTML = `<strong>Respuesta del Agente:</strong><pre style="margin-top:0.3rem; color:#a7f3d0;">${finalMsg}</pre>`;
          terminal.appendChild(res);
          terminal.scrollTop = terminal.scrollHeight;
        }, 300);
      }
    }

    printNext();
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(terminal.innerText).then(() => {
        copyBtn.textContent = '¡Copiado!';
        setTimeout(() => copyBtn.textContent = 'Copiar', 2000);
      });
    });
  }
}
