import { useState } from 'react';
import { UserBar } from '../UserBar/UserBar'
import { ModalApproveAction } from '../ModalApproveAction/ModalApproveAction';
import clsx from 'clsx';
import css from './UserNav.module.css'

interface UserNavProps {
    isHome?: boolean;
}

export const UserNav = ({ isHome }: UserNavProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={css.userNavContainer}>

            <button type="button" onClick={() => setIsModalOpen(true)} className={clsx(css.btn, isHome && css.outline)}>Log out</button>
            {isModalOpen && <ModalApproveAction onClose={() => setIsModalOpen(false)} />}

            <UserBar />
        
        </div>
    )
}
