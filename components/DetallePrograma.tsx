"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Hotel, Check, MapPin } from "lucide-react";
import {
  Bloqueos,
  Detalle,
  Program,
  ResponseExchange,
} from "@/app/interfaces/interfaces";
import { formatNumber } from "@/utils/number-formatter";
import { Exchange } from "@/app/api/Services";

export default function DetallePrograma({ programa }: { programa: Program }) {
  const [data, setData] = useState<Program>(programa);

  useEffect(() => {
    setData(programa);
  }, [programa]);

  // exchange cambio function
  const [cambio, setCambio] = useState<ResponseExchange | undefined>({
    Id: 0,
    UserId: 0,
    CambioContado: 0,
    CambioCredito: 0,
    DateUp: "",
    FechaDesde: "",
    FechaHasta: "",
  });

  const exChange = async () => {
    try {
      const response = await Exchange();
      if (response) {
        setCambio(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    exChange();
  }, []);

  // Se convierte el valor de cambio a número, reemplazando la coma por un punto si es necesario.
  const cambioContadoValue =
    Number(String(cambio?.CambioContado || "0").replace(",", ".")) || 0;

  const TituloBloqueos = ({
    SetSalidaVencida,
    children,
  }: {
    SetSalidaVencida: (value: boolean) => void;
    children: React.ReactNode;
  }) => {
    const tituloSplit: string[] | undefined = children?.toString().split(" ");

    return (
      <>
        {tituloSplit?.map((piece, index) => {
          if (piece.startsWith("*")) {
            SetSalidaVencida(true);
            return (
              <span
                key={index}
                style={{ color: "red", textDecorationLine: "line-through" }}
              >
                {piece.substr(1)}{" "}
              </span>
            );
          } else {
            return <span key={index}>{piece} </span>;
          }
        })}
      </>
    );
  };

  // Espacios Confirmados

  const EspaciosConfirmados = ({ Bloqueos }: { Bloqueos: Bloqueos[] }) => {
    const [salidaVencida, setSalidaVencida] = useState(false);

    if (Bloqueos.length > 0) {
      return (
        <div className="w-full px-4 sm:px-6 lg:w-[90%] xl:w-[80%] mx-auto">
          <div className="space-y-6">
            {Bloqueos.sort((a, b) => (a.Id ?? 0) - (b.Id ?? 0)).map(
              (bloqueo) => (
                <div
                  key={bloqueo.IdPrograma}
                  className="w-full bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="bg-gris-oscuro px-4 sm:px-6 py-3 sm:py-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-white text-center">
                      <TituloBloqueos SetSalidaVencida={setSalidaVencida}>
                        {bloqueo.TextoFecha}
                      </TituloBloqueos>
                    </h2>
                  </div>
                  
                  {/* Vista móvil - Cards */}
                  <div className="block md:hidden">
                    <div className="divide-y divide-gray-200">
                      {bloqueo.Detalle.sort(
                        (a: Detalle, b: Detalle) =>
                          a.Correlativo - b.Correlativo
                      ).map((detalle) => (
                        <div key={detalle.Id} className="p-4 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-semibold text-gris-claro">Vuelo:</span>
                              <div className="text-gray-800">{detalle.Vuelo}</div>
                            </div>
                            <div>
                              <span className="font-semibold text-gris-claro">Ruta:</span>
                              <div className="text-gray-800">{detalle.Ruta}</div>
                            </div>
                            <div>
                              <span className="font-semibold text-gris-claro">Sale:</span>
                              <div className="text-gray-800">{detalle.Sale}</div>
                            </div>
                            <div>
                              <span className="font-semibold text-gris-claro">Llega:</span>
                              <div className="text-gray-800">{detalle.Llega}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vista tablet/desktop - Tabla */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-purple-50">
                        <tr>
                          <th className="px-4 lg:px-6 py-3 text-left font-semibold text-gris-claro text-sm lg:text-base">
                            Vuelo
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-center font-semibold text-gris-claro text-sm lg:text-base">
                            Ruta
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-center font-semibold text-gris-claro text-sm lg:text-base">
                            Sale
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-center font-semibold text-gris-claro text-sm lg:text-base">
                            Llega
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {bloqueo.Detalle.sort(
                          (a: Detalle, b: Detalle) =>
                            a.Correlativo - b.Correlativo
                        ).map((detalle) => (
                          <tr
                            key={detalle.Id}
                            className="transition-colors hover:bg-purple-50/50"
                          >
                            <td className="px-4 lg:px-6 py-3 sm:py-4 text-sm lg:text-base">{detalle.Vuelo}</td>
                            <td className="px-4 lg:px-6 py-3 sm:py-4 text-center text-sm lg:text-base">{detalle.Ruta}</td>
                            <td className="px-4 lg:px-6 py-3 sm:py-4 text-center text-sm lg:text-base">{detalle.Sale}</td>
                            <td className="px-4 lg:px-6 py-3 sm:py-4 text-center text-sm lg:text-base">{detalle.Llega}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="w-full text-center mt-4">
            {salidaVencida && (
              <span style={{ color: "red", fontSize: "13px" }}>
                (-) Salida totalmente vendida
              </span>
            )}
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Portada */}
      <div className="w-full h-[250px] sm:h-[300px] lg:h-[400px] relative">
        <Image
          src={data?.UrlImage || "/chile.jpg"}
          alt="Imagen del programa"
          fill
          style={{ objectFit: "cover" }}
          className="object-cover"
        />
      </div>
      {/* Informacion del programa */}
      <div className="w-full px-4 sm:px-6 lg:w-[90%] xl:w-[80%] mx-auto">
        <div className="flex flex-col mt-4 sm:mt-6">
          {/* Contenedor para el título con el icono MapPin */}
          <div className="flex items-center mb-4">
            <MapPin className="font-bold mr-2 w-6 h-6 sm:w-8 sm:h-8 text-amarillo-att flex-shrink-0" />
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-800 leading-tight">
              {data?.Titulo}
            </h1>
          </div>

          {data.Subtitulo && (
            <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl flex items-center mb-6">
              <Hotel className="bg-amarillo-att p-1 text-white rounded-md mr-2 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              <span className="text-gray-700">{data?.Subtitulo ?? "Sin información disponible"}</span>
            </div>
          )}

          {/* Info destino */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Información del destino */}
            <div className="flex-1 lg:w-[55%]">
              <h2 className="font-bold text-lg sm:text-xl mb-4 text-gray-800">Información del Destino</h2>
              {(() => {
                // Buscar itinerario de tipo "1"
                const itinerarioTipo1 = data?.Itinerarios?.find(
                  (it) => it.Tipo === "1"
                );

                // Si existe itinerario tipo 1 y tiene contenido en el cuerpo
                if (
                  itinerarioTipo1 &&
                  itinerarioTipo1.Cuerpo &&
                  itinerarioTipo1.Cuerpo.trim() !== ""
                ) {
                  return (
                    <div className="mb-4 text-justify text-sm sm:text-base text-gray-600 leading-relaxed">
                      <p>{itinerarioTipo1.Cuerpo}</p>
                    </div>
                  );
                } else {
                  // Si no tiene información, mostrar video
                  return (
                    <div className="relative w-full sm:w-3/4 lg:w-1/2 aspect-video overflow-hidden rounded-md shadow-md">
                      <div
                        className="absolute top-0 left-0 w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
                        dangerouslySetInnerHTML={{ __html: data?.Video || "" }}
                      />
                    </div>
                  );
                }
              })()}
            </div>
            
            {/* Tarjeta de precio */}
            <div className="w-full lg:w-auto lg:flex-shrink-0">
              <div className="w-full lg:w-[350px] xl:w-[400px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="mb-4">
                    <span className="font-bold text-base sm:text-lg text-gris-claro">
                      {data?.Dias} días / {data?.Noches} noches
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-sm sm:text-base text-gray-600">Precio desde:</span>
                  </div>
                  
                  <div className="bg-amarillo-att rounded-lg p-3 sm:p-4 mb-3">
                    <div className="text-2xl sm:text-3xl font-bold text-white text-center">
                      USD {formatNumber(data?.Precio || 0)}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white text-center mt-1">
                      CLP ${formatNumber((data?.Precio || 0) * cambioContadoValue)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-sm sm:text-base text-gray-700 block">{data?.Texto}</span>
                    <span className="text-xs sm:text-sm text-gray-500 block">Incluye impuestos, tasas y cargos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VUELOS - Se renderiza solo si hay vuelos */}
      {EspaciosConfirmados({ Bloqueos: data?.Vuelos || [] })}

      {/* Valores del programa */}
      {data?.ValoresProgramas?.length > 0 && (
        <div className="w-full px-4 sm:px-6 lg:w-[90%] xl:w-[80%] mx-auto mt-6 mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gris-oscuro px-4 sm:px-6 py-3 sm:py-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Valores del Programa
            </h2>
          </div>

          {/* Vista móvil - Cards */}
          <div className="block lg:hidden">
            <div className="divide-y divide-gray-200">
              {data.ValoresProgramas.map((valor, idx) => (
                <div key={idx} className="p-4 space-y-3">
                  <div className="flex items-start">
                    <Check className="mr-2 text-gris-oscuro w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2 flex-1">
                      <div className="font-medium text-gray-800">{valor.Hotel}</div>
                      <div className="text-sm text-gray-600">{valor.Habitacion}</div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        <span className="font-semibold text-green-600 text-sm">
                          USD {formatNumber(valor?.Precio || 0)}
                        </span>
                        <span className="font-semibold text-green-600 text-sm">
                          CLP ${formatNumber((valor?.Precio || 0) * cambioContadoValue)}
                        </span>
                      </div>
                      {valor.Text && (
                        <div className="text-sm text-gray-600">{valor.Text}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vista desktop - Tabla */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-50">
                  <th className="px-4 xl:px-6 py-3 text-left font-semibold text-gris-claro text-sm xl:text-base">
                    Hotel
                  </th>
                  <th className="px-4 xl:px-6 py-3 text-left font-semibold text-gris-claro text-sm xl:text-base">
                    Habitación
                  </th>
                  <th className="px-4 xl:px-6 py-3 text-left font-semibold text-gris-claro text-sm xl:text-base">
                    Precio USD
                  </th>
                  <th className="px-4 xl:px-6 py-3 text-left font-semibold text-gris-claro text-sm xl:text-base">
                    Precio CLP
                  </th>
                  <th className="px-4 xl:px-6 py-3 text-left font-semibold text-gris-claro text-sm xl:text-base">
                    Detalles
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.ValoresProgramas.map((valor, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-purple-50/50"
                  >
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <div className="flex items-center">
                        <Check className="mr-2 text-gris-oscuro w-4 h-4 flex-shrink-0" />
                        <span className="font-medium text-sm xl:text-base">{valor.Hotel}</span>
                      </div>
                    </td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <div className="flex items-center">
                        <Check className="mr-2 text-gris-oscuro w-4 h-4 flex-shrink-0" />
                        <span className="text-sm xl:text-base">{valor.Habitacion}</span>
                      </div>
                    </td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <div className="flex items-center">
                        <Check className="mr-2 text-gris-oscuro w-4 h-4 flex-shrink-0" />
                        <span className="font-semibold text-green-600 text-sm xl:text-base">
                          USD {formatNumber(valor?.Precio || 0)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <div className="flex items-center">
                        <Check className="mr-2 text-gris-oscuro w-4 h-4 flex-shrink-0" />
                        <span className="font-semibold text-green-600 text-sm xl:text-base">
                          CLP ${formatNumber((valor?.Precio || 0) * cambioContadoValue)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <div className="flex items-center">
                        <Check className="mr-2 text-gris-oscuro w-4 h-4 flex-shrink-0" />
                        <span className="text-sm xl:text-base">{valor.Text}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Incluye y Video */}
      {data?.Incluyes?.length > 0 && (
        <div className="w-full px-4 sm:px-6 lg:w-[90%] xl:w-[80%] mx-auto mt-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className={`${!data?.Video ? "w-full" : "lg:w-1/2"} bg-white rounded-lg shadow-md overflow-hidden`}>
              <h2 className="bg-gris-oscuro px-4 py-3 text-white text-lg sm:text-xl font-semibold">
                El programa Incluye
              </h2>
              <div className="p-4">
                <ul className="list-none space-y-3">
                  {data.Incluyes.map((inc, idx) => (
                    <li key={idx} className="flex items-start text-justify">
                      <Check className="mr-3 text-gris-oscuro w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{inc.Texto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {data?.Video && (
              <div className="lg:w-1/2 flex flex-col justify-start">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gris-oscuro px-4 py-3">
                    <h2 className="text-white text-lg sm:text-xl font-semibold">Video del Destino</h2>
                  </div>
                  <div className="p-4">
                    <div className="relative w-full aspect-video overflow-hidden rounded-md">
                      <div
                        className="absolute top-0 left-0 w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:rounded-md"
                        dangerouslySetInnerHTML={{ __html: data.Video }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Itinerario */}
      {data?.Itinerarios?.length > 1 && (
        <div className="w-full px-4 sm:px-6 lg:w-[90%] xl:w-[80%] mx-auto mt-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <h2 className="bg-gris-oscuro px-4 py-3 text-white text-lg sm:text-xl font-semibold">
              Itinerario
            </h2>
            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                {data.Itinerarios.filter((x) => x.Tipo != "1")
                  .sort((a, b) => a.IdItinerario - b.IdItinerario)
                  .map((it) => (
                    <div key={it.Dia} className="border-l-4 border-amarillo-att pl-4">
                      <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2">
                        Día {it.Dia} | {it.Actividad}
                      </h3>
                      <p className="text-justify text-sm sm:text-base text-gray-600 leading-relaxed">
                        {it.Cuerpo}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Condiciones */}
      {data?.Condiciones?.length > 0 && (
        <div className="w-full px-4 sm:px-6 lg:w-[90%] xl:w-[80%] mx-auto mt-6 mb-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="bg-gris-oscuro px-4 py-3 text-white text-lg sm:text-xl font-semibold">
              Condiciones del Programa
            </h2>
            <div className="p-4 sm:p-6">
              <div className="space-y-3">
                {data.Condiciones.map((c, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className="mr-3 text-gris-oscuro w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{c.Texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actividades */}
      {data?.Actividades?.length > 0 && (
        <div className="w-full px-4 sm:px-6 lg:w-[90%] xl:w-[80%] mx-auto mt-6 mb-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="bg-gris-oscuro px-4 py-3 text-white text-lg sm:text-xl font-semibold">
              Observaciones
            </h2>
            <div className="p-4 sm:p-6">
              <div className="space-y-3">
                {data.Actividades.map((act, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className="mr-3 text-gris-oscuro w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{act.Texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
