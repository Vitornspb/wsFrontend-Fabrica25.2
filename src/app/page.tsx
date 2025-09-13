'use client';

import { useState, useEffect } from 'react';
import { PokemonDetalhe } from '@/types/pokemon';
import { buscarPokemons } from '@/utils/api';
import Image from 'next/image';

export default function PaginaInicial() {
  const [pokemons, setPokemons] = useState<PokemonDetalhe[]>([]);
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState<PokemonDetalhe[]>([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      const listaPokemons = await buscarPokemons();
      setPokemons(listaPokemons);
      setPokemonsFiltrados(listaPokemons);
      setIsLoading(false);
    }
    carregarDados();
  }, []);

  useEffect(() => {
    const listaFiltrada = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
    setPokemonsFiltrados(listaFiltrada);
  }, [termoPesquisa, pokemons]);

  if (isLoading) {
    return <p className="text-center mt-8 text-gray-600">Carregando Pokémons...</p>;
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <h1 className="text-3xl font-bold text-gray-800">Pokémons</h1>
        <input
          type="text"
          placeholder="Pesquisar Pokémon..."
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-auto"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonsFiltrados.length > 0 ? (
          pokemonsFiltrados.map((pokemon) => (
            <div key={pokemon.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
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
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">Nenhum Pokémon encontrado.</p>
        )}
      </div>
    </section>
  );
}