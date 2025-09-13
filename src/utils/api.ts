import { PokemonDetalhe } from '@/types/pokemon';

// Função para buscar a lista de 151 Pokémons.
export async function buscarPokemons(): Promise<PokemonDetalhe[]> {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    const dados = await res.json();

    const detalhes = await Promise.all(
      dados.results.map(async (p: { url: string }) => {
        const detalheRes = await fetch(p.url);
        if (!detalheRes.ok) {
          throw new Error(`Erro ao buscar detalhes de ${p.url}`);
        }
        return detalheRes.json();
      })
    );
    return detalhes;

  } catch (error) {
    console.error('Falha ao buscar Pokémons:', error);
    return [];
  }
}