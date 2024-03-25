import { Banner, BannerInterface } from "../Banner";
import srcDefaultWomen from "../../../public/images/home/women-category.jpg";
import srcDefaultMen from "../../../public/images/home/men-category.jpg";
import srcDefaultChildren from "../../../public/images/home/children-category.jpg";

const banners: BannerInterface[] = [
  { title: "Mujeres", src: srcDefaultWomen, category: "women" },
  { title: "Hombres ", src: srcDefaultMen, category: "men" },
  { title: "Niños ", src: srcDefaultChildren, category: "children" },
];

export const SectionBanner = () => {
  return (
    <section>
      {banners.map((banner, index) => {
        return (
          <Banner
            key={index}
            title={banner.title}
            src={banner.src}
            category={banner.category}
          ></Banner>
        );
      })}
    </section>
  );
};
