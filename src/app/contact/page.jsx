import Banner from "@/components/banner/page";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import GetInTouch from "@/components/getintouch/page";

export default function ContactUs() {
  return (
    <>
      <Banner text="Contact Us" />
      <GetInTouch />

      <Contact />
      <Footer />
    </>
  );
}
