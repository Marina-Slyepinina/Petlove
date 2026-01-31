import { useState } from 'react';
import { UserBar } from '../UserBar/UserBar'
import { ModalApproveAction } from '../ModalApproveAction/ModalApproveAction';
import css from './UserNav.module.css'

interface UserNavProps {
    isHome?: boolean;
}

export const UserNav = ({ isHome }: UserNavProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={css.userNavContainer}>

            {!isHome && <button type="button" onClick={() => setIsModalOpen(true)} className={css.btn}>Log out</button>}
            {isModalOpen && <ModalApproveAction onClose={() => setIsModalOpen(false)} />}

            <UserBar />
        
        </div>
    )
}
