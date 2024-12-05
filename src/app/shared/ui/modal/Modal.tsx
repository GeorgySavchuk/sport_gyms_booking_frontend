import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from "./styles.module.css";
import { createPortal } from 'react-dom';
import { Login } from '@/app/features/login';
import { Registration } from '@/app/features/registration';

interface ModalProps {
    content: string | null;
    isVisible: boolean;
}

export const Modal: React.FC<ModalProps> = ({ content, isVisible }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const displayContent = () => {
        if (content === 'login') {
            return <Login />;
        } else if (content === 'registration') {
            return <Registration />;
        } else {
            return null;
        }
    };

    if (!isClient) {
        return null;
    }

    return createPortal(
        <div className={cn({
            [styles.modalBackground]: isVisible,
        })}>
            <div className={cn(styles.modal, {
                [styles.visible]: isVisible
            })}>
                {displayContent()}
            </div>
        </div>,
        document.body
    );
};