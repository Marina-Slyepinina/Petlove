import css from "./HomePage.module.css";

import mobile1x from "../../assets/img/home/home-mob@1x.webp";
import mobile2x from "../../assets/img/home/home-mob@2x.webp";
import tablet1x from "../../assets/img/home/home-tabl@1x.webp";
import tablet2x from "../../assets/img/home/home-tabl@2x.webp";
import desc1x from "../../assets/img/home/home-desc@1x.webp";
import desc2x from "../../assets/img/home/home-desc@2x.webp";

const HomePage = () => {
  return (
    <div className={css.homeContainer}>
      <div className={css.contentBlock}>
        <h1 className={css.title}>Take good <span>care</span> of your small pets</h1>
        <p className={css.text}>Choosing a pet for your home is a choice that is meant to enrich your life with immeasurable joy and tenderness.</p>
      </div>
      <div className={css.imgWrapper}>
        <picture className={css.picture}>
          <source media="(min-width: 1280px)" srcSet={`${desc1x} 1x, ${desc2x} 2x`} />
          <source media="(min-width: 768px)" srcSet={`${tablet1x} 1x, ${tablet2x} 2x`} />
          <img src={mobile1x} srcSet={`${mobile2x} 2x`} alt="Woman with dog" />
        </picture>
      </div>
    </div>
  )
}

export default HomePage;