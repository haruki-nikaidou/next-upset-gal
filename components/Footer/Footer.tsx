import {VERSION} from "@/app/config";
import styles from './footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            Powered by <a href="https://i.plr.moe/" target="_blank">Haruki</a>, mirroring from <a href="https://shinnku.com/">shinnku.com</a> <br/>
            Available on <a href="https://github.com/haruki-nikaidou/upset-gal-mirror">Github</a> | version: {VERSION}
        </footer>
    )
}
