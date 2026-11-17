import { filterWorks, type FilterableWork } from '../utils/work-filters';

const form = document.querySelector<HTMLFormElement>('#work-filters');
const catalog = document.querySelector<HTMLElement>('#work-catalog');
const count = document.querySelector<HTMLElement>('#filter-count');
const emptyState = document.querySelector<HTMLElement>('.empty');

if (form && catalog && count && emptyState) {
  const works = JSON.parse(catalog.dataset.works ?? '[]') as FilterableWork[];
  const cards = [...catalog.querySelectorAll<HTMLElement>('[data-work-id]')];

  const applyFilters = () => {
    const values = new FormData(form);
    const filters = {
      query: String(values.get('query') ?? ''),
      mediaType: String(values.get('mediaType') ?? '') as '' | 'anime' | 'manga',
      genre: String(values.get('genre') ?? ''),
      year: String(values.get('year') ?? ''),
      season: String(values.get('season') ?? '') as '' | 'winter' | 'spring' | 'summer' | 'fall',
    };
    const visibleIds = new Set(filterWorks(works, filters).map((work) => work.id));
    let visible = 0;
    for (const card of cards) {
      card.hidden = !visibleIds.has(card.dataset.workId ?? '');
      if (!card.hidden) visible += 1;
    }
    count.textContent = `${visible} ${visible === 1 ? 'obra encontrada' : 'obras encontradas'}`;
    emptyState.hidden = visible > 0;
    catalog.hidden = visible === 0;
  };

  form.addEventListener('input', applyFilters);
  form.addEventListener('change', applyFilters);
  form.addEventListener('reset', () => requestAnimationFrame(applyFilters));
  applyFilters();
}
