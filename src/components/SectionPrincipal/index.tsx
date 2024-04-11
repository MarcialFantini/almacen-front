import Image from "next/image";
import srcDefault from "../../../public/images/home/webp/main-image.webp";
import { Button } from "@nextui-org/react";

export const SectionPrincipal = () => {
  return (
    <section className=" m-auto max-w-[1200px] flex items-center justify-end relative min-h-[100vh] w-full bg-red-400">
      <picture className="flex flex-col justify-center items-center overflow-hidden absolute w-full h-full">
        <Image
          className="h-full w-full object-cover"
          src={srcDefault}
          alt="main image"
        ></Image>
      </picture>
      <article className="absolute w-[40%] min-w-[250px] right-[8%] aspect-[1,45] gap-4 bg-[#FFF3E3] p-4 flex flex-col">
        <p className="">New Arrives</p>
        <h2 className="flex flex-col text-[#B88E2F] text-4xl ">
          Discover Our <span>New Collection</span>
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          doloremque saepe dolore deserunt est expedita reprehenderit tempore
          itaque, alias inventore officia rem sapiente. Qui asperiores fugit
          eligendi ipsum odit facere.
        </p>
        <Button color="warning" variant="shadow">
          Buy Now
        </Button>
      </article>
    </section>
  );
};
