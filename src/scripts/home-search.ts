const searchInput = document.getElementById('search-input');

searchInput?.addEventListener('input', (event) => {
  const input = event.currentTarget as HTMLInputElement;
  const query = input.value.toLocaleLowerCase('pt-BR').trim();
  document.querySelectorAll<HTMLElement>('.post-card, .featured').forEach((card) => {
    card.style.display = card.textContent?.toLocaleLowerCase('pt-BR').includes(query) ? '' : 'none';
  });
});
