import { notFound } from 'next/navigation';
import { PokemonDetalhe } from '@/types/pokemon';
import Image from 'next/image';

interface PaginaDetalhesProps {
  params: {
    id: string;
  };
}

async function buscarDetalhesPokemon(id: string): Promise<PokemonDetalhe | null> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
    
  } catch (error) {
    console.error('Falha ao buscar detalhes do Pokémon:', error);
    return null;
  }
}

export default async function PaginaDetalhes({ params }: PaginaDetalhesProps) {
  const pokemon = await buscarDetalhesPokemon(params.id);

  if (!pokemon) {
    notFound();
  }

  const urlImagem = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-2xl mx-auto mt-12">
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
        <div className="w-48 h-48 md:w-64 md:h-64 mb-4 md:mb-0 relative">
          {urlImagem && (
            <Image
              src={urlImagem}
              alt={pokemon.name}
              fill
              className="object-contain"
              priority
            />
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold capitalize text-gray-800">
            {pokemon.name}
          </h1>
          <span className="text-xl text-gray-500">#{String(pokemon.id).padStart(3, '0')}</span>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-700">Detalhes</h2>
            <ul className="mt-2 space-y-1">
              <li className="text-gray-600">
                <strong>Tipo(s):</strong> {pokemon.types.map(t => t.type.name).join(', ')}
              </li>
              <li className="text-gray-600">
                <strong>Peso:</strong> {pokemon.weight / 10} kg
              </li>
              <li className="text-gray-600">
                <strong>Altura:</strong> {pokemon.height / 10} m
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}