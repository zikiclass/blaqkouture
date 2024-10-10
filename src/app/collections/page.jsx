import Banner from "@/components/banner/page";
import ClientReviews from "@/components/clientreviews/page";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import News from "@/components/news/page";
import TrendingProducts from "@/components/trendingproducts/page";

export default function Collections() {
  return (
    <>
      <Banner text="Blaq Kouture" />
      <TrendingProducts />
      <ClientReviews />
      <News />
      <Contact />
      <Footer />
    </>
  );
}
