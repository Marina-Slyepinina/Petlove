import PetBlock from "../../components/PetBlock/PetBlock";
import css from "./LoginPage.module.css";

import mobile1x from "../../assets/img/login/log-in-mob@1x.webp";
import mobile2x from "../../assets/img/login/log-in-mob@2x.webp";
import tablet1x from "../../assets/img/login/log-in-tabl@1x.webp";
import tablet2x from "../../assets/img/login/log-in-tabl@2x.webp";
import desc1x from "../../assets/img/login/log-in-desc@1x.webp";
import desc2x from "../../assets/img/login/log-in-desc@2x.webp";
import dogIcon from "../../assets/img/dog.webp";
import { LoginForm } from "../../components/LoginForm/LoginForm";

const LoginPage = () => {

  const petImages = {
    mobile: mobile1x,
    mobile2x: mobile2x,
    tablet: tablet1x,
    tablet2x: tablet2x,
    desktop: desc1x,
    desktop2x: desc2x
  };

  const petInfo = {
    name: "Rich",
    birthday: "21.09.2020",
    description: "Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!",
    petIcon: dogIcon
  };

  return (
    <div className={css.container}>
      <PetBlock images={petImages} petInfo={petInfo} />
      <LoginForm />
    </div>
  )
}

export default LoginPage;