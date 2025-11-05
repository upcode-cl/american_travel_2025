import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// import { MessageCircleQuestion } from "lucide-react";

const Acordion = () => {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            ¿Cómo reservo un paquete turístico?
          </AccordionTrigger>
          <AccordionContent>
            Puedes reservar tu paquete turístico contactándonos directamente a través de WhatsApp al +56 9 90895441, 
            por correo electrónico a vcabrera@americantraveltour.cl, o completando el formulario de contacto en nuestro sitio web. 
            Nuestro equipo te guiará en todo el proceso de reserva.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>¿Qué medios de pago aceptan?</AccordionTrigger>
          <AccordionContent>
            Aceptamos múltiples formas de pago: transferencia electrónica, depósito en dólares, cheques, 
            tarjetas de crédito bancarias y pago vía WebPay. Nuestras cuentas son del Banco Santander 
            (Cuenta Corriente en Pesos N° 61-55539-0 y en Dólares N° 5100067341). 
            Razón Social: American Travel Tour Ltda. RUT: 76.966.970-1
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            ¿Puedo cambiar la fecha de mi viaje?
          </AccordionTrigger>
          <AccordionContent>
            Sí, es posible realizar cambios en la fecha de tu viaje según disponibilidad y sujeto a las 
            políticas de cancelación de los proveedores. Te recomendamos contactarnos con la mayor anticipación 
            posible para coordinar cualquier modificación. Pueden aplicarse cargos adicionales dependiendo del tipo 
            de servicio contratado.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            ¿Qué incluye el seguro de viaje?
          </AccordionTrigger>
          <AccordionContent>
            Todos nuestros programas incluyen un seguro con cobertura apropiada al destino elegido que contempla: 
            seguro de accidente, asistencia médica, medicamentos, seguro de vida y rondas médicas. 
            Contamos con guías profesionales con experiencia dedicada exclusivamente a garantizar la seguridad 
            de nuestros viajeros.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            ¿Los precios son por persona o por grupo?
          </AccordionTrigger>
          <AccordionContent>
            Los precios pueden variar según el tipo de programa. Generalmente, nuestros paquetes están cotizados 
            por persona, pero ofrecemos tarifas especiales para grupos, colegios y programas estudiantiles. 
            Contáctanos para recibir una cotización personalizada según tus necesidades específicas.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Acordion;
