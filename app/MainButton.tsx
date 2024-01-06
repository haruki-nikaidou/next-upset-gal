import styles from './MainButton.module.css';

export default function MainButton(props: { href?: string, children: React.ReactNode }) {
    return (
        <a className={styles.mainButton} href={props.href}>{props.children}</a>
    )
}