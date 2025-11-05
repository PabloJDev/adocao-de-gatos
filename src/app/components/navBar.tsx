"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow-lg transition-transform group-hover:scale-110 duration-300">
              <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
            </div>
            <span className="text-xl font-bold text-white drop-shadow-lg hidden sm:block">
              Adoção de Gatinhos
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                isActive("/")
                  ? "bg-fuchsia-600 text-white shadow-lg scale-105"
                  : "text-white hover:bg-white/20 hover:scale-105"
              }`}
            >
              Home
            </Link>
            <Link
              href="/galeria"
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                isActive("/galeria")
                  ? "bg-fuchsia-600 text-white shadow-lg scale-105"
                  : "text-white hover:bg-white/20 hover:scale-105"
              }`}
            >
              Galeria
            </Link>
            <Link
              href="/formulario"
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                isActive("/formulario")
                  ? "bg-fuchsia-600 text-white shadow-lg scale-105"
                  : "text-white hover:bg-white/20 hover:scale-105"
              }`}
            >
              Formulário
            </Link>
            <Link
              href="/certificado"
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                isActive("/certificado")
                  ? "bg-fuchsia-600 text-white shadow-lg scale-105"
                  : "text-white hover:bg-white/20 hover:scale-105"
              }`}
            >
              Certificado
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
