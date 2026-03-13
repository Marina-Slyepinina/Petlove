import { Modal } from '../Modal/Modal';
import { NavButton } from '../NavButton/NavButton';
import css from "./ModalAttention.module.css";

import dogIcon from "../../assets/img/dog.webp";

interface ModalAttentionProps {
    onClose: () => void;
}

export const ModalAttention = ({ onClose }: ModalAttentionProps) => {
    return (
        <Modal onClose={onClose}>
            <div className={css.container}>
                <div className={css.imgWrapper}>
                    <img src={dogIcon} alt="dog icon" />
                </div>
                <p className={css.title}>Attention</p>
                <p className={css.text}>We would like to remind you that certain functionality is available only to authorized users.If you have an account, please log in with your credentials. If you do not already have an account, you must register to access these features.</p>
                <div className={css.btnWrapper}>
                    <NavButton to={'/login'} variant='primary'>Log In</NavButton>
                    <NavButton to={'/register'} variant='secondary'>Registration</NavButton>
                </div>
            </div>
        </Modal>
    )
}
