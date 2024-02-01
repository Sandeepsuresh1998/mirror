import Link from "next/link";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import styles from './styles/NavBar.module.css';
import LogoutIcon from '@mui/icons-material/Logout';


export default function Component() {

    return (
        <header className={styles.header}>
            <Link className={styles.link} href="#">
                <AutoStoriesIcon className="icon" style={{ fontSize: 30 }}/>
                <span className="sr-only">Logo</span>
            </Link>
            <nav className={styles.nav}>
                <Link className="link" href="/journal">Journal</Link>
                <Link className="link" href="/reflect">Reflect</Link>
                <Link className="link" href="/faq">FAQ</Link>
            </nav>
            <Link className={styles.logout} href="/api/auth/logout">
                <LogoutIcon className="icon" style={{ fontSize: 30 }}/>
                <span className="sr-only">Logout</span>
            </Link>
        </header>
    )
}
