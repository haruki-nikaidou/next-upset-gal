import {VERSION} from "@/app/config";

export default function Footer() {
    return (
        <footer className="fixed bottom-2 w-full text-sm">
            Powered by <a href="https://i.plr.moe/" target="_blank">Haruki</a>, mirroring from <a href="https://shinnku.com/">shinnku.com</a> <br/>
            Available on <a href="https://github.com/haruki-nikaidou/upset-gal-mirror">Github</a> | version: {VERSION}
        </footer>
    )
}
