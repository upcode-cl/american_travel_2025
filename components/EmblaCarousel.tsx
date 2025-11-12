"use client";
import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import Destinos_destacados from "./Destinos_destacados";
import { Program, ResponseExchange } from "@/app/interfaces/interfaces";
import { Exchange, getProgramasDestacados } from "@/app/api/Services";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const [programasGiras, setProgramasGiras] = useState<Program[]>([]);
  const [cambio, setCambio] = useState<ResponseExchange | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setError(null);
        setLoading(true);
        // Ejecutamos ambas peticiones en paralelo para mayor eficiencia
        const [girasResponse, exchangeResponse] = await Promise.all([
          getProgramasDestacados(),
          Exchange(),
        ]);

        if (girasResponse.statusCode === 200) {
          setProgramasGiras(girasResponse.value.entities);
        } else {
          throw new Error("No se pudieron cargar los datos de las giras.");
        }

        setCambio(exchangeResponse);
      } catch (err) {
        console.error("Error fetching data in Giras component:", err);
        setError(
          "Hubo un problema al cargar la información. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      cargarDatos();
    }, 1000);

    // Limpieza del temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.play;

    resetOrStop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  const SkeletonCard = () => (
    <div className="embla__slide flex flex-col space-y-3">
      <div className="h-56 w-full rounded-xl bg-gray-200 animate-pulse" />
      <div className="space-y-2">
        <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/4 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );

  if (error) {
    return <div className="text-center p-20 text-red-600">{error}</div>;
  }

  return (
    <section className="embla pt-6 sm:pt-10 px-2 sm:px-0">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : programasGiras.map((programas: Program) => (
                <div className="embla__slide" key={programas.IdPrograma}>
                  <Destinos_destacados
                    Titulo={programas.Titulo}
                    Dias={programas.Dias.toString()}
                    Noches={programas.Noches.toString()}
                    Precio={programas.Precio.toString()}
                    Hotels={programas.ValoresProgramas[0]?.Hotel}
                    ValorPersona={programas.Texto}
                    ImagenDestino={programas.UrlImage}
                    IdPrograma={programas.IdPrograma}
                    cambio={cambio}
                    subtitulo={programas.NombreArea}
                  />
                </div>
              ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
