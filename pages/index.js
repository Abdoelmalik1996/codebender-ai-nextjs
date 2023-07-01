import RecipePal from "@/components/RecipePal"
import styles from './index.module.css'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function index() {
  return (
    <>
    <Navbar />
    <section className={styles.section}>
      <RecipePal />
      <Footer />
    </section>
    </>
  )
}
