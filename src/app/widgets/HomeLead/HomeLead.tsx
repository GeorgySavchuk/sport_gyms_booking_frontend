import { BlockNavButton } from '@/app/entities';
import { PiCourtBasketballLight } from "react-icons/pi";
import styles from './styles.module.css';

export const HomeLead = () => {
    return (
        <div className={styles.homeLead}>
            <div className={styles.content}>
                <h1 className={styles.contentHeader}>Занимайтесь спортом</h1>
                <p className={styles.contentDescription}>Бронируйте площадки</p>
                <div className={styles.navButtons}>
                    <BlockNavButton
                        title={'Арендовать площадку'}
                        icon={<PiCourtBasketballLight/>}
                    />
                </div>
            </div>
        </div>
    );
}