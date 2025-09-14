import { PokemonDetalhe } from '@/types/pokemon';

function extrairIdDaUrl(url: string): number | null {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}

export async function buscarPokemons(): Promise<PokemonDetalhe[]> {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

    if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);

    const dados = await res.json();

    const detalhes = await Promise.all(
      dados.results.map(async (p: { name: string; url: string }) => {
        const id = extrairIdDaUrl(p.url);
        if (id === null) return null;

        try {
          const resDetalhes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          if (!resDetalhes.ok) return null;
          const pokemonDetalhes = await resDetalhes.json();
          return pokemonDetalhes as PokemonDetalhe;
        } catch (err) {
          console.error(`Erro ao buscar detalhes do Pokémon ${id}:`, err);
          return null;
        }
      })
    );

    return detalhes.filter((p: PokemonDetalhe | null): p is PokemonDetalhe => p !== null);
  } catch (error) {
    console.error('Falha ao buscar Pokémons:', error);
    return [];
  }
}
