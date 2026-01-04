import React from 'react'

const FeatureCard = ({ data, id }) => {
  return (
    <div className="
  group
  w-[40vw]
  sm:w-[60vw]
  lg:min-w-[420px]
  min-w-[280px]
  h-[280px]
  rounded-3xl
  bg-[#8AF0B6]
  px-6 lg:px-10
  py-6 lg:py-10
  flex justify-between items-center
      shadow-[0_20px_60px_rgba(0,0,0,0.35)]
      transition-all duration-500 ease-out
      hover:-translate-y-3
      hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)]
    ">

      {/* LEFT CONTENT */}
      <div className="flex flex-col gap-6 max-w-[70%]">
        <h1 className="
          text-3xl
          font-[500]
          tracking-tight
          leading-tight
          text-[#0A0A0A]
        ">
          {data.title}
        </h1>

        <p className="
          text-lg
          text-[#1f1f1f]
          opacity-80
          leading-relaxed
        ">
          {data.desc}
        </p>
      </div>

      {/* RIGHT INDEX */}
      <div className="
        text-[96px]
        font-bold
        text-orange-400
        -rotate-90
        select-none
        transition-all duration-500
        group-hover:scale-110
      ">
        0{id + 1}
      </div>
    </div>
  );
};

export default FeatureCard;
