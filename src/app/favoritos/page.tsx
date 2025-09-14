'use client';

import { useState, useEffect } from 'react';
import { PokemonDetalhe } from '@/types/pokemon';
import Image from 'next/image';
import Link from 'next/link';
import { buscarFavoritos } from '@/utils/favoritos';

async function buscarDetalhesPokemon(id: number): Promise<PokemonDetalhe> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.json();
}

export default function PaginaFavoritos() {
  const [pokemonsFavoritos, setPokemonsFavoritos] = useState<PokemonDetalhe[]>([]);
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState<PokemonDetalhe[]>([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function carregarFavoritos() {
      const ids = buscarFavoritos();
      const detalhesFavoritos = await Promise.all(ids.map(buscarDetalhesPokemon));
      setPokemonsFavoritos(detalhesFavoritos);
      setPokemonsFiltrados(detalhesFavoritos);
      setIsLoading(false);
    }
    carregarFavoritos();
  }, []);

  useEffect(() => {
    const listaFiltrada = pokemonsFavoritos.filter(pokemon =>
      pokemon.name.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
    setPokemonsFiltrados(listaFiltrada);
  }, [termoPesquisa, pokemonsFavoritos]);

  if (isLoading) {
    return <p className="text-center mt-8 text-gray-600">Carregando Pokémons favoritos...</p>;
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <h1 className="text-3xl font-bold text-gray-800">Meus Pokémons Favoritos</h1>
        <input
          type="text"
          placeholder="Pesquisar Pokémon..."
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-auto"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
        />
      </div>
      {pokemonsFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pokemonsFiltrados.map((pokemon) => (
            <Link href={`/detalhes/${pokemon.id}`} key={pokemon.id}>
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                <div className="w-32 h-32 mb-4 relative">
                  <Image
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <h2 className="capitalize text-lg font-semibold">{pokemon.name}</h2>
                <span className="text-gray-500">#{String(pokemon.id).padStart(3, '0')}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Você ainda não tem Pokémons favoritos.</p>
      )}
    </section>
  );
}