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
          className="relative w-full h-[400px] cursor-pointer " // Añadí cursor-pointer
          style={{ height: "250px" }}
        >
          {/* Se utiliza el componente Image de next/image para mostrar una imagen
            con el atributo src se indica la ruta de la imagen
            con el atributo layout se indica que el tama o de la imagen sera
            el mismo que el contenedor padre (en este caso el div con clase relative)
            con el atributo objectFit se indica que la imagen se ajuste al tama o
            del contenedor sin estar estirada */}
          <Image
            src={ImagenDestino || "/chile.jpg"}
            layout="fill"
            objectFit="cover"
            alt="chile"
            className="rounded p-1  "
          />
        </motion.div>
        <div className="flex flex-col relative  p-6  rounded-b-2xl">
          <h4 className="text-sm">
            <div className="relative">
              <div className="flex pb-3 ">
                {/* <MapPin className="" /> <span className="pl-2"></span> */}
              </div>
              <div className="bg-amarillo-att p-2 rounded w-[50%] -mt-[60px] right text-center absolute ml-[180px] text-white font-bold shadow-lg">
                {subtitulo ? subtitulo : "Destacado"}
              </div>
            </div>
          </h4>
          <h3 className="text-xl font-bold text-amarillo-att ">
            <div className="flex flex-col text-[24px]">
              {Titulo === undefined ? (
                <>
                  <div className="flex ">
                    <MapPin className="inline mb-1" />
                    <span className="text-shadow-sm">--</span>
                  </div>
                  <br></br>{" "}
                  <small className="ml-2 text-black">
                    (Confirmar con Agente)
                  </small>
                </>
              ) : (
                <span className="">
                  <MapPin className="inline mb-1" />
                  <span className="text-shadow-sm">{Titulo}</span>
                  <br></br>{" "}
                  {/* <small className="ml-2 text-black">
                    (Confirmar con Agente)
                  </small> */}
                </span>
              )}
            </div>
          </h3>
          <div className="pb-2">
            <div className="flex">
              <Sun />
              <span className="pl-2">{Dias} Días </span> &nbsp;/&nbsp; <Moon />
              <span className="pl-2">{Noches} Noches</span>
            </div>
          </div>
          <div className="pb-2 flex">
            <Hotel />
            <div className="flex">{Hotels}</div>
          </div>
          <div className="flex flex-col items-end flex-grow">
            <h5 className="pt-4 text-sm text-right">Desde</h5>
            <h4 className="text-3xl pb-1 font-bold text-black text-right">
              USD {precioFormateado}
            </h4>
            <small className="text-[14px] mb-1 font-bold text-right">
              CLP: ${formatNumber(Number(Precio || 0) * cambioContadoValue)}
            </small>

            <p className="pb-4 text-right">
              {ValorPersona ? ValorPersona : "Sin información disponible"}
            </p>
          </div>

          <button className="bg-amarillo-att p-3 w-[100%] sm:w-[100%] rounded self-end hover:bg-gris-oscuro transition-all duration-150 cursor-pointer flex justify-center text-white">
            Ver detalles
            <ChevronRight />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Destinos_destacados;
