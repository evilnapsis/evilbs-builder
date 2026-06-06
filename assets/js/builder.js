/* ============================================================
   BS Builder — Main Application
   ============================================================ */

/* ─── 1. STATE ─────────────────────────────────────────────── */

const state = {
  elements: {},       // id → element object
  rootIds: [],        // top-level element IDs (ordered)
  selected: null,     // currently selected element id
  history: [],        // snapshots for undo/redo
  historyIdx: -1,
  counter: 0,
};

// Drag & drop shared state
let dragInfo = null;  // { source: 'sidebar'|'canvas', cid?, eid? }
let dropInfo = null;  // { targetId: string|null, pos: 'before'|'after'|'inside'|'root' }
let lastDropEl = null;

/* ─── 2. ID & ELEMENT CREATION ─────────────────────────────── */

function genId() {
  return `el${++state.counter}`;
}

function createElement(cid) {
  const comp = findComponent(cid);
  if (!comp) return null;

  const id = genId();
  return {
    id,
    type: cid,
    label: comp.label,
    tag: comp.tag || 'div',
    classes: comp.defaultClasses || '',
    attrs: { ...(comp.attrs || {}) },
    content: comp.isPrebuilt
      ? comp.template
      : (comp.innerContent || comp.defaultContent || ''),
    rawContent: comp.rawContent || comp.isPrebuilt || false,
    isContainer: !comp.isPrebuilt && !comp.isSelfClosing && (comp.isContainer || false),
    isSelfClosing: comp.isSelfClosing || false,
    isPrebuilt: comp.isPrebuilt || false,
    children: [],
  };
}

/* ─── 3. TREE HELPERS ───────────────────────────────────────── */

function findParent(id) {
  for (const [pid, el] of Object.entries(state.elements)) {
    if (el.children && el.children.includes(id)) return pid;
  }
  return null;
}

function getSiblingList(id) {
  const pid = findParent(id);
  return pid ? state.elements[pid].children : state.rootIds;
}

function getAncestors(id) {
  const ancestors = [];
  let cur = findParent(id);
  while (cur) {
    ancestors.unshift(cur);
    cur = findParent(cur);
  }
  return ancestors;
}

function isDescendant(ancestorId, checkId) {
  const el = state.elements[ancestorId];
  if (!el || !el.children) return false;
  for (const cid of el.children) {
    if (cid === checkId || isDescendant(cid, checkId)) return true;
  }
  return false;
}

/* ─── 4. ELEMENT MUTATIONS ──────────────────────────────────── */

function addElement(cid, targetId, pos) {
  const el = createElement(cid);
  if (!el) return null;
  state.elements[el.id] = el;
  insertElement(el.id, targetId, pos);
  saveHistory();
  render();
  selectElement(el.id);
  return el;
}

function insertElement(id, targetId, pos) {
  if (!targetId || pos === 'root') {
    state.rootIds.push(id);
    return;
  }
  if (pos === 'inside') {
    const target = state.elements[targetId];
    if (target && target.isContainer) {
      target.children.push(id);
    } else {
      // fallback: after target
      insertSibling(id, targetId, 'after');
    }
    return;
  }
  insertSibling(id, targetId, pos);
}

function insertSibling(id, refId, pos) {
  const pid = findParent(refId);
  const list = pid ? state.elements[pid].children : state.rootIds;
  const idx = list.indexOf(refId);
  if (idx === -1) {
    list.push(id);
  } else {
    list.splice(pos === 'before' ? idx : idx + 1, 0, id);
  }
}

function removeFromParent(id) {
  const pid = findParent(id);
  if (pid) {
    state.elements[pid].children = state.elements[pid].children.filter(c => c !== id);
  } else {
    state.rootIds = state.rootIds.filter(r => r !== id);
  }
}

function deleteElement(id) {
  removeFromParent(id);
  deleteBranch(id);
  if (state.selected === id) state.selected = null;
  saveHistory();
  render();
  showProperties(null);
}

function deleteBranch(id) {
  const el = state.elements[id];
  if (el) {
    (el.children || []).forEach(cid => deleteBranch(cid));
    delete state.elements[id];
  }
}

function cloneElement(id) {
  const clonedRoot = cloneTree(id);
  const siblings = getSiblingList(id);
  const idx = siblings.indexOf(id);
  siblings.splice(idx + 1, 0, clonedRoot);
  saveHistory();
  render();
  selectElement(clonedRoot);
}

function cloneTree(id) {
  const orig = state.elements[id];
  const newId = genId();
  const copy = JSON.parse(JSON.stringify(orig));
  copy.id = newId;
  copy.children = [];
  state.elements[newId] = copy;
  orig.children.forEach(cid => {
    copy.children.push(cloneTree(cid));
  });
  return newId;
}

function moveElement(sourceId, targetId, pos) {
  if (sourceId === targetId) return;
  if (pos === 'inside' && isDescendant(sourceId, targetId)) return;

  removeFromParent(sourceId);
  insertElement(sourceId, targetId, pos);
  saveHistory();
  render();
  selectElement(sourceId);
}

function moveUp(id) {
  const list = getSiblingList(id);
  const idx = list.indexOf(id);
  if (idx <= 0) return;
  list.splice(idx, 1);
  list.splice(idx - 1, 0, id);
  saveHistory();
  render();
  selectElement(id);
}

function moveDown(id) {
  const list = getSiblingList(id);
  const idx = list.indexOf(id);
  if (idx >= list.length - 1) return;
  list.splice(idx, 1);
  list.splice(idx + 1, 0, id);
  saveHistory();
  render();
  selectElement(id);
}

function updateElement(id, changes) {
  Object.assign(state.elements[id], changes);
  saveHistory();
  render();
  selectElement(id);
}

/* ─── 5. HISTORY ────────────────────────────────────────────── */

function saveHistory() {
  const snap = {
    elements: JSON.parse(JSON.stringify(state.elements)),
    rootIds: [...state.rootIds],
    counter: state.counter,
  };
  state.history = state.history.slice(0, state.historyIdx + 1);
  state.history.push(snap);
  state.historyIdx++;
  updateUndoRedoBtns();
}

function applySnapshot(snap) {
  state.elements = JSON.parse(JSON.stringify(snap.elements));
  state.rootIds = [...snap.rootIds];
  state.counter = snap.counter;
  state.selected = null;
  render();
  showProperties(null);
}

function undo() {
  if (state.historyIdx <= 0) return;
  state.historyIdx--;
  applySnapshot(state.history[state.historyIdx]);
}

function redo() {
  if (state.historyIdx >= state.history.length - 1) return;
  state.historyIdx++;
  applySnapshot(state.history[state.historyIdx]);
}

