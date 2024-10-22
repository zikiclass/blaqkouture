import styles from "./trendingproducts/style.module.css";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import img1 from "../image/defaultimg.jpg";
import { useCart } from "@/context/cartContext";
import toast, { Toaster } from "react-hot-toast";

export default function Product({ sale, img, amt, prevAmt, title, productId }) {
  const router = useRouter();
  const { cart, addToCart } = useCart();

  const handleClick = (productId, sale) => {
    if (sale !== "0") {
      router.push(`/product?id=${productId}`);
    }
  };

  const NumberWithCommas = ({ numberString }) => {
    const number = Number(numberString);
    const formattedNumber = number.toLocaleString();
    return <span>{formattedNumber}</span>;
  };

  const getCloudinaryUrl = (publicId) => {
    const cloudinaryBaseUrl =
      "https://res.cloudinary.com/dd0yi5utp/image/upload/v1729430075/";
    return `${cloudinaryBaseUrl}${publicId}`;
  };

  const handleAddToCart = () => {
    const productToAdd = {
      productId,
      title,
      price: amt,
      img,
      quantity: 1,
    };
    addToCart(productToAdd);
    toast.success("Product added to cart successfully");
  };

  // Check if the product is already in the cart
  const isProductInCart = cart.some((item) => item.productId === productId);

  return (
    <div className={styles.row}>
      <Toaster position="top-right" />
      {!img ? (
        <Image
          src={img1}
          width={150}
          height={150}
          className={styles.img}
          alt="img"
          onClick={() => handleClick(productId, sale)}
        />
      ) : (
        <CldImage
          src={getCloudinaryUrl(img)}
          width={150}
          height={150}
          className={styles.img}
          alt="img"
          onClick={() => handleClick(productId, sale)}
        />
      )}

      <div className={styles.producttext}>
        {sale === "0" && <h5>Out of Stock</h5>}
        {sale !== "0" && !isProductInCart && (
          <BsCart3 className={styles.cart} />
        )}
      </div>

      {sale !== "0" &&
        (!isProductInCart ? (
          <div className={styles.addtocart} onClick={handleAddToCart}>
            <FaShoppingCart />
            Add to Cart
          </div>
        ) : (
          <div className={styles.addtocart_}>
            <span>Added to Cart</span>
          </div>
        ))}
      <div className={styles.ratting} onClick={() => handleClick(productId)}>
        <FaStar className={styles.ratestar} />
        <FaStar className={styles.ratestar} />
        <FaStar className={styles.ratestar} />
        <FaStar className={styles.ratestar} />
        <FaStarHalfAlt className={styles.ratestar} />
      </div>
      <div className={styles.price} onClick={() => handleClick(productId)}>
        <h4 onClick={() => handleClick(productId)}>
          {title || "Blaq Kouture"}
        </h4>
        <p onClick={() => handleClick(productId)}>
          <span className={styles.priceSpan}>
            ₦<NumberWithCommas numberString={amt} />
          </span>{" "}
          <span className={styles.overpriceSpan}>
            ₦<NumberWithCommas numberString={prevAmt} />
          </span>
        </p>
      </div>
    </div>
  );
}
