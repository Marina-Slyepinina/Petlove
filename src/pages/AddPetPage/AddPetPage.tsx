import css from "./AddPetPage.module.css";
import mob1x from "../../assets/img/add-pet/personal-mob@1x.webp";
import mob2x from "../../assets/img/add-pet/personal-mob@2x.webp";
import tabl1x from "../../assets/img/add-pet/personal-tabl@1x.webp";
import tabl2x from "../../assets/img/add-pet/personal-tabl@2x.webp";
import desk1x from "../../assets/img/add-pet/personal-desc@1x.webp";
import desk2x from "../../assets/img/add-pet/personal-desc@2x.webp";

const AddPetPage = () => {
    return (
        <div className={css.container}>
            <picture className={css.picture}>
                <source media="(min-width: 1280px)" srcSet={`${desk1x} 1x, ${desk2x} 2x`} />
                <source media="(min-width: 768px)" srcSet={`${tabl1x} 1x, ${tabl2x} 2x`} />
                <img src={mob1x} alt="Pet photo" srcSet={`${mob2x} 2x`} />
            </picture>
            <div className={css.petDetails}>
                <div className={css.petDetailsHeader}>
                    <h1 className={css.title}>Add my pet /</h1>
                    <p className={css.subtitle}>Personal details</p>
                </div>
            </div>
        </div>
    )
}

export default AddPetPage;