function updateUndoRedoBtns() {
  document.getElementById('btn-undo').disabled = state.historyIdx <= 0;
  document.getElementById('btn-redo').disabled = state.historyIdx >= state.history.length - 1;
}

/* ─── 6. CANVAS RENDERING ───────────────────────────────────── */

const canvas = document.getElementById('canvas');
const canvasEmpty = document.getElementById('canvas-empty');

function render() {
  // Clear canvas (keep empty state div)
  const children = Array.from(canvas.childNodes);
  children.forEach(c => { if (c !== canvasEmpty) canvas.removeChild(c); });

  const count = Object.keys(state.elements).length;
  document.getElementById('el-count').textContent = `${count} elemento${count !== 1 ? 's' : ''}`;

  if (state.rootIds.length === 0) {
    canvasEmpty.classList.remove('hidden');
    hideFloatingToolbar();
    return;
  }
  canvasEmpty.classList.add('hidden');

  state.rootIds.forEach(id => {
    const el = state.elements[id];
    if (el) canvas.appendChild(renderElement(el));
  });

  // Restore selection outline
  if (state.selected && state.elements[state.selected]) {
    const dom = canvas.querySelector(`[data-id="${state.selected}"]`);
    if (dom) {
      dom.classList.add('bld-selected');
      scheduleToolbarUpdate();
    }
  } else {
    hideFloatingToolbar();
  }

  setupCanvasListeners();
}

function renderElement(el) {
  let dom;

  if (el.isSelfClosing) {
    dom = document.createElement(el.tag);
    applyElProps(dom, el);
    return dom;
  }

  dom = document.createElement(el.tag);
  applyElProps(dom, el);

  if (el.isPrebuilt) {
    dom.innerHTML = el.content;
  } else if (el.isContainer) {
    el.children.forEach(cid => {
      const child = state.elements[cid];
      if (child) dom.appendChild(renderElement(child));
    });
  } else if (el.rawContent) {
    dom.innerHTML = el.content;
  } else {
    dom.textContent = el.content;
  }

  return dom;
}

function applyElProps(dom, el) {
  if (el.classes) dom.className = el.classes;
  dom.dataset.id = el.id;
  dom.dataset.type = el.type;
  dom.dataset.label = el.label;
  dom.dataset.container = el.isContainer ? 'true' : 'false';
  dom.dataset.editable = isTextEditable(el) ? 'true' : 'false';
  dom.draggable = true;

  Object.entries(el.attrs || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') dom.setAttribute(k, v);
  });
}

/* ─── 7. CANVAS EVENT LISTENERS ─────────────────────────────── */

let editingId = null;
let prebuiltEditTarget = null; // DOM node being edited inside a prebuilt/container

const EDITABLE_TAGS = new Set(['h1','h2','h3','h4','h5','h6','p','a','button','span','blockquote','code','small','strong','em','label','li','td','th','caption','figcaption','legend','cite','mark','del','ins']);

// Tags clickable inside prebuilt/container for inline edit
const INNER_EDITABLE_TAGS = new Set(['h1','h2','h3','h4','h5','h6','p','a','button','span','li','label','small','strong','em','th','td','figcaption','blockquote','cite','mark']);

function isTextEditable(el) {
  return !el.isContainer && !el.isSelfClosing && !el.isPrebuilt && EDITABLE_TAGS.has(el.tag);
}

