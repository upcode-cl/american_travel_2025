"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { Hotel } from "lucide-react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { formatNumber } from "@/utils/number-formatter";
import { ResponseExchange } from "@/app/interfaces/interfaces";

interface PropsGiras {
  Titulo?: string;
  Dias?: string;
  Noches?: string;
  Precio?: string;
  Hotels?: string;
  ValorPersona?: string;
  ImagenDestino?: string;
  IdPrograma: number;
  cambio?: ResponseExchange;
  subtitulo?: string;
}

const Destinos_destacados = ({
  Titulo,
  Dias,
  Noches,
  Precio,
  Hotels,
  ValorPersona,
  ImagenDestino,
  IdPrograma,
  cambio,
  subtitulo,
}: PropsGiras) => {
  const precioFormateado = formatNumber(Number(Precio));
  const cambioContadoValue =
    Number(String(cambio?.CambioContado || "0").replace(",", ".")) || 0;

    

  return (
    <Link href={`/detalle-programa/${IdPrograma}`} className="font-semibold">
      <div className="w-full bg-gris-att rounded shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-150 ease-out">
        {/* Se crea un contenedor con la clase relative para que el contenido
          interno se posicione relativo al contenedor */}
        <motion.div
          whileHover={{ scale: 1.02, filter: "saturate(1.5)" }} // Aumenta la saturación a 150% al hacer hover
          className="relative w-full h-[200px] sm:h-[250px] cursor-pointer" // Responsive height
        >        
          <Image
            src={ImagenDestino || "/chile.jpg"}
            layout="fill"
            objectFit="cover"
            alt="chile"
            className="rounded p-1  "
          />
        </motion.div>
        <div className="flex flex-col relative p-4 sm:p-6 rounded-b-2xl">
          <h4 className="text-sm">
            <div className="relative">
              <div className="flex pb-3 ">
                {/* <MapPin className="" /> <span className="pl-2"></span> */}
              </div>
              <div className="bg-amarillo-att p-1 sm:p-2 rounded text-xs sm:text-sm w-auto max-w-[60%] -mt-[50px] sm:-mt-[60px] right text-center absolute right-2 sm:right-4 text-white font-bold shadow-lg">
                {subtitulo ? subtitulo : "Destacado"}
              </div>
            </div>
          </h4>
          <h3 className="text-lg sm:text-xl font-bold text-amarillo-att">
            <div className="flex flex-col text-[18px] sm:text-[24px]">
              {Titulo === undefined ? (
                <>
                  <div className="flex items-center">
                    <MapPin className="inline mb-1 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-shadow-sm ml-1">--</span>
                  </div>
                  <small className="ml-2 text-black text-xs sm:text-sm">
                    (Confirmar con Agente)
                  </small>
                </>
              ) : (
                <span className="">
                  <div className="flex items-center">
                    <MapPin className="inline mb-1 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-shadow-sm ml-1">{Titulo}</span>
                  </div>
                  {/* <small className="ml-2 text-black">
                    (Confirmar con Agente)
                  </small> */}
                </span>
              )}
            </div>
          </h3>
          <div className="pb-2">
            <div className="flex items-center text-sm sm:text-base">
              <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="pl-1 sm:pl-2">{Dias} Días </span> 
              <span className="mx-1">/</span> 
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="pl-1 sm:pl-2">{Noches} Noches</span>
            </div>
          </div>
          <div className="pb-2 flex items-center text-sm sm:text-base">
            <Hotel className="w-4 h-4 sm:w-5 sm:h-5" />
            <div className="flex ml-1 sm:ml-2">{Hotels}</div>
          </div>
          <div className="flex flex-col items-end flex-grow">
            <h5 className="pt-2 sm:pt-4 text-xs sm:text-sm text-right">Desde</h5>
            <h4 className="text-xl sm:text-3xl pb-1 font-bold text-black text-right">
              USD {precioFormateado}
            </h4>
            <small className="text-[12px] sm:text-[14px] mb-1 font-bold text-right">
              CLP: ${formatNumber(Number(Precio || 0) * cambioContadoValue)}
            </small>

            <p className="pb-2 sm:pb-4 text-right text-xs sm:text-sm">
              {ValorPersona ? ValorPersona : "Sin información disponible"}
            </p>
          </div>

          <button className="bg-amarillo-att p-2 sm:p-3 w-[100%] rounded self-end hover:bg-gris-oscuro transition-all duration-150 cursor-pointer flex justify-center items-center text-white text-sm sm:text-base">
            Ver detalles
            <ChevronRight className="ml-1 w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Destinos_destacados;
