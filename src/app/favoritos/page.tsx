'use client';

import { useState, useEffect } from 'react';
import { PokemonDetalhe } from '@/types/pokemon';
import { buscarFavoritos } from '@/utils/favoritos';
import PokemonCard from '@/components/PokemonCard';
import { alternarFavorito } from '@/utils/favoritos';

async function buscarDetalhesPokemon(id: number): Promise<PokemonDetalhe> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.json();
}

export default function PaginaFavoritos() {
  const [pokemonsFavoritos, setPokemonsFavoritos] = useState<PokemonDetalhe[]>([]);
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState<PokemonDetalhe[]>([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [favoritos, setFavoritos] = useState<number[]>([]);

  useEffect(() => {
    async function carregarFavoritos() {
      const ids = buscarFavoritos();
      const detalhesFavoritos = await Promise.all(ids.map(buscarDetalhesPokemon));
      setPokemonsFavoritos(detalhesFavoritos);
      setPokemonsFiltrados(detalhesFavoritos);
      setFavoritos(ids);
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

  const handleAlternarFavorito = (id: number) => {
    alternarFavorito(id);
    const novosFavoritos = buscarFavoritos();
    setFavoritos(novosFavoritos);
    setPokemonsFiltrados(prev => prev.filter(p => novosFavoritos.includes(p.id)));
    setPokemonsFavoritos(prev => prev.filter(p => novosFavoritos.includes(p.id)));
  };

  if (isLoading) {
    return <p className="text-center mt-8 text-gray-600">Carregando Pokémons favoritos...</p>;
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <h1 className="text-3xl font-bold text-gray-800">Meus Pokémons Favoritos</h1>
        <input
          type="text"
          aria-label="Pesquisar Pokémon"
          placeholder="Pesquisar Pokémon..."
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-auto"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
        />
      </div>

      {pokemonsFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pokemonsFiltrados.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              tipoVisualizacao="grid"
              favoritos={favoritos}
              onFavoritoClick={handleAlternarFavorito}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Você ainda não tem Pokémons favoritos.</p>
      )}
    </section>
  );
}