// Find nearest editable text tag walking up from target, stopping at boundary
function findTextTarget(target, boundary) {
  let node = target;
  while (node && node !== boundary) {
    if (node.nodeType === 1 && INNER_EDITABLE_TAGS.has(node.tagName.toLowerCase())) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

function setupCanvasListeners() {
  canvas.querySelectorAll('[data-id]').forEach(dom => {
    const el = state.elements[dom.dataset.id];
    dom.addEventListener('click', onCanvasElClick, { capture: true });
    dom.addEventListener('dblclick', onCanvasElDblClick, { capture: true });
    dom.addEventListener('dragstart', onCanvasDragStart);
    dom.addEventListener('dragend', onCanvasDragEnd);
    if (el) setupTouchDragForCanvasEl(dom, el);
  });
}

function onCanvasElDblClick(e) {
  e.stopPropagation();
  const dom = e.currentTarget;
  const id = dom.dataset.id;
  const el = state.elements[id];
  if (!el) return;

  // Simple text element (h1, p, a, button, etc.)
  if (isTextEditable(el)) {
    startInlineEdit(dom, el);
    return;
  }

  // Prebuilt or container: edit the specific text child that was clicked
  if (el.isPrebuilt || el.isContainer) {
    const textTarget = findTextTarget(e.target, dom);
    if (textTarget) startPrebuiltInlineEdit(dom, textTarget, el);
  }
}

/* ── Simple element inline edit ── */

function startInlineEdit(dom, el) {
  if (editingId === el.id && !prebuiltEditTarget) return;
  exitInlineEdit();

  editingId = el.id;
  dom.contentEditable = 'true';
  dom.draggable = false;
  dom.classList.add('bld-editing');

  focusEnd(dom);
  hideFloatingToolbar();

  dom.addEventListener('keydown', onEditKeydown);
  dom.addEventListener('blur', onEditBlur, { once: true });
}

/* ── Prebuilt / container inner edit ── */

function startPrebuiltInlineEdit(outerDom, textTarget, el) {
  exitInlineEdit();

  editingId = el.id;
  prebuiltEditTarget = textTarget;

  outerDom.draggable = false;
  outerDom.classList.add('bld-editing-prebuilt');
  textTarget.contentEditable = 'true';
  textTarget.classList.add('bld-editing-inner');

  focusEnd(textTarget);
  hideFloatingToolbar();

  textTarget.addEventListener('keydown', onEditKeydown);
  textTarget.addEventListener('blur', onPrebuiltEditBlur, { once: true });
}

function onPrebuiltEditBlur() {
  exitInlineEdit();
}

/* ── Shared keydown handler ── */

function onEditKeydown(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    exitInlineEdit(true);
    return;
  }
  if (e.key === 'Enter' && !e.shiftKey) {
    const tag = prebuiltEditTarget
      ? prebuiltEditTarget.tagName.toLowerCase()
      : state.elements[editingId]?.tag;
    const isBlock = ['p','blockquote','pre','li','td','th'].includes(tag);
    if (!isBlock) {
      e.preventDefault();
      exitInlineEdit();
    }
  }
  e.stopPropagation();
}

function onEditBlur() {
  exitInlineEdit();
}

/* ── Exit / save ── */

function exitInlineEdit(cancel = false) {
  if (!editingId) return;

  const el = state.elements[editingId];
  const outerDom = canvas.querySelector(`[data-id="${editingId}"]`);

  if (prebuiltEditTarget) {
    // Prebuilt / container inner edit
    prebuiltEditTarget.removeEventListener('keydown', onEditKeydown);
    prebuiltEditTarget.contentEditable = 'false';
    prebuiltEditTarget.classList.remove('bld-editing-inner');
    prebuiltEditTarget = null;

    if (outerDom) {
      outerDom.classList.remove('bld-editing-prebuilt');
      outerDom.draggable = true;
      if (!cancel && el) {
        // Save the whole prebuilt's current innerHTML
        const newHTML = outerDom.innerHTML;
        if (newHTML !== el.content) {
          el.content = newHTML;
          saveHistory();
        }
      }
    }
  } else {
    // Simple element edit
    if (outerDom && el) {
      outerDom.removeEventListener('keydown', onEditKeydown);
      if (!cancel) {
        const newText = outerDom.innerText;
        if (newText !== el.content) {
          el.content = newText;
          const propContent = document.getElementById('prop-content');
          if (propContent) propContent.value = newText;
          saveHistory();
        }
      } else {
        outerDom.textContent = el.content;
      }
      outerDom.contentEditable = 'false';
      outerDom.draggable = true;
      outerDom.classList.remove('bld-editing');
    }
  }

  editingId = null;
  if (state.selected) scheduleToolbarUpdate();
}

/* ── Utility ── */

function focusEnd(dom) {
  dom.focus();
  try {
    const range = document.createRange();
    range.selectNodeContents(dom);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } catch (_) {}
}

function onCanvasElClick(e) {
  e.stopPropagation();
  const dom = e.currentTarget;
  selectElement(dom.dataset.id);
}

function onCanvasDragStart(e) {
  e.stopPropagation();
  const dom = e.currentTarget;
  dragInfo = { source: 'canvas', eid: dom.dataset.id };
  dom.classList.add('bld-dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', dom.dataset.id);
}

function onCanvasDragEnd(e) {
  e.currentTarget.classList.remove('bld-dragging');
  clearDropClasses();
  dragInfo = null;
  dropInfo = null;
  lastDropEl = null;
}

// Canvas-level drag over and drop
canvas.addEventListener('dragover', onCanvasDragOver);
canvas.addEventListener('dragleave', onCanvasDragLeave);
canvas.addEventListener('drop', onCanvasDrop);
canvas.addEventListener('click', (e) => {
  if (e.target === canvas) {
    deselectAll();
  }
});

function onCanvasDragOver(e) {
  if (!dragInfo) return;
  e.preventDefault();

  const el = e.target.closest('[data-id]');

  if (!el) {
    // Dragging over bare canvas
    clearDropClasses();
    canvas.classList.add('drag-over-canvas');
    dropInfo = { targetId: null, pos: 'root' };
    lastDropEl = null;
    return;
  }

  canvas.classList.remove('drag-over-canvas');

  if (el === lastDropEl) {
    // Update position within same element
    updateDropPos(e, el);
    return;
  }

  clearDropClasses();
  lastDropEl = el;
  updateDropPos(e, el);
}

function updateDropPos(e, el) {
  const rect = el.getBoundingClientRect();
  const relY = (e.clientY - rect.top) / rect.height;
  const isContainer = el.dataset.container === 'true';
  const targetId = el.dataset.id;

  // Don't allow dropping onto itself (canvas drag)
  if (dragInfo.source === 'canvas' && dragInfo.eid === targetId) return;

  el.classList.remove('drop-before', 'drop-after', 'drop-inside');

  let pos;
  if (relY < 0.25) {
    pos = 'before';
    el.classList.add('drop-before');
  } else if (relY > 0.75 || !isContainer) {
    pos = 'after';
    el.classList.add('drop-after');
  } else {
    pos = 'inside';
    el.classList.add('drop-inside');
  }

  dropInfo = { targetId, pos };
  e.dataTransfer.dropEffect = dragInfo.source === 'sidebar' ? 'copy' : 'move';
}

function onCanvasDragLeave(e) {
  if (!e.relatedTarget || !canvas.contains(e.relatedTarget)) {
    clearDropClasses();
    canvas.classList.remove('drag-over-canvas');
    dropInfo = null;
    lastDropEl = null;
  }
}

function onCanvasDrop(e) {
  e.preventDefault();
  clearDropClasses();
  canvas.classList.remove('drag-over-canvas');

  if (!dragInfo || !dropInfo) { dragInfo = null; dropInfo = null; return; }

  const { source } = dragInfo;
  const { targetId, pos } = dropInfo;

  if (source === 'sidebar') {
    addElement(dragInfo.cid, targetId, pos);
  } else if (source === 'canvas') {
    moveElement(dragInfo.eid, targetId, pos);
  }

  dragInfo = null;
  dropInfo = null;
  lastDropEl = null;
}

function clearDropClasses() {
  canvas.querySelectorAll('.drop-before, .drop-after, .drop-inside').forEach(el => {
    el.classList.remove('drop-before', 'drop-after', 'drop-inside');
  });
}

/* ─── 8. SELECTION & FLOATING TOOLBAR ───────────────────────── */

const elToolbar = document.getElementById('el-toolbar');

function selectElement(id) {
  // Exit inline edit if switching to a different element
  if (editingId && editingId !== id) exitInlineEdit();

  // Clear previous selection
  canvas.querySelectorAll('.bld-selected').forEach(e => e.classList.remove('bld-selected'));

  state.selected = id;
  const dom = canvas.querySelector(`[data-id="${id}"]`);
  if (dom) {
    dom.classList.add('bld-selected');
    scheduleToolbarUpdate();
  }

  showProperties(id);
}

function deselectAll() {
  exitInlineEdit();
  canvas.querySelectorAll('.bld-selected').forEach(e => e.classList.remove('bld-selected'));
  state.selected = null;
  hideFloatingToolbar();
  showProperties(null);
}

function scheduleToolbarUpdate() {
  requestAnimationFrame(() => updateFloatingToolbar(state.selected));
}

function updateFloatingToolbar(id) {
  if (!id || !state.elements[id]) { hideFloatingToolbar(); return; }

  const dom = canvas.querySelector(`[data-id="${id}"]`);
  if (!dom) { hideFloatingToolbar(); return; }

  const rect = dom.getBoundingClientRect();
  const toolbarH = 36;
  let top = rect.top - toolbarH - 4;
  if (top < 0) top = rect.bottom + 4;

  elToolbar.style.top = `${top}px`;
  elToolbar.style.left = `${Math.max(8, rect.left)}px`;
  elToolbar.classList.remove('hidden');

  const el = state.elements[id];
  document.getElementById('el-type-badge').textContent = el.label;
}

function hideFloatingToolbar() {
  elToolbar.classList.add('hidden');
}

// Floating toolbar button actions
document.getElementById('el-move-up').addEventListener('click', () => {
  if (state.selected) moveUp(state.selected);
});
document.getElementById('el-move-down').addEventListener('click', () => {
  if (state.selected) moveDown(state.selected);
});
document.getElementById('el-parent').addEventListener('click', () => {
  if (!state.selected) return;
  const pid = findParent(state.selected);
  if (pid) selectElement(pid);
});
document.getElementById('el-clone').addEventListener('click', () => {
  if (state.selected) cloneElement(state.selected);
});
document.getElementById('el-delete').addEventListener('click', () => {
  if (state.selected) deleteElement(state.selected);
});

// Update toolbar on canvas scroll
document.getElementById('canvas-scroll').addEventListener('scroll', () => {
  if (state.selected) scheduleToolbarUpdate();
});

/* ─── 9. PROPERTIES PANEL ───────────────────────────────────── */

const propsEmpty = document.getElementById('props-empty');
const propsContent = document.getElementById('props-content');

function showProperties(id) {
  if (!id || !state.elements[id]) {
    propsEmpty.classList.remove('hidden');
    propsContent.classList.add('hidden');
    return;
  }

  propsEmpty.classList.add('hidden');
  propsContent.classList.remove('hidden');

  renderProps(id);
}

function renderProps(id) {
  const el = state.elements[id];
  propsContent.innerHTML = buildPropsHTML(el);
  bindPropEvents(id);
}

function buildPropsHTML(el) {
  const comp = findComponent(el.type);
  let html = `
    <div class="props-header">
      <span class="el-tag"><i class="bi bi-${comp ? (comp.icon || 'square') : 'square'}"></i> ${el.label}</span>
      <code style="font-size:10px;color:#94a3b8;">&lt;${el.tag}&gt;</code>
    </div>`;

  // Content section (for non-container, non-prebuilt elements)
  if (!el.isContainer && !el.isSelfClosing) {
    html += `
    <div class="props-section">
      <div class="props-section-header" data-section="content">
        <i class="bi bi-pencil"></i> Contenido
        <i class="bi bi-chevron-down ps-arrow"></i>
      </div>
      <div class="props-section-body" data-body="content">
        <div class="prop-field">
          <label class="prop-label">Texto / HTML</label>
          <textarea class="prop-input prop-textarea" id="prop-content" rows="4">${escHtml(el.content)}</textarea>
        </div>
      </div>
    </div>`;
  }

  // Image src/alt
  if (el.isSelfClosing && el.tag === 'img') {
    html += `
    <div class="props-section">
      <div class="props-section-header" data-section="img">
        <i class="bi bi-image"></i> Imagen
        <i class="bi bi-chevron-down ps-arrow"></i>
      </div>
      <div class="props-section-body" data-body="img">
        <div class="prop-field">
          <label class="prop-label">URL</label>
          <input class="prop-input" id="prop-src" type="text" value="${escAttr(el.attrs.src || '')}">
        </div>
        <div class="prop-field">
          <label class="prop-label">Alt</label>
          <input class="prop-input" id="prop-alt" type="text" value="${escAttr(el.attrs.alt || '')}">
        </div>
      </div>
    </div>`;
  }

  // Link href
  if (el.tag === 'a' || (el.tag === 'button' && el.attrs && el.attrs.href !== undefined)) {
    html += `
    <div class="props-section">
      <div class="props-section-header" data-section="link">
        <i class="bi bi-link-45deg"></i> Enlace
        <i class="bi bi-chevron-down ps-arrow"></i>
      </div>
      <div class="props-section-body" data-body="link">
        <div class="prop-field">
          <label class="prop-label">href</label>
          <input class="prop-input" id="prop-href" type="text" value="${escAttr(el.attrs.href || '#')}">
        </div>
        <div class="prop-field">
          <label class="prop-label">Target</label>
          <select class="prop-input prop-select" id="prop-target">
            <option value="">Mismo tab</option>
            <option value="_blank" ${el.attrs.target === '_blank' ? 'selected' : ''}>Nueva pestaña</option>
          </select>
        </div>
      </div>
    </div>`;
  }

  // Classes section
  html += `
    <div class="props-section">
      <div class="props-section-header" data-section="classes">
        <i class="bi bi-hash"></i> Clases CSS
        <i class="bi bi-chevron-down ps-arrow"></i>
      </div>
      <div class="props-section-body" data-body="classes">
        <div class="prop-field">
          <div class="class-chip-wrap" id="class-chip-wrap">
            ${buildClassChips(el.classes)}
            <input class="class-chip-input" id="class-chip-input" placeholder="añadir clase...">
          </div>
        </div>
        <div class="prop-field">
          <label class="prop-label">Editar clases (texto)</label>
          <input class="prop-input" id="prop-classes" type="text" value="${escAttr(el.classes)}">
        </div>
      </div>
    </div>`;

  // Typography presets (for text elements)
  const textTags = ['h1','h2','h3','h4','h5','h6','p','span','div','blockquote','section'];
  if (textTags.includes(el.tag)) {
    html += buildTypographySection(el);
  }

  // Spacing section
  html += buildSpacingSection(el);

  // Colors section
  html += buildColorsSection(el);

  // Attributes section
  html += `
    <div class="props-section">
      <div class="props-section-header" data-section="attrs">
        <i class="bi bi-code-slash"></i> Atributos HTML
        <i class="bi bi-chevron-down ps-arrow"></i>
      </div>
      <div class="props-section-body" data-body="attrs">
        <div class="prop-field">
          <label class="prop-label">ID</label>
          <input class="prop-input" id="prop-id-attr" type="text" value="${escAttr(el.attrs.id || '')}">
        </div>
        <div class="prop-field">
          <label class="prop-label">Style (inline)</label>
          <input class="prop-input" id="prop-style-attr" type="text" value="${escAttr(el.attrs.style || '')}" placeholder="color:red; font-size:16px">
        </div>
      </div>
    </div>`;

  return html;
}

function buildClassChips(classStr) {
  return classStr.split(' ').filter(Boolean).map(cls =>
    `<span class="class-chip" data-cls="${cls}">${cls} <button type="button" title="Quitar">×</button></span>`
  ).join('');
}

function buildTypographySection(el) {
  const alignClasses = ['text-start', 'text-center', 'text-end'];
  const weightClasses = ['fw-light', 'fw-normal', 'fw-semibold', 'fw-bold'];
  const cur = el.classes;

  return `
    <div class="props-section">
      <div class="props-section-header" data-section="typo">
        <i class="bi bi-type"></i> Tipografía
        <i class="bi bi-chevron-down ps-arrow"></i>
      </div>
      <div class="props-section-body" data-body="typo">
        <div class="preset-group">
          <span class="preset-label">Alineación</span>
          <div class="preset-btns">
            ${alignClasses.map(c => `<button class="preset-btn${cur.includes(c) ? ' active' : ''}" data-toggle-class="${c}">${c.replace('text-', '')}</button>`).join('')}
          </div>
        </div>
        <div class="preset-group">
          <span class="preset-label">Peso</span>
          <div class="preset-btns">
            ${weightClasses.map(c => `<button class="preset-btn${cur.includes(c) ? ' active' : ''}" data-toggle-class="${c}">${c.replace('fw-', '')}</button>`).join('')}
          </div>
        </div>
        <div class="preset-group">
          <span class="preset-label">Tamaño (fs)</span>
          <div class="preset-btns">
            ${['fs-1','fs-2','fs-3','fs-4','fs-5','fs-6'].map(c => `<button class="preset-btn${cur.includes(c) ? ' active' : ''}" data-toggle-class="${c}" data-exclusive="fs">${c}</button>`).join('')}
          </div>
        </div>
        <div class="preset-group">
          <span class="preset-label">Estilo</span>
          <div class="preset-btns">
            ${['fst-italic','text-decoration-underline','text-uppercase','text-lowercase'].map(c =>
              `<button class="preset-btn${cur.includes(c) ? ' active' : ''}" data-toggle-class="${c}">${c.replace('fst-','').replace('text-decoration-','').replace('text-','')}</button>`
            ).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function buildSpacingSection(el) {
  const cur = el.classes;
  const pads = ['p-0','p-1','p-2','p-3','p-4','p-5'];
  const margins = ['m-0','m-1','m-2','m-3','m-4','m-5'];
  const pys = ['py-1','py-2','py-3','py-4','py-5'];
  const pxs = ['px-1','px-2','px-3','px-4','px-5'];

  return `
    <div class="props-section">
      <div class="props-section-header" data-section="spacing">
        <i class="bi bi-arrows-fullscreen"></i> Espaciado
        <i class="bi bi-chevron-down ps-arrow"></i>
      </div>
      <div class="props-section-body" data-body="spacing">
        <div class="preset-group">
          <span class="preset-label">Padding</span>
          <div class="preset-btns">
            ${pads.map(c => `<button class="preset-btn${cur.includes(c) && !cur.match(/p[xy]-/) ? ' active' : ''}" data-toggle-class="${c}" data-exclusive="p">${c}</button>`).join('')}
          </div>
        </div>
        <div class="preset-group">
          <span class="preset-label">Padding Y</span>
          <div class="preset-btns">
            ${pys.map(c => `<button class="preset-btn${cur.includes(c) ? ' active' : ''}" data-toggle-class="${c}" data-exclusive="py">${c}</button>`).join('')}
          </div>
        </div>
        <div class="preset-group">
          <span class="preset-label">Padding X</span>
          <div class="preset-btns">
            ${pxs.map(c => `<button class="preset-btn${cur.includes(c) ? ' active' : ''}" data-toggle-class="${c}" data-exclusive="px">${c}</button>`).join('')}
          </div>
        </div>
        <div class="preset-group">
          <span class="preset-label">Margin</span>
          <div class="preset-btns">
            ${margins.map(c => `<button class="preset-btn${cur.includes(c) ? ' active' : ''}" data-toggle-class="${c}" data-exclusive="m">${c}</button>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function buildColorsSection(el) {
  const cur = el.classes;
  const textColors = ['text-primary','text-secondary','text-success','text-danger','text-warning','text-info','text-dark','text-white','text-muted','text-body'];
  const bgColors = ['bg-primary','bg-secondary','bg-success','bg-danger','bg-warning','bg-info','bg-dark','bg-light','bg-white','bg-transparent'];

  const colorMap = {
    'bg-primary': '#0d6efd', 'bg-secondary': '#6c757d', 'bg-success': '#198754',
    'bg-danger': '#dc3545', 'bg-warning': '#ffc107', 'bg-info': '#0dcaf0',
    'bg-dark': '#212529', 'bg-light': '#f8f9fa', 'bg-white': '#ffffff', 'bg-transparent': 'transparent',
    'text-primary': '#0d6efd', 'text-secondary': '#6c757d', 'text-success': '#198754',
    'text-danger': '#dc3545', 'text-warning': '#ffc107', 'text-info': '#0dcaf0',
    'text-dark': '#212529', 'text-white': '#ffffff', 'text-muted': '#6c757d', 'text-body': '#212529',
  };

  return `
    <div class="props-section">
      <div class="props-section-header" data-section="colors">
        <i class="bi bi-palette"></i> Colores
        <i class="bi bi-chevron-down ps-arrow"></i>
      </div>
      <div class="props-section-body" data-body="colors">
        <div class="preset-group">
          <span class="preset-label">Texto</span>
          <div class="color-swatches">
            ${textColors.map(c => {
              const bg = colorMap[c] || '#ccc';
              const border = bg === '#ffffff' ? '#dee2e6' : bg;
              return `<div class="color-swatch${cur.includes(c) ? ' active' : ''}"
                data-toggle-class="${c}" data-exclusive="text"
                style="background:${bg};border-color:${border};" title="${c}"></div>`;
            }).join('')}
          </div>
        </div>
        <div class="preset-group">
          <span class="preset-label">Fondo</span>
          <div class="color-swatches">
            ${bgColors.map(c => {
              const bg = colorMap[c] || '#ccc';
              const border = bg === '#ffffff' || bg === 'transparent' ? '#dee2e6' : bg;
              return `<div class="color-swatch${cur.includes(c) ? ' active' : ''}"
                data-toggle-class="${c}" data-exclusive="bg"
                style="background:${bg};border-color:${border};" title="${c}"></div>`;
            }).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function bindPropEvents(id) {
  const el = state.elements[id];

  // Section toggle
  propsContent.querySelectorAll('.props-section-header').forEach(header => {
    header.addEventListener('click', () => {
      const bodyKey = header.dataset.section;
      const body = propsContent.querySelector(`[data-body="${bodyKey}"]`);
      if (body) {
        body.classList.toggle('hidden');
        header.classList.toggle('collapsed');
      }
    });
  });

  // Content textarea
  const propContent = document.getElementById('prop-content');
  if (propContent) {
    propContent.addEventListener('input', () => {
      el.content = propContent.value;
      const dom = canvas.querySelector(`[data-id="${id}"]`);
      if (dom) {
        if (el.rawContent) dom.innerHTML = el.content;
        else dom.textContent = el.content;
      }
    });
    propContent.addEventListener('change', () => saveHistory());
  }

  // Classes text input
  const propClasses = document.getElementById('prop-classes');
  if (propClasses) {
    propClasses.addEventListener('input', () => {
      el.classes = propClasses.value;
      const dom = canvas.querySelector(`[data-id="${id}"]`);
      if (dom) dom.className = el.classes;
      // Rebuild chips
      document.getElementById('class-chip-wrap').innerHTML =
        buildClassChips(el.classes) + `<input class="class-chip-input" id="class-chip-input" placeholder="añadir clase...">`;
      bindChipEvents(id);
    });
    propClasses.addEventListener('change', () => saveHistory());
  }

  // Class chip input
  bindChipEvents(id);

  // Image attrs
  const propSrc = document.getElementById('prop-src');
  if (propSrc) {
    propSrc.addEventListener('input', () => {
      el.attrs.src = propSrc.value;
      const dom = canvas.querySelector(`[data-id="${id}"]`);
      if (dom) dom.setAttribute('src', el.attrs.src);
    });
    propSrc.addEventListener('change', () => saveHistory());
  }
  const propAlt = document.getElementById('prop-alt');
  if (propAlt) {
    propAlt.addEventListener('input', () => {
      el.attrs.alt = propAlt.value;
      const dom = canvas.querySelector(`[data-id="${id}"]`);
      if (dom) dom.setAttribute('alt', el.attrs.alt);
    });
  }

  // Link attrs
  const propHref = document.getElementById('prop-href');
  if (propHref) {
    propHref.addEventListener('change', () => {
      el.attrs.href = propHref.value;
      const dom = canvas.querySelector(`[data-id="${id}"]`);
      if (dom) dom.setAttribute('href', el.attrs.href);
      saveHistory();
    });
  }
  const propTarget = document.getElementById('prop-target');
  if (propTarget) {
    propTarget.addEventListener('change', () => {
      el.attrs.target = propTarget.value;
      const dom = canvas.querySelector(`[data-id="${id}"]`);
      if (dom) {
        if (el.attrs.target) dom.setAttribute('target', el.attrs.target);
        else dom.removeAttribute('target');
      }
      saveHistory();
    });
  }

  // ID attr
  const propIdAttr = document.getElementById('prop-id-attr');
  if (propIdAttr) {
    propIdAttr.addEventListener('change', () => {
      el.attrs.id = propIdAttr.value;
      const dom = canvas.querySelector(`[data-id="${id}"]`);
      if (dom) {
        if (el.attrs.id) dom.setAttribute('id', el.attrs.id);
        else dom.removeAttribute('id');
      }
      saveHistory();
    });
  }

  // Style attr
  const propStyleAttr = document.getElementById('prop-style-attr');
  if (propStyleAttr) {
    propStyleAttr.addEventListener('change', () => {
      el.attrs.style = propStyleAttr.value;
      const dom = canvas.querySelector(`[data-id="${id}"]`);
      if (dom) {
        if (el.attrs.style) dom.setAttribute('style', el.attrs.style);
        else dom.removeAttribute('style');
      }
      saveHistory();
    });
  }

  // Toggle class buttons (preset-btn)
  propsContent.querySelectorAll('[data-toggle-class]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cls = btn.dataset.toggleClass;
      const exclusive = btn.dataset.exclusive;
      const classes = el.classes.split(' ').filter(Boolean);

      if (exclusive) {
        // Remove all classes of same exclusive group, then toggle
        const prefixMap = {
          'fs': /^fs-/,
          'p': /^p-\d/,
          'py': /^py-/,
          'px': /^px-/,
          'm': /^m-\d/,
          'text': /^text-/,
          'bg': /^bg-/,
        };
        const regex = prefixMap[exclusive];
        const filtered = regex ? classes.filter(c => !regex.test(c)) : classes;
        const had = classes.some(c => c === cls);
        el.classes = had ? filtered.join(' ') : [...filtered, cls].join(' ');
      } else {
        // Simple toggle
        const idx = classes.indexOf(cls);
        if (idx === -1) classes.push(cls);
        else classes.splice(idx, 1);
        el.classes = classes.join(' ');
      }

      // Update DOM
      const dom = canvas.querySelector(`[data-id="${id}"]`);
      if (dom) dom.className = el.classes;

      // Update class input
      const ci = document.getElementById('prop-classes');
      if (ci) ci.value = el.classes;

      // Update chip area
      const chipWrap = document.getElementById('class-chip-wrap');
      if (chipWrap) {
        chipWrap.innerHTML = buildClassChips(el.classes) + `<input class="class-chip-input" id="class-chip-input" placeholder="añadir clase...">`;
        bindChipEvents(id);
      }

      // Update active states on preset buttons
      propsContent.querySelectorAll('[data-toggle-class]').forEach(b => {
        b.classList.toggle('active', el.classes.includes(b.dataset.toggleClass));
      });

      saveHistory();
    });
  });
}

function bindChipEvents(id) {
  const el = state.elements[id];
  const chipWrap = document.getElementById('class-chip-wrap');
  if (!chipWrap) return;

  // Remove chip buttons
  chipWrap.querySelectorAll('.class-chip button').forEach(btn => {
    btn.addEventListener('click', () => {
      const cls = btn.closest('.class-chip').dataset.cls;
      const classes = el.classes.split(' ').filter(c => c !== cls);
      el.classes = classes.join(' ');
      const dom = canvas.querySelector(`[data-id="${id}"]`);
      if (dom) dom.className = el.classes;
      const ci = document.getElementById('prop-classes');
      if (ci) ci.value = el.classes;
      chipWrap.innerHTML = buildClassChips(el.classes) + `<input class="class-chip-input" id="class-chip-input" placeholder="añadir clase...">`;
      bindChipEvents(id);
      saveHistory();
    });
  });

  // Add class on Enter
  const chipInput = document.getElementById('class-chip-input');
  if (chipInput) {
    chipInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const newCls = chipInput.value.trim();
        if (newCls && !el.classes.includes(newCls)) {
          el.classes = (el.classes + ' ' + newCls).trim();
          const dom = canvas.querySelector(`[data-id="${id}"]`);
          if (dom) dom.className = el.classes;
          const ci = document.getElementById('prop-classes');
          if (ci) ci.value = el.classes;
          chipWrap.innerHTML = buildClassChips(el.classes) + `<input class="class-chip-input" id="class-chip-input" placeholder="añadir clase...">`;
          bindChipEvents(id);
          saveHistory();
        } else {
          chipInput.value = '';
        }
      }
    });
    // Focus chip input when clicking wrap area
    chipWrap.addEventListener('click', (e) => {
      if (!e.target.closest('.class-chip')) chipInput.focus();
    });
  }
}

