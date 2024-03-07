import { Banner, BannerInterface } from "../Banner";
import srcDefault from "../../../public/images/home/main-image.jpg";
const banners: BannerInterface[] = [
  { title: "Coleccion de verano", src: srcDefault, category: "maquillaje" },
  { title: "Coleccion de verano", src: srcDefault, category: "maquillaje" },
  { title: "Coleccion de verano", src: srcDefault, category: "maquillaje" },
];

export const SectionBanner = () => {
  return (
    <section>
      {banners.map((banner) => {
        return (
          <Banner
            title={banner.title}
            src={banner.src}
            category={banner.category}
          ></Banner>
        );
      })}
    </section>
  );
};
