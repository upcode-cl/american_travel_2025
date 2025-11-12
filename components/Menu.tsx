"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import { AlignJustify } from "lucide-react";
import { Ship } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Headset } from "lucide-react";
import { Plane } from "lucide-react";
import { ResponseExchange } from "@/app/interfaces/interfaces";
import Link from "next/link";
import { Exchange } from "@/app/api/Services";
// import { Exchange } from "@/app/api/Services";

const Menu = () => {
  const [fecha, setFecha] = useState("");
  useEffect(() => {
    const hoy = new Date();

    const opciones: Intl.DateTimeFormatOptions = {
      weekday: "long", // día de la semana (viernes)
      day: "2-digit", // día (02)
      month: "long", // mes (mayo)
      year: "numeric", // año (2025)
    };

    const fechaFormateada = hoy.toLocaleDateString("es-ES", opciones);
    setFecha(fechaFormateada);
  }, []);

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

  return (
    <div className="w-full  bg-gris-oscuro flex justify-between pl-8 items-center z-50 relative left-0  mt-0 h-[65px]">
      {/* menu mobile */}
      <div className="md:hidden flex">
        <Sheet>
          <SheetTrigger className="text-white border-2 border-white p-3 ">
            <AlignJustify />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>

              <SheetDescription>
                <Link href="/">
                  <li className="animacion-botones">Home</li>
                </Link>
                <Link href="/lujos">
                  <li className="animacion-botones">Lujos</li>
                </Link>
                <Link href="/cruceros">
                  <li className="animacion-botones">Cruceros</li>
                </Link>
                <Link href="#contacto">
                  <li className="animacion-botones">Contacto</li>
                </Link>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    <Link href="/">
      <Image
        src="/gira.png"
        width={70}
        height={70}
        alt="logo"
        className=" md:hidden right-10 absolute"
      />
      </Link>
      {/* fin menu mobile */}
      <div className="lg:w-[200px]">
        <Image src="/gira.png" width={150} height={150} alt="logo" />
      </div>
      <div className="flex justify-around gap-[100px] ">
        <div className=" w-[600px] ">
          <ul className="hidden md:flex gap-3.5 justify-around text-white  ">
            <Link href="/">
              <li className="animacion-botones ">
                <span>
                  <Plane />
                </span>
                Home
              </li>
            </Link>
            <Link href="/lujos">
              <li className="animacion-botones">
                <span>
                  <Sparkles />
                </span>
                Lujos
              </li>
            </Link>
            <Link href="/cruceros">
              <li className="animacion-botones ">
                <span>
                  <Ship />{" "}
                </span>
                Cruceros
              </li>
            </Link>
            <Link href="#contacto">
              <li className="animacion-botones">
                <span>
                  <Headset />
                </span>
                Contacto
              </li>
            </Link>
          </ul>
        </div>
        {/* menu movil */}

        <div className="hidden md:flex items-center justify-baseline ">
          <p className="text-white pr-10 text-[14px] md:text-[12px] lg:text-[14px] ">
            {fecha} <br /> cambio contado: {cambio?.CambioContado} - cambio
            crédito: {cambio?.CambioCredito}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
