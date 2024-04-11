import Image from "next/image";
import srcImage from "../../../public/images/home/webp/main-image.webp";
import { Button } from "@nextui-org/react";

const arrSet = [0, 0, 0, 0, 0, 0, 0, 0];
export const OurProductsHome = () => {
  return (
    <section className=" flex flex-col w-[95%] m-auto my-4 gap-4 max-w-[1050px]">
      <h2 className="text-center text-4xl">Our Products</h2>
      <div
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}
        className="grid gap-4 "
      >
        {arrSet.map((item, index) => {
          return (
            <article key={index} className="aspect-[3/4] flex flex-col">
              <picture className="h-[75%] w-full">
                <Image
                  className="w-full h-full object-cover"
                  src={srcImage}
                  alt="Image from category"
                ></Image>
              </picture>
              <div className="h-[25%] bg-[#F4F5F7] p-2 flex flex-col">
                <h4>Syltherine</h4>
                <p>Syltherine</p>
                <p>$ {20}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="flex items-center justify-center">
        <Button className=" w-full" color="warning" variant="shadow">
          Ver mas
        </Button>
      </div>
    </section>
  );
};
