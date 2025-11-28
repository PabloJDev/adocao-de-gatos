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

        async function preloadImages(container: HTMLDivElement) {
            const urls = new Set<string>();

            const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
            imgs.forEach((i) => i.src && urls.add(i.src));

            const elements = Array.from(container.querySelectorAll('*')) as HTMLElement[];
            elements.forEach((el) => {
                try {
                    const bg = getComputedStyle(el).backgroundImage;
                    const match = bg && bg.match(/url\((?:\"|\')?(.*?)(?:\"|\')?\)/);
                    if (match && match[1]) urls.add(match[1]);
                } catch (e) {
                }
            });

            await Promise.all(
                Array.from(urls).map(
                            (url) =>
                                new Promise((res) => {
                                    const img = document.createElement('img') as HTMLImageElement;
                                    try {
                                        img.crossOrigin = 'anonymous';
                                    } catch (e) {
                                    }
                                    img.onload = () => res(null);
                                    img.onerror = () => {
                                        console.warn('failed to preload', url);
                                        res(null);
                                    };
                                    img.src = url;
                                })
                )
            );
        }

            try {
                    await preloadImages(certRef.current);

                    const clone = certRef.current.cloneNode(true) as HTMLElement;
                    clone.style.position = "absolute";
                    clone.style.left = "-9999px";
                    clone.style.top = "0";
                    clone.style.maxWidth = "1123px";
                    clone.setAttribute("data-html2canvas-clone", "true");
                    document.body.appendChild(clone);

                 
                    const sanitize = (root: HTMLElement) => {
                        const all = Array.from(root.querySelectorAll<HTMLElement>("*"));
                        all.push(root);
                        for (const el of all) {
                            try {
                                const cs = getComputedStyle(el);
                                const props: Array<{js:string; css:string; fallback:string}> = [
                                    { js: "color", css: "color", fallback: "#000" },
                                    { js: "backgroundColor", css: "background-color", fallback: "#fff" },
                                    { js: "borderColor", css: "border-color", fallback: "#d4a373" },
                                    { js: "boxShadow", css: "box-shadow", fallback: "none" },
                                ];
                                for (const p of props) {
                                    const val = (cs as any)[p.js] as string;
                                    if (val && /(lab\(|lch\(|oklab\()/i.test(val)) {
                                        el.style.setProperty(p.css, p.fallback, "important");
                                    }
                                }
                            } catch (e) {
                            }
                        }
                    };

                    sanitize(clone);

                    const canvas = await html2canvas(clone, {
                            scale: 2,
                            useCORS: true,
                            allowTaint: false,
                            logging: false,
                            backgroundColor: "#ffffff",
                    });
                    // remove clone after rendering
                    document.body.removeChild(clone);

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

    } catch (err: any) {
        console.error('generatePDF error:', err);
        const msg = err?.message || String(err);
        alert("Erro ao gerar PDF: " + msg);
    }

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

            <main className="max-w-5xl mx-auto mt-20 bg-linear-to-r from-fuchsia-300 via-pink-300 to-rose-300 bg-clip-text text-transparent">
                <h1 className="text-5xl font-semibold mb-6">Gerador de Certificado</h1>

                <section className="grid md:grid-cols-2 gap-6 mb-8">
                    
                  

                    <div className="flex items-center justify-center">
                        <div className="bg-white/20 p-4 rounded w-full">

                            <p className="text-sm mb-2">Preview do certificado</p>

                            <div
                                ref={certRef}
                                className="relative mx-auto bg-fuchsia-100 text-black p-10 flex flex-col items-center justify-center font-serif"
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
                                        {adopterName || "xxxxxxxxx"}
                                    </h3>

                                    <p className="text-xl mb-6">adotou com amor o gatinho</p>

                                    <h4 className="text-2xl font-medium mb-6">
                                        {petName || "xxxxxxxxxxxx"}
                                    </h4>

                                    <p className="text-lg mb-10">em {adoptionDate}</p>

                                    <p className="mt-8 text-sm tracking-wider uppercase">
                                        Projeto Adoção de Gatos
                                    </p>
                                </div>

                                <div className="absolute bottom-20 left-20 text-xs">
                                    <p>Assinatura do responsável</p>
                                    <div className="w-48 h-8 border-b mt-2" />
                                </div>

                                <div className="absolute bottom-20 right-20 text-xs text-right">
                                    <p>Data</p>
                                    <div className="mt-2">{adoptionDate}</div>
                                </div>
                            </div>

                            <p className="text-xs text-white/70 mt-2">
                               
                            </p>
                            <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={generatePDF}
                                disabled={loading}
                                className="mt-4 px-6 py-3 bg-fuchsia-500 text-white rounded-lg font-semibold hover:bg-fuchsia-600 transition-colors disabled:opacity-60"
                            >
                                {loading ? "Gerando..." : "Baixar Certificado"}
                            </button>

                            <Link href="/" className="mt-4 px-6 py-3 bg-fuchsia-500 text-white rounded-lg font-medium hover:bg-fuchsia-600 transition-colors">
                                Voltar
                            </Link>
                        </div>
                        </div>
                    </div>

                </section>
            </main>
        </div>
    );
}