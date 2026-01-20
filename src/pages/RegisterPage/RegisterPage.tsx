import PetBlock from "../../components/PetBlock/PetBlock";
import css from "./RegisterPage.module.css";

import mobile1x from "../../assets/img/registration/registration-mob@1x.webp";
import mobile2x from "../../assets/img/registration/registration-mob@2x.webp";
import tablet1x from "../../assets/img/registration/registration-tbl@1x.webp";
import tablet2x from "../../assets/img/registration/registration-tbl@2x.webp";
import desc1x from "../../assets/img/registration/registration-decs@1x.webp";
import desc2x from "../../assets/img/registration/registration-decs@2x.webp";
import catIcon from "../../assets/img/cat.webp";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm";


const RegisterPage = () => {

  const petImages = {
    mobile: mobile1x,
    mobile2x: mobile2x,
    tablet: tablet1x,
    tablet2x: tablet2x,
    desktop: desc1x,
    desktop2x: desc2x
  };

  const petInfo = {
    name: "Jack",
    birthday: "18.10.2021",
    description: "Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys.",
    petIcon: catIcon
  };

  return (
    <div className={css.container}>
      <PetBlock images={petImages} petInfo={petInfo} />
      <RegistrationForm />
    </div>
  )
}

export default RegisterPage;