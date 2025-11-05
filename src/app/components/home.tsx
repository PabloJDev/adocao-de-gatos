"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./navBar";

const variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src="/gatinhofundo.jpg"
        alt="Fundo de gatinho"
        fill
        priority
        quality={100}
        className="object-cover"
      />
      <NavBar />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full flex items-center pt-20 px-8 md:px-16 lg:px-24">
        <motion.div
          className="max-w-4xl flex flex-col items-start justify-start gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={variants}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -left-4 top-0 text-6xl opacity-20">🐾</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl text-left mb-2">
              Bem-vindo ao{" "}
              <span className="bg-linear-to-r from-fuchsia-300 via-pink-300 to-rose-300 bg-clip-text text-transparent">
                Adoção de Gatinhos
              </span>
            </h1>
            <div className="h-1 w-32 bg-linear-to-r from-fuchsia-400 to-pink-400 rounded-full mt-2"></div>
          </motion.div>

          <motion.div
            variants={variants}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-md bg-white/10 border-2 border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex gap-3">
              <p className="text-lg md:text-xl text-white leading-relaxed">
                Aqui, cada{" "}
                <span className="font-bold text-fuchsia-200">bigode</span>,{" "}
                <span className="font-bold text-fuchsia-200">ronronar</span> e
                olhar curioso conta uma história de amor à espera de um novo
                começo. Nosso objetivo é aproximar corações humanos e felinos —
                ajudando gatinhos resgatados a encontrarem um lar cheio de{" "}
                <span className="font-bold text-pink-200">
                  carinho, respeito e cuidado
                </span>
                .
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={variants}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-md bg-white/10 border-2 border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex gap-3">
              <p className="text-lg md:text-xl text-white leading-relaxed">
                Adotar é mais do que oferecer abrigo. É abrir espaço para um{" "}
                <span className="font-bold text-fuchsia-200">novo amigo</span>,
                um companheiro fiel que vai estar ao seu lado nos dias bons e
                nos dias difíceis.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={variants}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-md bg-white/10 border-2 border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex gap-3">
              <p className="text-lg md:text-xl text-white leading-relaxed">
                Descubra os gatinhos disponíveis, conheça suas histórias e
                permita-se se apaixonar. Porque às vezes, o{" "}
                <span className="font-bold text-pink-200">
                  amor da sua vida
                </span>{" "}
                também tem{" "}
                <span className="font-bold text-fuchsia-200">
                  quatro patinhas
                </span>{" "}
                e um ronronar doce.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={variants}
            transition={{ duration: 0.5 }}
            className="flex gap-3 text-3xl opacity-70 ml-4"
          >
            <span>🐾</span>
            <span>🐾</span>
            <span>🐾</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
