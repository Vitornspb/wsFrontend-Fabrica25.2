export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-gray-800 text-white p-4 text-center mt-8"
    >
      <p>Desenvolvido por Vitor Nóbrega com Next.js, TypeScript e Tailwind CSS</p>
      <small>&copy; {new Date().getFullYear()} Fábrica de Software</small>
    </footer>
  );
}
