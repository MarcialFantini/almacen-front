import { Beautiful } from "@/components/Beautiful";
import { OurProductsHome } from "@/components/OurProductsHome";
import { SectionPrincipal } from "@/components/SectionPrincipal";
import { SectionProductsHome } from "@/components/SectionProductsHome";

export default function Home() {
  return (
    <main className=" w-full">
      <SectionPrincipal></SectionPrincipal>
      <SectionProductsHome></SectionProductsHome>
      <OurProductsHome></OurProductsHome>
      <Beautiful></Beautiful>
    </main>
  );
}
