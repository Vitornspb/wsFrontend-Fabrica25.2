'use client';

import { useState, useEffect } from 'react';
import { PokemonDetalhe } from '@/types/pokemon';
import { buscarPokemons } from '@/utils/api';
import { buscarFavoritos, alternarFavorito } from '@/utils/favoritos';
import PokemonCard from '@/components/PokemonCard';

export default function PaginaInicial() {
  const [pokemons, setPokemons] = useState<PokemonDetalhe[]>([]);
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState<PokemonDetalhe[]>([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [tipoVisualizacao, setTipoVisualizacao] = useState<'grid' | 'lista'>('grid');

  useEffect(() => {
    async function carregarDados() {
      const listaPokemons = await buscarPokemons();
      setPokemons(listaPokemons);
      setPokemonsFiltrados(listaPokemons);
      setFavoritos(buscarFavoritos());
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

  const handleAlternarFavorito = (pokemonId: number) => {
    alternarFavorito(pokemonId);
    setFavoritos(buscarFavoritos());
  };

  const alternarVisualizacao = () => {
    setTipoVisualizacao(tipoVisualizacao === 'grid' ? 'lista' : 'grid');
  };

  if (isLoading) {
    return <p className="text-center mt-8 text-gray-600">Carregando Pokémons...</p>;
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <h1 className="text-3xl font-bold text-gray-800">Pokémons</h1>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <input
            type="text"
            aria-label="Pesquisar Pokémon"
            placeholder="Pesquisar Pokémon..."
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />
          <button
            onClick={alternarVisualizacao}
            className="p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
          >
            {tipoVisualizacao === 'grid' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 8H20V6H4V8ZM4 13H20V11H4V13ZM4 18H20V16H4V18Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 4H4V10H10V4ZM10 14H4V20H10V14ZM20 14H14V20H20V14ZM20 4H14V10H20V4Z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={tipoVisualizacao === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "flex flex-col space-y-4"}>
        {pokemonsFiltrados.length > 0 ? (
          pokemonsFiltrados.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              tipoVisualizacao={tipoVisualizacao}
              favoritos={favoritos}
              onFavoritoClick={handleAlternarFavorito}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">Nenhum Pokémon encontrado.</p>
        )}
      </div>
    </section>
  );
}