/* ─── 10. SIDEBAR ───────────────────────────────────────────── */

function buildSidebar() {
  const list = document.getElementById('sidebar-list');
  list.innerHTML = '';

  COMPONENTS.forEach(cat => {
    const section = document.createElement('div');
    section.className = 'comp-category';
    section.dataset.cat = cat.category;

    section.innerHTML = `
      <div class="cat-header" data-cat="${cat.category}">
        <i class="bi ${cat.icon}"></i>
        ${cat.category}
        <i class="bi bi-chevron-down cat-arrow"></i>
      </div>
      <div class="cat-items" data-cat-items="${cat.category}">
        ${cat.items.map(item => `
          <div class="comp-item" draggable="true" data-cid="${item.id}" title="${item.label}">
            <i class="bi ${item.icon}"></i>
            <span>${item.label}</span>
          </div>
        `).join('')}
      </div>`;

    list.appendChild(section);
  });

  // Category toggle
  list.querySelectorAll('.cat-header').forEach(header => {
    header.addEventListener('click', () => {
      const key = header.dataset.cat;
      const items = list.querySelector(`[data-cat-items="${key}"]`);
      items.classList.toggle('hidden');
      header.classList.toggle('collapsed');
    });
  });

  // Sidebar drag start
  list.querySelectorAll('.comp-item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
      dragInfo = { source: 'sidebar', cid: item.dataset.cid };
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('text/plain', item.dataset.cid);
    });
    item.addEventListener('dragend', () => {
      dragInfo = null;
    });
  });
}

