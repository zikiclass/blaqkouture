import ClientReviews from "@/components/clientreviews/page";
import Contact from "@/components/contact/page";
import FindBestCollection from "@/components/findbestcollection/page";
import Footer from "@/components/footer/page";
import MainContent from "@/components/maincontent/page";
import News from "@/components/news/page";
import TrendingProducts from "@/components/trendingproducts/page";

export default function Main() {
  return (
    <>
      <MainContent />
      <TrendingProducts />
      <ClientReviews />
      <FindBestCollection />
      <News />
      <Contact />
      <Footer />
    </>
  );
}
