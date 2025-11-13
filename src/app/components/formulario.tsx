"use client";
import NavBar from "./navBar";
import Image from "next/image";
import { motion } from "framer-motion";
import ButtonsFormulario from "../formulario/buttons";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

export default function formulario() {
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
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <NavBar />

      <div className="relative z-10 flex flex-col items-start justify-center min-h-[calc(100vh-80px)] py-40 px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-5xl font-bold text-white drop-shadow-2xl mb-4 ml-15">
            Formulario de Adoção
          </h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          transition={{ duration: 0.5 }}
          initial="hidden"
          animate="visible"
          className="backdrop-blur-md bg-white/10 border-2 border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300 w-full max-w-2xl"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block">
                <span className="text-white mb-2 block">Nome Completo:</span>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                  placeholder="Digite seu nome completo"
                />
              </label>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block">
                <span className="text-white mb-2 block">Telefone</span>
                <input
                  type="number"
                  className="no-spinner-opacity w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                  placeholder="Digite seu numero de telefone"
                />
              </label>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block">
                <span className="text-white mb-2 block">cpf:</span>
                <input
                  type="number"
                  className="no-spinner-opacity w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                  placeholder="Digite seu cpf"
                />
              </label>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block">
                <span className="text-white mb-2 block">Idade:</span>
                <input
                  type="number"
                  className="no-spinner-opacity w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                  placeholder="Digite sua idade"
                />
              </label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block">
                <span className="text-white mb-2 block">Email</span>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                  placeholder="Digite seu email"
                />
              </label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block">
                <span className="text-white mb-2 block">Endereço:</span>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                  placeholder="Digite seu endereço"
                />
              </label>
            </motion.div>

            <ButtonsFormulario/>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
