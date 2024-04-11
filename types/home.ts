import { StaticImageData } from "next/image";

export interface ItemCategoryHome {
  title: string;
  link: string;
  img: string | StaticImageData;
}
