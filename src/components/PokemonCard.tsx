'use client';

import { PokemonDetalhe } from '@/types/pokemon';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  pokemon: PokemonDetalhe;
  tipoVisualizacao: 'grid' | 'lista';
  favoritos: number[];
  onFavoritoClick: (id: number) => void;
}

export default function PokemonCard({
  pokemon,
  tipoVisualizacao,
  favoritos,
  onFavoritoClick,
}: PokemonCardProps) {
  const isFavorito = favoritos.includes(pokemon.id);

  return (
    <div
      className={
        tipoVisualizacao === 'grid'
          ? "relative bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
          : "relative bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-left hover:shadow-xl transition-shadow"
      }
    >
      <button
        onClick={() => onFavoritoClick(pokemon.id)}
        className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
          isFavorito ? 'text-yellow-400' : 'text-gray-400'
        }`}
        aria-label={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27l-5.18 2.73 1.05-5.84-4.24-4.14 5.86-.85 2.62-5.32 2.62 5.32 5.86.85-4.24 4.14 1.05 5.84z" />
        </svg>
      </button>

      <Link href={`/detalhes/${pokemon.id}`} className={tipoVisualizacao === 'lista' ? "flex items-center space-x-4 w-full" : "w-full"}>
        <div className={tipoVisualizacao === 'grid' ? "w-32 h-32 mb-4 relative" : "w-16 h-16 relative"}>
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            fill
            className="object-contain"
            priority={tipoVisualizacao === 'grid'}
          />
        </div>
        <div className={tipoVisualizacao === 'lista' ? "flex flex-col" : "w-full"}>
          <h2 className="capitalize text-lg font-semibold">{pokemon.name}</h2>
          <span className="text-gray-500">#{String(pokemon.id).padStart(3, '0')}</span>
        </div>
      </Link>
    </div>
  );
}
