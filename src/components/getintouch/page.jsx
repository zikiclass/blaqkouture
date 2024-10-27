import styles from "./style.module.css";
import { TfiHome } from "react-icons/tfi";
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { messageSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
export default function GetInTouch() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(messageSchema) });
  return (
    <section className={styles.getintouch}>
      <div className={styles.form}>
        <h3>Get in Touch</h3>
        <form
          action=""
          onSubmit={handleSubmit(async (data) => {
            try {
              await axios.post("/api/message", { ...data });

              toast.success("Your message has been sent successfully");
              router.push("/");
            } catch (error) {
              toast.error(error.message || "Something went wrong");
            }
          })}
        >
          <Toaster position="bottom-left" />
          <textarea
            name="message"
            placeholder="Enter Message"
            {...register("message")}
          ></textarea>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              {...register("name")}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              {...register("email")}
            />
          </div>
          <input
            type="text"
            placeholder="Enter Subject"
            name="subject"
            {...register("subject")}
          />
          <button type="submit">
            <span>Send</span>
          </button>
        </form>
      </div>
      <div className={styles.contact}>
        <div className={styles.col}>
          <div className={styles.icon}>
            <TfiHome />
          </div>
          <div className={styles.content}>
            <p>Ugbomoro, Warri</p>
            <span>Delta State, Nigeria</span>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.icon}>
            <FaPhoneVolume />
          </div>
          <div className={styles.content}>
            <p>+2349063152812</p>
            <span>Mon to Fri 9am to 6pm</span>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.icon}>
            <TfiEmail />
          </div>
          <div className={styles.content}>
            <p>info@blaqkouture.com</p>
            <span>Send us your query anytime!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
