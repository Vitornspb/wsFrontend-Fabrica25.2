export interface PokemonDetalhe {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}