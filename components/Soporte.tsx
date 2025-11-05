import Image from "next/image";
import React from "react";

const Soporte = () => {
  return (
    <div className={`relative w-full h-[150px] mt-10`}>
      <a href="https://wa.me/56990895441" target="_blank" rel="noreferrer">
        <Image
          src="/banner-soportejpg.jpg"
          layout="fill"
          objectFit="contain"
          alt="logo"
        />
      </a>
    </div>
  );
};

export default Soporte;
