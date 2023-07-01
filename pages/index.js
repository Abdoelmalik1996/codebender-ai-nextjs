import RecipePal from "@/components/RecipePal"
import styles from './index.module.css'
import Navbar from "@/components/Navbar"

export default function index() {
  return (
    <>
    <Navbar />
    <section className={styles.section}>
      <RecipePal />
    </section>
    </>
  )
}
