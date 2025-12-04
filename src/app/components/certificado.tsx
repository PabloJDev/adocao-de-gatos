"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import NavBar from "./navBar";
import Link from "next/link";

export default function Certificado() {
    const [adopterName, setAdopterName] = useState("");
    const [petName, setPetName] = useState("");
    const [adoptionDate, setAdoptionDate] = useState(() => {
        const d = new Date();
        return d.toISOString().slice(0, 10);
    });

    const certRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);

    async function generatePDF() {
    if (!certRef.current) return;

    setLoading(true);

    try {
        const canvas = await html2canvas(certRef.current, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;

        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        
        const scaledWidth = imgWidth * ratio;
        const scaledHeight = imgHeight * ratio;

        const x = (pdfWidth - scaledWidth) / 2;
        const y = (pdfHeight - scaledHeight) / 2;

        pdf.addImage(
            imgData, 
            "PNG", 
            x, 
            y, 
            scaledWidth, 
            scaledHeight,
            undefined,
            "FAST"
        );

        pdf.save(`certificado-${adopterName || "adotante"}-${petName || "pet"}.pdf`);

    } catch (err) {
        console.error(err);
        alert("Erro ao gerar PDF.");
    }
    alert("Certificado gerado com sucesso!");
    setLoading(false);
}

    return (
        <div className="min-h-screen relative p-6">

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

            <main className="max-w-5xl mx-auto mt-20 text-white">
                <h1 className="text-3xl font-semibold mb-6">Gerador de Certificado</h1>

                <section className="grid md:grid-cols-2 gap-6 mb-8">
                    
                    <div className="bg-white/10 p-6 rounded-lg">
                        <label className="block mb-3">
                            <span className="text-sm">Nome do adotante</span>
                            <input
                                type="text"
                                value={adopterName}
                                onChange={(e) => setAdopterName(e.target.value)}
                                className="mt-1 w-full rounded px-3 py-2 bg-white/20 text-white"
                                placeholder="Nome completo"
                            />
                        </label>

                        <label className="block mb-3">
                            <span className="text-sm">Nome do pet</span>
                            <input
                                type="text"
                                value={petName}
                                onChange={(e) => setPetName(e.target.value)}
                                className="mt-1 w-full rounded px-3 py-2 bg-white/20 text-white"
                                placeholder="Nome do gatinho"
                            />
                        </label>

                        <label className="block mb-4">
                            <span className="text-sm">Data de adoção</span>
                            <input
                                type="date"
                                value={adoptionDate}
                                onChange={(e) => setAdoptionDate(e.target.value)}
                                className="mt-1 w-full rounded px-3 py-2 bg-white/20 text-white"
                            />
                        </label>

                        <div className="flex gap-3">
                            <motion.button
                                onClick={generatePDF}
                                whileTap={{ scale: 0.98 }}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                disabled={loading}
                            >
                                {loading ? "Gerando..." : "Baixar PDF"}
                            </motion.button>

                            <Link href="#" className="bg-white/10 text-white px-4 py-2 rounded flex items-center">
                                Cancelar
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="bg-white/20 p-4 rounded w-full">

                            <p className="text-sm mb-2">Preview do certificado</p>

                            <div
                                ref={certRef}
                                className="relative mx-auto bg-white text-black p-10 flex flex-col items-center justify-center font-serif"
                                style={{
                                    width: "1123px",
                                    height: "794px",
                                    maxWidth: "100%",
                                    border: "18px solid #d4a373",
                                    borderRadius: "20px",
                                    backgroundImage: "url('/marca-gato.png')",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "45%",
                                    backgroundPosition: "center",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                                }}
                            >

                                <img
                                    src="/patinhas.png"
                                    className="absolute top-6 left-6 w-24 opacity-50"
                                />
                                <img
                                    src="/patinhas.png"
                                    className="absolute bottom-6 right-6 w-24 opacity-50 rotate-180"
                                />

                                <div className="text-center mt-10">
                                    <h2 className="text-5xl font-bold mb-4">Certificado de Adoção</h2>

                                    <p className="text-xl mb-6 italic">Certificamos que</p>

                                    <h3 className="text-3xl font-semibold mb-4">
                                        {adopterName || "_____________"}
                                    </h3>

                                    <p className="text-xl mb-6">adotou com amor o gatinho</p>

                                    <h4 className="text-2xl font-medium mb-6">
                                        {petName || "__________________"}
                                    </h4>

                                    <p className="text-lg mb-10">em {adoptionDate}</p>

                                    <p className="mt-8 text-sm tracking-wider uppercase">
                                        Projeto Adoção de Gatos
                                    </p>
                                </div>

                                <div className="absolute bottom-20 left-20 text-xs">
                                    <p>Assinatura do responsável</p>
                                    <div className="w-36 h-8 border-b mt-2" />
                                </div>

                                <div className="absolute bottom-20 right-20 text-xs text-right">
                                    <p>Data</p>
                                    <div className="mt-2">{adoptionDate}</div>
                                </div>
                            </div>

                            <p className="text-xs text-white/70 mt-2">
                               
                            </p>
                        </div>
                    </div>

                </section>
            </main>
        </div>
    );
}