'use client';

import { useState, useEffect } from 'react';
import { PokemonDetalhe } from '@/types/pokemon';
import { buscarPokemons } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import { buscarFavoritos, alternarFavorito } from '@/utils/favoritos';

// Componente da página inicial.
export default function PaginaInicial() {
  const [pokemons, setPokemons] = useState<PokemonDetalhe[]>([]);
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState<PokemonDetalhe[]>([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [tipoVisualizacao, setTipoVisualizacao] = useState<'grid' | 'lista'>('grid');

  // Efeito para carregar os Pokémons e os favoritos.
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

  // Efeito para filtrar a lista com base no termo de pesquisa.
  useEffect(() => {
    const listaFiltrada = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
    setPokemonsFiltrados(listaFiltrada);
  }, [termoPesquisa, pokemons]);

  // Função para adicionar/remover um Pokémon dos favoritos.
  const handleAlternarFavorito = (pokemonId: number) => {
    alternarFavorito(pokemonId);
    setFavoritos(buscarFavoritos()); // Atualiza o estado para refletir a mudança.
  };

  // Função para alternar a visualização.
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
            placeholder="Pesquisar Pokémon..."
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />
          <button
            onClick={alternarVisualizacao}
            className="p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
          >
            {/* Adiciona a lógica para exibir o ícone correto */}
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
          pokemonsFiltrados.map((pokemon) => {
            const isFavorito = favoritos.includes(pokemon.id);
            return (
              <div key={pokemon.id} className={tipoVisualizacao === 'grid' ? "relative bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow" : "relative bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-left hover:shadow-xl transition-shadow"}>
                <button
                  onClick={() => handleAlternarFavorito(pokemon.id)}
                  className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                    isFavorito ? 'text-yellow-400' : 'text-gray-400'
                  }`}
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
                      priority
                    />
                  </div>
                  <div className={tipoVisualizacao === 'lista' ? "flex flex-col" : "w-full"}>
                    <h2 className="capitalize text-lg font-semibold">{pokemon.name}</h2>
                    <span className="text-gray-500">#{String(pokemon.id).padStart(3, '0')}</span>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">Nenhum Pokémon encontrado.</p>
        )}
      </div>
    </section>
  );
}