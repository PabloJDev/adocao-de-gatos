"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import NavBar from "./navBar";
import Link from "next/link";

export default function Certificado() {
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
          </div>
    );
}
