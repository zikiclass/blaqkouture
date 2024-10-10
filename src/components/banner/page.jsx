import styles from "./style.module.css";
export default function Banner({ text }) {
  return (
    <section className={styles.banner}>
      <h3>{text}</h3>
    </section>
  );
}
