import Link from "next/link";

import { arrCategories } from "./categories";
import Image from "next/image";

export const SectionProductsHome = () => {
  return (
    <section className="flex flex-col gap-4 w-[95%] m-auto my-4 max-w-[1050px]">
      <header className="flex flex-col items-center">
        <h2 className=" text-4xl">Browse The Range</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </header>
      <div
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}
        className="grid gap-4 "
      >
        {arrCategories.map((item) => {
          return (
            <article className=" flex flex-col gap-4" key={item.title}>
              <picture className="flex w-full h-full aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  className="w-full h-full object-cover"
                  src={item.img}
                  alt={`image of ${item.title}`}
                ></Image>
              </picture>
              <h4 className=" text-center">{item.title}</h4>
            </article>
          );
        })}
      </div>
    </section>
  );
};
