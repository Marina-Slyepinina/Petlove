import { NavButton } from "../../components/NavButton/NavButton";
import css from "./NotFoundPage.module.css";

import mob1x from "../../assets/img/not-found/not-found-mob@1x.webp";
import mob2x from "../../assets/img/not-found/not-found-mob@2x.webp";
import descTabl1x from "../../assets/img/not-found/not-found-desc-tabl@1x.webp";
import descTabl2x from "../../assets/img/not-found/not-found-desc-tabl@2x.webp";

export const NotFoundPage = () => {
    return (
        <div className={css.background}>
            <div className={css.content}>
                <div className={css.statusWrapper}>
                    <span className={css.number}>4</span>
                    <div className={css.imgWrapper}>
                        <picture className={css.picture}>
                            <source
                                media="(min-width: 1280px)"
                                srcSet={`${descTabl1x} 1x, ${descTabl2x} 2x`}
                            />
                            <source
                                media="(min-width: 768px)"
                                srcSet={`${descTabl1x} 1x, ${descTabl2x} 2x`}
                            />
                            <img
                                src={mob1x}
                                srcSet={`${mob2x} 2x`}
                                alt="Cat"
                                loading="lazy"
                            />
                        </picture>
                    </div>
                    <span className={css.number}>4</span>
                </div>
                <p className={css.text}>Ooops! This page not found :(</p>
                <NavButton to="/" variant="secondary">To home page</NavButton>
            </div>
        </div>
    )
}
