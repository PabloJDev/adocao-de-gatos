"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ButtonsFormulario() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const variants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  // botão "finalizar"
  const handleFinalizar = (): void => {
    setShowSuccess(true);
  };

  // botão "cancelar"
  const handleCancelar = (): void => {
    setShowConfirm(true);
  };

  // fechar alerta de confirmação
  const closeSuccess = (): void => {
    setShowSuccess(false);
  };

  // confirmar cancelamento
  const confirmCancel = (confirm: boolean): void => {
    setShowConfirm(false);
    if (confirm) {
      router.push("/");
    }
  };

  return (
    <>
      {/*botões*/}
      <div className="flex gap-12 mt-5 w-full justify-center items-center">
        <Link className="w-full" href={"/certificado"}>
         <motion.button
          variants={variants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleFinalizar}
          className="mt-5 w-1/3 p-3 bg-fuchsia-500 text-white rounded-lg font-semibold hover:bg-fuchsia-600 transition-colors"
        >
          Gerar Certificado
        </motion.button>
        </Link>

        <motion.button
          variants={variants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleCancelar}
          className="mt-5 w-1/3 p-3 bg-fuchsia-500 text-white rounded-lg font-semibold hover:bg-fuchsia-600 transition-colors"
        >
          Cancelar
        </motion.button>
      </div>

      {/*alerta de confirmação*/}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl text-center w-80"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Tem certeza que deseja cancelar?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => confirmCancel(true)}
                  className="px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition"
                >
                  Sim
                </button>
                <button
                  onClick={() => confirmCancel(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Não
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*alerta de finalização*/}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl text-center w-80"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Formulário de adoção preenchido com sucesso! 😸🎉
              </h2>
              <button
                onClick={closeSuccess}
                className="px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
