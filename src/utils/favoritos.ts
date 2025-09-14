const CHAVE_STORAGE = 'favoritos_pokedex';

export function buscarFavoritos(): number[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(CHAVE_STORAGE);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Erro ao ler favoritos do localStorage:', err);
    return [];
  }
}

export function alternarFavorito(pokemonId: number): void {
  const favoritos = buscarFavoritos();
  let novosFavoritos: number[];

  if (favoritos.includes(pokemonId)) {
    novosFavoritos = favoritos.filter(id => id !== pokemonId);
  } else {
    novosFavoritos = [...favoritos, pokemonId];
  }

  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(novosFavoritos));
  } catch (err) {
    console.error('Erro ao salvar favoritos no localStorage:', err);
  }
}
