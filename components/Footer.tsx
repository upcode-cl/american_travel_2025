import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { MailQuestion } from "lucide-react";
import { Headphones } from "lucide-react";
import Acordion from "./Acordion";

const Footer = () => {
  return (
    <footer
      id="contacto"
      className="bg-gris-oscuro  text-white flex flex-col  justify-center items-center  "
    >
      {/* NECESITAS AYUDAS? */}
      <div className="flex flex-col md:flex-row justify-around items-center gap-4 w-full pb-10 pt-8 bg-gris-oscuro">
        <div className="text-[30px]">¿Necesitas Ayuda?</div>
        <div>
          <div className="flex flex-col justify-center items-center gap-4">
            <Headphones />
            <span>Ventas |</span>
            <a
              href="https://wa.me/56990895441"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              +56 9 90895441
            </a>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center items-center gap-4">
            <MailQuestion /> <span>Reservas |</span>{" "}
            vcabrera@americantraveltour.cl
          </div>
        </div>
      </div>
      {/* 
      <div className=" relative w-full h-[150px] ">
        <Image
          src="/banner-soportejpg.jpg"
          layout="fill"
          objectFit="contain"
          alt="logo"
          className="pt-2"
        />
      </div> */}

      {/* FOOTER LINKS */}

      <div className="flex flex-col gap-7 md:flex-row md:justify-around w-full justify-center items-center bg-gris-oscuro ">
        <div>
          <Image src="/gira.png" width={200} height={200} alt="logo" />
        </div>
        <div>
          <div>
            <Dialog>
              <DialogTrigger>Servicio al cliente</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Servicio al cliente</DialogTitle>
                  <DialogDescription className="text-justify">
                    Somos American Travel Tour Ltda, Agencia de viajes y
                    operador mayorista con una trayectoria de 15 años.
                    <br></br>
                    <br></br>
                    Incorporada a la Asociación Chilena de Turismo ACHET,
                    SERNATUR y con Sello de Calidad Turística. Por medio de
                    nuestro Departamento Estudiantil Mi Gira, en alianza con
                    nuestros representantes con más de 30 años de experiencia en
                    realizar viajes de estudios alrededor del mundo, entregamos
                    diversas alternativas de viajes a nivel nacional como
                    internacional.<br></br>
                    <br></br> Quienes ya nos conocen, saben que los principales
                    atributos de nuestros servicios son; un gran
                    destino,seguridad y calidad.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          {/* seguridad para tus hijos   */}
          <div>
            <Dialog>
              <DialogTrigger>Formas de pago</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Formas de pago</DialogTitle>
                  <DialogDescription>
                    Unido a la gran experiencia de nuestros guías profesionales,
                    los programas ofertados poseen un seguro con la cobertura
                    apropiada al destino elegido:
                    <br></br>
                    <br></br>
                    <ul>
                      <li>Seguro de accidente</li>
                      <li>Asistencia medica</li>
                      <li>Medicamentos</li>
                      <li>Seguro de vida</li>
                      <li>Rondas Medicas</li>
                    </ul>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          {/* profesionales */}
          <div>
            <Dialog>
              <DialogTrigger>Calidad de servicio</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Calidad de servicio</DialogTitle>
                  <DialogDescription className="text-justify">
                    Contamos con personal debidamente calificado y una acabada
                    planificación de nuestros programas, conductores de aprobada
                    seriedad y experiencia, así como guías profesionales de
                    dedicación exclusiva a su rubro
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col">
          <Dialog>
            <DialogTrigger>Póliticas de Explotación Sexual</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure 2?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>Politicas de privacidad</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Políticas de privacidad</DialogTitle>
                <DialogDescription>
                  Razón Social: American Travel Tour Ltda. Rut: 76.966.970 – 1
                  Cuenta Corriente Banco Santander en Pesos N° 61-55539-0 Cuenta
                  Corriente Banco Santander en Dólares No 5100067341
                  <ul>
                    <li>Pago al contado vía transferencia electrónica</li>
                    <li>Pago al contado vía depósito en dólar</li>
                    <li>Pago con cheques</li>
                    <li>Pago con tarjeta de crédito bancaria</li>
                    <li>Pago vía webpay </li>
                  </ul>
                  Cada año, más colegios nos prefieren. Vive la experiencia: MI
                  GIRA CON AMERICAN TRAVEL TOUR.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>Términos y condiciones</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Términos y condiciones</DialogTitle>
                <DialogDescription className="text-justify">
                  Alternativa de hoteles 3, 4 y 5, y de prestigio en cada
                  destino.
                  <br></br> Transporte aéreo y terrestre de primer orden a nivel
                  nacional e internacional. Representantes exclusivos en
                  nuestros destinos.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>


        </div>
        {/*acordeon  con las preguntas frecuentes*/}
        <div>
          <Dialog>
            {/** Al hacer hover en Preguntas Frecuentes, debe cambiar el puntero para que  */}
            <DialogTrigger className="cursor-pointer">Preguntas Frecuentes</DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Preguntas Frecuentes</DialogTitle>
              </DialogHeader>
              <Acordion />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-10 bg-gris-oscuro">
        <p>© 2025: American Travel Tour</p>
      </div>
      <div className=" bg-gris-oscuro">
        <p className="text-xs">
          Sitio desarrollado por{" "}
          <a href="www.upcode.cl" target="_blank">
            UP Code
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
