import clsx from 'clsx';
import { Modal } from '../Modal/Modal'
import css from './ModalApproveAction.module.css'

interface ModalApproveActionProps {
  onClose: () => void;
}

export const ModalApproveAction = ({ onClose }: ModalApproveActionProps) => {
  return (
    <Modal onClose={onClose}>
      <div className={css.modalWrapper}>
        <div className={css.imgWrapper}>
          <img src="/src/assets/img/cat.webp" alt="cat" className={css.img} />
        </div>
        <p className={css.text}>Already leaving?</p>
        <div className={css.btnContainer}>
          <button type="button" className={clsx(css.btn, css.accent)}>Yes</button>
          <button type="button" onClick={onClose} className={css.btn}>Cancel</button>
        </div>
      </div>
    </Modal>
  )
}
