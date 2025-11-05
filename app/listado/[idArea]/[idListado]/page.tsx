"use client";
import { Exchange, getProgramaListadoDetalle } from "@/app/api/Services";
import { Program, ResponseExchange } from "@/app/interfaces/interfaces";
import Destinos_destacados from "@/components/Destinos_destacados";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [programas, setProgramas] = useState<Program[]>([]);
  const [cambio, setCambio] = useState<ResponseExchange | undefined>();
  const [loading, setLoading] = useState(true);
  const params = useParams<{ idArea: string; idListado: string }>();
  const { idArea, idListado } = params || {};

  useEffect(() => {
    const llamarProgramas = async () => {
      if (!idArea || !idListado) return;

      try {
        setLoading(true);
        const [response, exchangeResponse] = await Promise.all([
          getProgramaListadoDetalle(Number(idArea), Number(idListado)),
          Exchange(),
        ]);

        if (response.statusCode === 200) {
          setProgramas(response.value.entities);
          setCambio(exchangeResponse);
        }
      } catch (error) {
        console.error("Error al cargar los programas:", error);
      } finally {
        setLoading(false);
      }
    };

    llamarProgramas();
  }, [idArea, idListado]);

  const SkeletonCard = () => (
    <div className="flex flex-col space-y-3">
      <div className="h-56 w-full rounded-xl bg-gray-200 animate-pulse" />
      <div className="space-y-2">
        <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/4 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className=" bg-white mb-10 ">
      <h2 className="text-[50px] text-gris-oscuro flex justify-center items-center text-center pl-5 pr-5 font-bold">
        Nuestros destinos más populares
      </h2>
      <div className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 gap-10 pl-4 pr-4 lg:pl-28  lg:pr-28 pt-[50px] ">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : programas.map((programa) => (
              <Link
                href={`/detalle-programa/${programa.IdPrograma}`}
                key={programa.IdPrograma}
              >
                <Destinos_destacados
                 // key={programa.IdPrograma}
                  Titulo={programa.Titulo}
                  Dias={programa.Dias.toString()}
                  Noches={programa.Noches.toString()}
                  Precio={programa.Precio.toString()}
                  Hotels={programa.ValoresProgramas[0]?.Hotel}
                  ValorPersona={programa.Texto}
                  ImagenDestino={programa.UrlImage}
                  IdPrograma={programa.IdPrograma}
                  cambio={cambio}
                  subtitulo={programa.NombreArea}
                />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Page;
