import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";


import styles from './footer.module.css'

export default function Footer () {
    return(
        <footer className={styles.footer}>
            <ul>
                <Link href="https://www.linkedin.com/in/abdoelmalik-nazaew-3a4343146/"><li className={styles.size}><FontAwesomeIcon icon={faLinkedin} style={{color: "#0066be",}} /></li></Link>
                <Link href="https://github.com/abdoelmalik1996"><li className={styles.size}><FontAwesomeIcon icon={faGithub} style={{color: "#1f2328",}} /></li></Link>
                <Link href="https://discord.com/users/nohxi"><li className={styles.size}><FontAwesomeIcon icon={faDiscord} style={{color: "#4f63e4",}} /></li></Link>
                <Link href="https://twitter.com/abdoelmalik1996"><li className={styles.size}><FontAwesomeIcon icon={faTwitter} style={{color: "#1da1f2",}} /></li></Link>
            </ul>
        </footer>
    )
}