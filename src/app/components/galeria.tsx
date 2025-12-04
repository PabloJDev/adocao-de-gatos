"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import NavBar from "./navBar";
import Link from "next/link";

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY as string;
const API_URL = process.env.NEXT_PUBLIC_CAT_API_URL as string;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export default function Galeria() {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoadStatus, setImageLoadStatus] = useState<{
    [key: string]: boolean;
  }>({});

  const fetchCats = async () => {
    try {
      setLoading(true);
      setError(null);
      setImageLoadStatus({});
      const response = await axios.get(API_URL, {
        headers: {
          "x-api-key": API_KEY,
        },
        params: {
          limit: 12,
          has_breeds: 1,
        },
      });
      setCats(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erro ao carregar os gatinhos ");
      console.error(err);
      setLoading(false);
    }
  };

  const handleImageLoad = (catId: string) => {
    setImageLoadStatus((prev) => ({ ...prev, [catId]: true }));
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/gatinhofundo.jpg"
          alt="Fundo de gatinho"
          fill
          priority
          quality={100}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <NavBar />

      <div className="relative z-10 py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 pt-20"
        >
          <h1 className="text-5xl font-bold bg-linear-to-r from-fuchsia-300 via-pink-300 to-rose-300 bg-clip-text text-transparent  drop-shadow-2xl mb-4">
            Galeria de Gatinhos
          </h1>
          <p className="text-xl text-white/90 drop-shadow-lg">
            Conheça nossos adoráveis gatinhos disponíveis para adoção
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white shadow-lg"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg mb-6 max-w-md mx-auto">
            {error}
          </div>
        )}

        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10"
          >
            {cats.map((cat, index) => (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-fuchsia-900 cursor-pointer"
              >
                <div className="relative h-64 w-full bg-fuchsia-100">
                  {!imageLoadStatus[cat.id] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-fuchsia-900"></div>
                    </div>
                  )}
                  <Image
                    src={cat.url}
                    alt="Gatinho adorável"
                    fill
                    priority={index < 8}
                    className={`object-cover transition-opacity duration-300 ${
                      imageLoadStatus[cat.id] ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={90}
                    onLoad={() => handleImageLoad(cat.id)}
                  />
                </div>
                <div className="p-4 bg-fuchsia-50">
                  <p className="text-center text-fuchsia-900 font-semibold">
                    Disponível para adoção
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-10 pb-10 gap-5"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchCats}
              className="bg-fuchsia-900 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-fuchsia-800 transition-colors"
            >
              Carregar Mais Gatinhos
            </motion.button>
             <Link href={"/formulario"}>
              <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchCats}
              className="bg-fuchsia-900 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-fuchsia-800 transition-colors"
            >
              Continuar para Adoção
            </motion.button></Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