// Search filter
document.getElementById('comp-search').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.comp-item').forEach(item => {
    const label = item.querySelector('span').textContent.toLowerCase();
    item.classList.toggle('hidden', q && !label.includes(q));
  });
  // Show/hide categories
  document.querySelectorAll('.comp-category').forEach(cat => {
    const visible = Array.from(cat.querySelectorAll('.comp-item:not(.hidden)')).length > 0;
    cat.classList.toggle('hidden', !visible);
    if (q) {
      const catItems = cat.querySelector('[data-cat-items]');
      if (catItems && visible) catItems.classList.remove('hidden');
    }
  });
});

/* ─── 11. TOOLBAR ACTIONS ───────────────────────────────────── */

document.getElementById('btn-undo').addEventListener('click', undo);
document.getElementById('btn-redo').addEventListener('click', redo);

document.getElementById('btn-clear').addEventListener('click', () => {
  if (Object.keys(state.elements).length === 0) return;
  if (confirm('¿Limpiar todo el canvas? Esta acción no se puede deshacer.')) {
    state.elements = {};
    state.rootIds = [];
    state.selected = null;
    state.history = [];
    state.historyIdx = -1;
    updateUndoRedoBtns();
    render();
    showProperties(null);
  }
});

// Viewport
document.getElementById('vp-group').querySelectorAll('[data-vp]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('vp-group').querySelectorAll('[data-vp]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const outer = document.getElementById('canvas-outer');
    outer.className = `vp-${btn.dataset.vp}`;
  });
});

