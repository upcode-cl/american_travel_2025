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
        <div className="w-[90%] mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            {Bloqueos.sort((a, b) => (a.Id ?? 0) - (b.Id ?? 0)).map(
              (bloqueo) => (
                <div
                  key={bloqueo.IdPrograma}
                  className="w-full md:w-auto mt-6 mb-8 overflow-hidden shadow-lg"
                >
                  <div className="bg-gradient-to-r bg-gris-oscuro px-6 py-4">
                    <h2 className="text-xl font-semibold text-white text-center">
                      <TituloBloqueos SetSalidaVencida={setSalidaVencida}>
                        {bloqueo.TextoFecha}
                      </TituloBloqueos>
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-center">
                      <thead className="bg-purple-50">
                        <tr className="text-left">
                          <th className="px-6 py-3 font-semibold text-gris-claro">
                            Vuelo
                          </th>
                          <th className="px-6 py-3 font-semibold text-gris-claro text-center">
                            Ruta
                          </th>
                          <th className="px-6 py-3 font-semibold text-gris-claro text-center">
                            Sale
                          </th>
                          <th className="px-6 py-3 font-semibold text-gris-claro text-center">
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
                            <td className="px-6 py-4">{detalle.Vuelo}</td>
                            <td className="px-6 py-4">{detalle.Ruta}</td>
                            <td className="px-6 py-4">{detalle.Sale}</td>
                            <td className="px-6 py-4">{detalle.Llega}</td>
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
    <div>
      {/* Portada */}
      <div className="w-[100%] h-[300px] relative justify-center mx-auto">
        <Image
          src={data?.UrlImage || "/chile.jpg"}
          alt="Imagen del programa"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      {/* Informacion del programa */}
      <div className="flex w-[95%] md:w-[80%] mx-auto flex-col md:flex-row gap-6 justify-between">
        <div className="justify-start mx-auto w-[100%] flex flex-col mt-4">
          {/* Contenedor para el título con el icono MapPin */}
          <div className="flex items-center">
            <MapPin className="font-bold mr-2" />
            <span className="font-bold text-[34px]">{data?.Titulo}</span>
          </div>

          {data.Subtitulo && (
            <div className="text-3xl flex items-center">
              <Hotel className="bg-amarillo-att p-1 text-white rounded-md mr-2" />
              <span>{data?.Subtitulo ?? "Sin información disponible"} </span>
            </div>
          )}

          {/* Info destino */}
          <div className="flex flex-row">
            <div className=" w-[55%] p-5">
              <h2 className="font-bold">Información del Destino</h2>
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
                    <div className="mb-4 text-justify">
                      <p>{itinerarioTipo1.Cuerpo}</p>
                    </div>
                  );
                } else {
                  // Si no tiene información, mostrar video
                  return (
                    <div className="relative md:w-1/2 aspect-video overflow-hidden rounded-md">
                      <div
                        className="absolute top-0 left-0 w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
                        dangerouslySetInnerHTML={{ __html: data?.Video || "" }}
                      />
                    </div>
                  );
                }
              })()}
            </div>
            <div>
              <div className=" w-[450px] h-[240px] mx-auto flex flex-col  rounded-sm relative">
                {/* <div className="bg-blue-500 p-2 absolute -top-5 right-0 rounded-md text-sm flex text-white">
                  <Star className="mr-2" /> {data?.Texto}
                </div> */}
                <span className="font-bold text-lg text-gris-claro">
                  {data?.Dias} días / {data?.Noches} noches
                </span>
                <span>Precio desde:</span>
                <span className="text-3xl font-bold text-white text-shadow-md bg-amarillo-att p-4">
                  USD {formatNumber(data?.Precio || 0)}
                </span>
                <small className="text-[14px] font-bold text-white text-shadow-md bg-amarillo-att p-4 mt-2">
                  CLP ${formatNumber((data?.Precio || 0) * cambioContadoValue)}
                </small>
                 <span>{data?.Texto}</span>
                <span>Incluye impuestos, tasas y cargos</span>
               
              </div>
            </div>
          </div>
        </div>

        {/* Valores */}
      </div>

      {/* VUELOS - Se renderiza solo si hay vuelos */}
      {EspaciosConfirmados({ Bloqueos: data?.Vuelos || [] })}

      {/* Valores del programa */}
      {data?.ValoresProgramas?.length > 0 && (
        <div className="w-[80%] mx-auto mt-6 mb-8 overflow-hidden  shadow-lg">
          <div className="bg-gradient-to-r bg-gris-oscuro px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              Valores del Programa
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-50 text-left">
                  <th className="px-6 py-3 font-semibold text-[#00296B">
                    Hotel
                  </th>
                  <th className="px-6 py-3 font-semibold text-gris-claro">
                    Habitación
                  </th>
                  <th className="px-6 py-3 font-semibold text-gris-claro">
                    Precio USD
                  </th>
                  <th className="px-6 py-3 font-semibold text-gris-claro">
                    Precio CLP
                  </th>

                  <th className="px-6 py-3 font-semibold text-gris-claro">
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
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Check className="mr-2 text-gris-oscuro w-4 flex-shrink-0" />
                        <span className="font-medium">{valor.Hotel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Check className="mr-2 text-gris-oscuro w-4 flex-shrink-0" />
                        {valor.Habitacion}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Check className="mr-2 text-gris-oscuro w-4 flex-shrink-0" />
                        <span className="font-semibold text-green-600">
                          USD {formatNumber(valor?.Precio || 0)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Check className="mr-2 text-gris-oscuro w-4 flex-shrink-0" />
                        <span className="font-semibold text-green-600">
                          CLP $
                          {formatNumber(
                            (valor?.Precio || 0) * cambioContadoValue
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Check className="mr-2 text-gris-oscuro w-4 flex-shrink-0" />
                        {valor.Text}
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
        <div className="w-[80%] mx-auto mt-4  rounded-md p-4 flex flex-col md:flex-row gap-4 justify-between">
          <div className={`${!data?.Video ? "w-full" : "md:w-1/2"}`}>
            <h2 className="bg-gris-oscuro p-2  text-white">
              El programa Incluye
            </h2>
            <ul className="list-none mt-2">
              {data.Incluyes.map((inc, idx) => (
                <li key={idx} className="flex items-center text-justify">
                  <Check className="mr-2 text-gris-oscuro w-4 flex-shrink-0" />{" "}
                  <span>{inc.Texto}</span>
                </li>
              ))}
            </ul>
          </div>
          {data?.Video && (
            <div className="md:w-1/2 flex flex-col md:flex-col gap-4 items-center">
              <div className="relative md:w-[80%] aspect-video overflow-hidden rounded-md">
                <div
                  className="absolute top-0 left-0 w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
                  dangerouslySetInnerHTML={{ __html: data.Video }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Itinerario */}
      {data?.Itinerarios?.length > 1 && (
        <div className="w-[80%] mx-auto mt-4 border-2 border-black/10 rounded-md p-4 mb-4">
          <h2 className="bg-gris-oscuro p-2  text-white">Itinerario</h2>
          {data.Itinerarios.filter((x) => x.Tipo != "1")
            .sort((a, b) => a.IdItinerario - b.IdItinerario)
            .map((it) => (
              <div key={it.Dia} className="mb-4">
                <h3 className="font-bold text-lg">
                  Día {it.Dia} | {it.Actividad}
                </h3>
                <p className="text-justify">{it.Cuerpo}</p>
              </div>
            ))}
        </div>
      )}

      {/* Condiciones */}
      {data?.Condiciones?.length > 0 && (
        <div className="w-[80%] mx-auto mt-4 rounded-md p-4 mb-4">
          <h2 className="bg-gris-oscuro p-2  text-white">
            Condiciones del Programa
          </h2>
          {data.Condiciones.map((c, idx) => (
            <div key={idx} className="mt-2 flex">
              <Check className="mr-2 text-gris-oscuro w-4" />
              <p>{c.Texto}</p>
            </div>
          ))}
        </div>
      )}

      {/* Actividades */}
      {data?.Actividades?.length > 0 && (
        <div className="w-[80%] mx-auto mt-4   rounded-md p-4 mb-4">
          <h2 className="bg-gris-oscuro p-2  text-white">Observaciones</h2>
          {data.Actividades.map((act, idx) => (
            <div key={idx} className="mt-2 flex">
              <Check className="mr-2 text-gris-oscuro w-4" />
              <p>{act.Texto}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
