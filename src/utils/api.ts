import { PokemonDetalhe } from '@/types/pokemon';

function extrairIdDaUrl(url: string): number | null {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}

export async function buscarPokemons(): Promise<PokemonDetalhe[]> {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    
    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    const dados = await res.json();

    const detalhes = dados.results.map((p: { name: string; url: string }) => {
      const id = extrairIdDaUrl(p.url);
      if (id === null) return null;

      return {
        id,
        name: p.name,
        sprites: {
          other: {
            "official-artwork": {
              front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            }
          }
        },
        types: [],
        weight: 0,
        height: 0,
      } as PokemonDetalhe;
    }).filter((p: PokemonDetalhe | null): p is PokemonDetalhe => p !== null); 

    return detalhes;

  } catch (error) {
    console.error('Falha ao buscar Pokémons:', error);
    return [];
  }
}