import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={`${styles.bar} glass`}>
            <span className={`${styles.headerContainer}`}>
                <span className={styles.title}>
                    失落の小站 镜像站
                </span>
                <span className={styles.header}>
                    <a className={`${styles.headerItem}`}>
                        首页
                    </a>
                    <a className={`${styles.headerItem}`}>
                        搜索
                    </a>
                    <a className={`${styles.headerItem}`}>
                        目录
                    </a>
                    <a className={`${styles.headerItem}`}>
                        关于
                    </a>
                </span>
            </span>
        </header>
    )
}