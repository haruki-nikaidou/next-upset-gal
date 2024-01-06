'use client';

import styles from './Header.module.css';
import { usePathname } from 'next/navigation'

enum ActivePage {
    HOME,
    SEARCH,
    CATALOG,
    FANCY,
    NONE
}

export default function Header() {
    const path = usePathname();
    let activePage: ActivePage;
    if (path.includes('/search')) {
        activePage = ActivePage.SEARCH;
    } else if (path.includes('/catalog')) {
        activePage = ActivePage.CATALOG;
    } else if (path.includes('/fancy')) {
        activePage = ActivePage.FANCY;
    } else if (path.includes('/')) {
        activePage = ActivePage.HOME;
    } else {
        activePage = ActivePage.NONE;
    }
    return (
        <header className={`${styles.bar} glass`}>
            <span className={`${styles.headerContainer}`}>
                <span className={styles.title}>
                    失落の小站 镜像站
                </span>
                <span className={styles.header}>
                    <a className={`${styles.headerItem} ${activePage === ActivePage.HOME ? styles.selectedItem : ''} `} href='/'>
                        首页
                    </a>
                    <a className={`${styles.headerItem} ${activePage === ActivePage.SEARCH ? styles.selectedItem : ''}`} href='/search'>
                        搜索
                    </a>
                    <a className={`${styles.headerItem} ${activePage === ActivePage.CATALOG ? styles.selectedItem : ''}`} href='/catalog'>
                        目录
                    </a>
                    <a className={`${styles.headerItem} ${activePage === ActivePage.FANCY ? styles.selectedItem : ''}`} href='/fancy'>
                        百宝箱
                    </a>
                </span>
            </span>
        </header>
    )
}