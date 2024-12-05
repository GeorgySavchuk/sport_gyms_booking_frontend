import {HomeLead} from "@/app/widgets/HomeLead";
import styles from './styles.module.css';

export const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <HomeLead/>
        </div>
    )
};