import Link from 'next/link'
import Image from 'next/image'
import styles from './navbar.module.css'
import Logo from '../public/img/logo.svg'

export default function Navbar() {

    const refreshPage = () => {
        window.location.reload();
      };

    return(
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/" onClick={refreshPage}><Image src={Logo} alt="RecipePal Logo" /></Link>
            </div>

            <ul className={styles.menu}>
                <li><Link href="/about">Discover Recipepal</Link></li>
            </ul>
        </nav>
    );
}