// Preview
document.getElementById('btn-preview').addEventListener('click', openPreview);
document.getElementById('preview-close').addEventListener('click', closePreview);

function openPreview() {
  const html = generateFullHTML();
  const frame = document.getElementById('preview-frame');
  frame.srcdoc = html;
  frame.style.width = '100%';
  document.getElementById('preview-overlay').classList.remove('hidden');
}

function closePreview() {
  document.getElementById('preview-overlay').classList.add('hidden');
  const frame = document.getElementById('preview-frame');
  frame.srcdoc = '';
}

// Preview viewport
document.getElementById('preview-vp-group').querySelectorAll('[data-pvp]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('preview-vp-group').querySelectorAll('[data-pvp]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('preview-frame').style.width = btn.dataset.pvp;
  });
});

// Close preview on overlay click
document.getElementById('preview-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('preview-overlay')) closePreview();
});

// Export
document.getElementById('btn-export').addEventListener('click', () => {
  const html = generateFullHTML();
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'pagina.html';
  a.click();
  URL.revokeObjectURL(a.href);
});

/* ─── 12. HTML EXPORT ───────────────────────────────────────── */

function generateFullHTML() {
  const body = state.rootIds.map(id => exportElement(state.elements[id], 0)).join('\n');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Página</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
</head>
<body>
${body}
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"><\/script>
</body>
</html>`;
}

function exportElement(el, depth) {
  if (!el) return '';
  const indent = '  '.repeat(depth);

  const classAttr = el.classes ? ` class="${escAttr(el.classes)}"` : '';
  const attrs = Object.entries(el.attrs || {})
    .filter(([k, v]) => v !== undefined && v !== null && v !== '' && k !== 'id' || el.attrs.id)
    .map(([k, v]) => v ? ` ${k}="${escAttr(v)}"` : '')
    .join('');

  const idAttr = el.attrs && el.attrs.id ? ` id="${escAttr(el.attrs.id)}"` : '';
  const allAttrs = `${idAttr}${classAttr}${attrs}`.replace(/\s+/g,' ').trim();
  const attrStr = allAttrs ? ` ${allAttrs}` : '';

  if (el.isSelfClosing) {
    return `${indent}<${el.tag}${attrStr}>`;
  }

  if (el.isPrebuilt || el.rawContent) {
    const content = el.content || '';
    return `${indent}<${el.tag}${attrStr}>\n${indentHTML(content, indent + '  ')}\n${indent}</${el.tag}>`;
  }

  if (el.isContainer) {
    const children = el.children.map(cid => exportElement(state.elements[cid], depth + 1)).join('\n');
    if (!children.trim()) {
      return `${indent}<${el.tag}${attrStr}></${el.tag}>`;
    }
    return `${indent}<${el.tag}${attrStr}>\n${children}\n${indent}</${el.tag}>`;
  }

  return `${indent}<${el.tag}${attrStr}>${escHtml(el.content)}</${el.tag}>`;
}

function indentHTML(html, indent) {
  return html.split('\n').map(line => indent + line.trim()).filter(l => l.trim()).join('\n');
}

/* ─── 13. KEYBOARD SHORTCUTS ────────────────────────────────── */

document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'z') { e.preventDefault(); undo(); }
    if (e.key === 'y') { e.preventDefault(); redo(); }
    if (e.key === 'd') { e.preventDefault(); if (state.selected) cloneElement(state.selected); }
  }

  if (e.key === 'Delete' || e.key === 'Backspace') {
    if (state.selected) { e.preventDefault(); deleteElement(state.selected); }
  }
  if (e.key === 'Escape') {
    deselectAll();
    closePreview();
  }
});

/* ─── 14. UTILITIES ─────────────────────────────────────────── */

function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escAttr(str) {
  return String(str || '').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function isMobile() {
  return window.innerWidth <= 768;
}

/* ─── 15. SIDEBAR TOGGLE ────────────────────────────────────── */

const sidebar    = document.getElementById('sidebar');
const propsPanel = document.getElementById('props-panel');
const backdrop   = document.getElementById('mobile-backdrop');

function toggleSidebar() {
  const isOpen = isMobile() ? sidebar.classList.contains('open') : !sidebar.classList.contains('collapsed');
  if (isMobile()) {
    sidebar.classList.toggle('open');
    updateBackdrop();
  } else {
    sidebar.classList.toggle('collapsed');
  }
  document.getElementById('btn-toggle-sidebar').classList.toggle('active', isMobile() ? !isOpen : isOpen);
}

function toggleProps() {
  const isOpen = isMobile() ? propsPanel.classList.contains('open') : !propsPanel.classList.contains('collapsed');
  if (isMobile()) {
    propsPanel.classList.toggle('open');
    updateBackdrop();
  } else {
    propsPanel.classList.toggle('collapsed');
  }
  document.getElementById('btn-toggle-props').classList.toggle('active', isMobile() ? !isOpen : isOpen);
}

function updateBackdrop() {
  const anyOpen = sidebar.classList.contains('open') || propsPanel.classList.contains('open');
  backdrop.classList.toggle('visible', anyOpen);
}

function closeMobilePanels() {
  sidebar.classList.remove('open');
  propsPanel.classList.remove('open');
  updateBackdrop();
}

document.getElementById('btn-toggle-sidebar').addEventListener('click', toggleSidebar);
document.getElementById('btn-toggle-props').addEventListener('click', toggleProps);
backdrop.addEventListener('click', closeMobilePanels);

// On mobile, close sidebar after picking a component
document.getElementById('sidebar-list').addEventListener('click', (e) => {
  if (isMobile() && e.target.closest('.comp-item')) {
    setTimeout(closeMobilePanels, 300);
  }
});

/* ─── 16. TOUCH DRAG & DROP ─────────────────────────────────── */

let touchDrag = null;  // { source, cid?, eid? }
let touchGhost = null;

function setupTouchDragForItem(item) {
  item.addEventListener('touchstart', onItemTouchStart, { passive: false });
}

function onItemTouchStart(e) {
  const item = e.currentTarget;
  const touch = e.touches[0];
  touchDrag = { source: 'sidebar', cid: item.dataset.cid, label: item.querySelector('span')?.textContent || '' };
  createTouchGhost(touch, touchDrag.label);
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd, { once: true });
  if (isMobile()) closeMobilePanels();
}

function setupTouchDragForCanvasEl(dom, el) {
  dom.addEventListener('touchstart', (e) => {
    if (editingId) return; // don't drag while editing
    const touch = e.touches[0];
    touchDrag = { source: 'canvas', eid: el.id, label: el.label };
    createTouchGhost(touch, el.label);
    dom.classList.add('bld-dragging');
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { once: true });
  }, { passive: true });
}

function createTouchGhost(touch, label) {
  removeTouchGhost();
  touchGhost = document.createElement('div');
  touchGhost.id = 'touch-drag-ghost';
  touchGhost.innerHTML = `<i class="bi bi-grip-vertical"></i> ${label}`;
  document.body.appendChild(touchGhost);
  moveTouchGhost(touch);
}

function removeTouchGhost() {
  if (touchGhost) { touchGhost.remove(); touchGhost = null; }
}

function moveTouchGhost(touch) {
  if (!touchGhost) return;
  touchGhost.style.left = touch.clientX + 'px';
  touchGhost.style.top  = (touch.clientY - 50) + 'px';
}

function onTouchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  moveTouchGhost(touch);

  // Hide ghost to find element underneath
  if (touchGhost) touchGhost.style.display = 'none';
  const under = document.elementFromPoint(touch.clientX, touch.clientY);
  if (touchGhost) touchGhost.style.display = '';

  clearDropClasses();
  canvas.classList.remove('drag-over-canvas');

  if (!under) return;

  const canvasEl = under.closest('[data-id]');
  if (canvasEl && canvas.contains(canvasEl)) {
    const rect = canvasEl.getBoundingClientRect();
    const relY  = (touch.clientY - rect.top) / rect.height;
    const isCont = canvasEl.dataset.container === 'true';
    const tid = canvasEl.dataset.id;

    if (touchDrag.source === 'canvas' && touchDrag.eid === tid) return;

    if (relY < 0.25) {
      canvasEl.classList.add('drop-before');
      dropInfo = { targetId: tid, pos: 'before' };
    } else if (relY > 0.75 || !isCont) {
      canvasEl.classList.add('drop-after');
      dropInfo = { targetId: tid, pos: 'after' };
    } else {
      canvasEl.classList.add('drop-inside');
      dropInfo = { targetId: tid, pos: 'inside' };
    }
  } else if (under.closest('#canvas')) {
    canvas.classList.add('drag-over-canvas');
    dropInfo = { targetId: null, pos: 'root' };
  } else {
    dropInfo = null;
  }
}

function onTouchEnd() {
  document.removeEventListener('touchmove', onTouchMove);
  removeTouchGhost();
  clearDropClasses();
  canvas.classList.remove('drag-over-canvas');

  // Remove dragging class from canvas elements
  canvas.querySelectorAll('.bld-dragging').forEach(el => el.classList.remove('bld-dragging'));

  if (touchDrag && dropInfo) {
    if (touchDrag.source === 'sidebar') {
      addElement(touchDrag.cid, dropInfo.targetId, dropInfo.pos);
    } else if (touchDrag.source === 'canvas') {
      moveElement(touchDrag.eid, dropInfo.targetId, dropInfo.pos);
    }
  } else if (touchDrag && touchDrag.source === 'sidebar' && !dropInfo) {
    // Dropped outside canvas — add to root
    addElement(touchDrag.cid, null, 'root');
  }

  touchDrag = null;
  dropInfo  = null;
}

/* ─── 17. INIT ──────────────────────────────────────────────── */

(function init() {
  buildSidebar();

  // Attach touch drag to sidebar items
  document.querySelectorAll('.comp-item').forEach(setupTouchDragForItem);

  saveHistory();
  render();

  document.getElementById('canvas-outer').className = 'vp-desktop';

  // On mobile: sidebars collapsed by default
  if (isMobile()) {
    document.getElementById('btn-toggle-sidebar').classList.remove('active');
    document.getElementById('btn-toggle-props').classList.remove('active');
  }
})();
