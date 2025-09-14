# Pokédex Completa

[![Next.js](https://img.shields.io/badge/Next.js-13.5-blue?logo=next.js&logoColor=white)](https://nextjs.org/) 
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) 
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)  
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](<URL_DO_DEPLOY>)

Um projeto de **Pokedex** desenvolvido com **Next.js 13+, TypeScript e Tailwind CSS**.  
Permite listar Pokémons, marcar favoritos e visualizar detalhes de cada Pokémon.

---

## 🔹 Funcionalidades

- Listagem dos 151 primeiros Pokémons.
- Busca em tempo real por nome.
- Alternar entre **visualização em grid e lista**.
- Marcar e desmarcar **Pokémons favoritos** (armazenamento no `localStorage`).
- Página de **detalhes** de cada Pokémon com:
  - Imagem oficial
  - Nome e número
  - Tipos
  - Peso e altura
- Página exclusiva de **Pokémons favoritos**.
- Deploy funcional e público no **Vercel**.

---

## 🌐 Acesse o projeto

[💻 Abrir Pokedex no navegador](<URL_DO_DEPLOY>)  

---

## 🛠 Tecnologias

- **Next.js 13+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hooks** (`useState`, `useEffect`)
- **Next/Image** para carregamento otimizado de imagens
- API oficial de Pokémons: [PokeAPI](https://pokeapi.co/)

---

## 📁 Estrutura do Projeto

/pokedex-completa
├── /public
│ └── favicon.ico
├── /src
│ ├── /app
│ │ ├── /detalhes/[id]/page.tsx
│ │ ├── /favoritos/page.tsx
│ │ ├── page.tsx
│ │ ├── layout.tsx
│ │ └── globals.css
│ ├── /components
│ │ ├── Header.tsx
│ │ ├── Footer.tsx
│ │ └── PokemonCard.tsx
│ ├── /types
│ │ └── pokemon.ts
│ └── /utils
│ ├── api.ts
│ └── favoritos.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs

---

## ⚡ Como rodar o projeto localmente

## 💻 Como Rodar o Projeto

Siga os passos abaixo para clonar o repositório e rodar o projeto localmente.

### Pré-requisitos

* Certifique-se de ter o **Node.js** e o **npm** instalados na sua máquina.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd pokedex-completa
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

O projeto estará disponível em `http://localhost:3000`.

---

### 💡 Observações

* O projeto usa **App Router** do Next.js, então páginas dinâmicas (ex: `/detalhes/[id]`) precisam usar `async` corretamente com `await` para acessar `params`.
* Os favoritos são salvos no `localStorage` do navegador para persistência de dados.
* O componente `PokemonCard` foi criado para evitar repetição de código entre a página inicial e a página de favoritos.
* O deploy do projeto foi feito no **Vercel**, e o link para a aplicação online está no cabeçalho deste `README`.

---

### 📝 Autor

* **Vitor Nóbrega** – Desenvolvido com Next.js, TypeScript e Tailwind CSS.
