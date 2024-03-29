import logo from './upsetgal-logo.webp'
import Image from "next/image";

export default function Logo(props:{className?: string}) {
    return (
        <Image src={logo} alt="upset gal logo" className={"block max-w-sm" + " " + props.className??''} />
    )
}