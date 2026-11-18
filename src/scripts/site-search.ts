import { filterSearchableItems, type SearchableItem } from '../utils/work-filters';

const dialog = document.getElementById('search-dialog');
const openBtn = document.getElementById('search-open-btn');
const closeBtn = document.getElementById('search-dialog-close');
const form = document.getElementById('search-dialog-form');
const input = document.getElementById('global-search');
const statusEl = document.getElementById('search-dialog-status');
const resultsList = document.getElementById('search-dialog-results');
const emptyEl = document.getElementById('search-dialog-empty');
const indexScript = document.getElementById('search-index-data');

if (
  dialog instanceof HTMLDialogElement &&
  openBtn instanceof HTMLButtonElement &&
  closeBtn instanceof HTMLButtonElement &&
  form instanceof HTMLFormElement &&
  input instanceof HTMLInputElement &&
  statusEl &&
  resultsList &&
  emptyEl
) {
  const items: SearchableItem[] = indexScript?.textContent ? JSON.parse(indexScript.textContent) : [];
  const itemElements = [...resultsList.querySelectorAll<HTMLElement>('[data-search-id]')];
  let lastTrigger: HTMLElement | null = null;

  const updateResults = (rawQuery: string, syncUrl = false) => {
    const query = rawQuery.trim();
    const matchedIds = new Set(filterSearchableItems(items, query).map((item) => item.id));
    let visibleCount = 0;

    for (const el of itemElements) {
      const id = el.dataset.searchId ?? '';
      el.hidden = !matchedIds.has(id);
      if (!el.hidden) visibleCount += 1;
    }

    resultsList.hidden = visibleCount === 0;
    emptyEl.hidden = visibleCount > 0;

    if (!query) {
      statusEl.textContent = `${visibleCount} ${visibleCount === 1 ? 'item disponível' : 'itens disponíveis'}`;
    } else if (visibleCount === 0) {
      statusEl.textContent = 'Nenhum texto corresponde à busca. Tente outras palavras ou tags.';
    } else {
      statusEl.textContent = `${visibleCount} ${visibleCount === 1 ? 'resultado encontrado' : 'resultados encontrados'}`;
    }

    if (syncUrl) {
      const next = new URL(window.location.href);
      if (query) next.searchParams.set('q', query);
      else next.searchParams.delete('q');
      window.history.replaceState({}, '', `${next.pathname}${next.search}${next.hash}`);
    }
  };

  const openSearch = (trigger: HTMLElement | null = openBtn) => {
    lastTrigger = trigger;
    if (!dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
    updateResults(input.value, false);
    input.focus();
    input.select();
  };

  const closeSearch = () => {
    if (dialog.open) {
      dialog.close();
    }
  };

  openBtn.addEventListener('click', () => openSearch(openBtn));
  closeBtn.addEventListener('click', () => closeSearch());

  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    if (lastTrigger && document.contains(lastTrigger)) {
      lastTrigger.focus();
    } else {
      openBtn.focus();
    }
  });

  // Close when clicking the backdrop outside the dialog panel
  dialog.addEventListener('click', (event) => {
    const panel = dialog.querySelector('.search-dialog-panel');
    if (panel && event.target === dialog) {
      closeSearch();
    }
  });

  input.addEventListener('input', () => {
    updateResults(input.value, true);
  });

  // Explicitly close the dialog on Escape even when <input type="search"> has text
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeSearch();
    }
  });

  // Predictable Enter behavior: navigate to the first visible result if available
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstVisibleLink = itemElements
      .find((el) => !el.hidden)
      ?.querySelector<HTMLAnchorElement>('a.search-result-link');
    if (firstVisibleLink?.href) {
      window.location.assign(firstVisibleLink.href);
    } else {
      updateResults(input.value, true);
    }
  });

  // Support URL ?q= parameter on initial load
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q');
  if (initialQuery !== null && initialQuery.trim() !== '') {
    input.value = initialQuery;
    openSearch(openBtn);
  } else {
    updateResults('', false);
  }
}
