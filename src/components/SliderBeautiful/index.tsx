"use client";

import styled from "./styled.module.css";
import Image from "next/image";
import srcImage from "../../../public/images/home/webp/main-image.webp";
import { useState } from "react";
import { Button } from "@nextui-org/react";

const arrImg = [srcImage, srcImage, srcImage, srcImage];

export const SliderBeautiful = () => {
  const [state, setState] = useState(0);
  const plusHandler = () => {
    if (state + 1 <= 3) {
      setState((prev) => prev + 1);
    } else {
      setState(0);
    }
  };

  const lessHandler = () => {
    if (state - 1 < 0) {
      setState(3);
    } else {
      setState((prev) => prev - 1);
    }
  };

  return (
    <div className={styled.view + " min-h-[250px] lg:min-h-[400px]"}>
      <ul style={{ left: `-${state * 25}%` }} className={styled.row}>
        {arrImg.map((src, index) => {
          return (
            <li
              className={
                styled.item + " " + (state === index ? styled.itemSelected : "")
              }
              key={index}
            >
              <picture className={styled.picture}>
                <Image
                  className={styled.img}
                  src={src}
                  alt={`image ${index}`}
                ></Image>
              </picture>
            </li>
          );
        })}
      </ul>

      <div className="absolute right-4 bottom-4 flex flex-col gap-4 items-end">
        <div className="flex flex-row gap-4">
          {arrImg.map((item, index) => {
            return (
              <div
                className={
                  " transition-all w-4  aspect-square rounded-full" +
                  ` ${state !== index ? "bg-purple-200" : "bg-purple-500"}`
                }
              ></div>
            );
          })}
        </div>
        <div className=" flex flex-row ">
          <Button color="primary" onClick={plusHandler}>
            +
          </Button>
          <Button color="primary" onClick={lessHandler}>
            -
          </Button>
        </div>
      </div>
    </div>
  );
};
