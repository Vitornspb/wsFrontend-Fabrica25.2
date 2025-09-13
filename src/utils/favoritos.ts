const CHAVE_STORAGE = 'favoritos_pokedex';

export function buscarFavoritos(): number[] {
  if (typeof window === 'undefined') {
    return [];
  }
  const favoritosString = localStorage.getItem(CHAVE_STORAGE);
  return favoritosString ? JSON.parse(favoritosString) : [];
}

export function alternarFavorito(pokemonId: number): void {
  const favoritos = buscarFavoritos();
  const index = favoritos.indexOf(pokemonId);

  if (index === -1) {
    favoritos.push(pokemonId);
  } else {
    favoritos.splice(index, 1);
  }
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(favoritos));
}