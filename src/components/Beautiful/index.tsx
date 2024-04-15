import { Button } from "@nextui-org/react";
import { SliderBeautiful } from "../SliderBeautiful";
import Link from "next/link";

export const Beautiful = () => {
  return (
    <section className="grid lg:grid-cols-2 my-4 p-4 max-w-[1100px] m-auto">
      <article className=" p-4">
        <h2 className=" text-4xl flex flex-col">
          50+ Beautiful rooms
          <span>inspiration</span>
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          praesentium quos ad reiciendis, quia sed aliquam vel recusandae sint
          illum libero ex ducimus eius impedit. Officia minus reiciendis magni
          eveniet!
        </p>
        <Button as={Link} href="/products" color="warning" variant="shadow">
          Explore More
        </Button>
      </article>
      <SliderBeautiful></SliderBeautiful>
    </section>
  );
};
