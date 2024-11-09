"use client";
import { useState, useEffect, Suspense } from "react";
import styles from "./style.module.css";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import TrendingProducts from "@/components/trendingproducts/page";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import img1 from "../../image/defaultimg.jpg";
import Product from "@/components/product";
import { FaMinus } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loader from "@/components/Loader";
import Header from "@/components/header/page";
import SearchParamsWrapper from "../blaq_/admin/components/suspensewrap";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import UniqueProduct from "@/components/uniqueproducts/page";
export default function ProductView() {
  const [id, setId] = useState(null);
  const [productDetails, setProductDetails] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [size, setSize] = useState(false);
  const [uniqueProduct, setUniqueProduct] = useState({});
  const [pro, setPro] = useState({});
  const [counter, setCounter] = useState(1);
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { cart, addToCart } = useCart();
  const handlePrevSlide = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const getUniqueProduct = async () => {
      try {
        const response = await axios.get(
          `/api/product/uniqueproduct?productId=${id}`
        );
        if (response.data) {
          setUniqueProduct(response.data);
          setNewId(response.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getUniqueProduct();
  }, [id]);

  useEffect(() => {
    if (uniqueProduct && uniqueProduct.associatedWith) {
      const getAssociatedProduct = async () => {
        try {
          const response = await axios.get(
            `/api/product/uniqueproduct?productId=${uniqueProduct.associatedWith}`
          );
          if (response.data) {
            setPro(response.data);
          }
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };

      getAssociatedProduct();
    }
  }, [uniqueProduct]);
  const NumberWithCommas = ({ numberString }) => {
    const number = Number(numberString);
    const formattedNumber = number.toLocaleString();
    return <span>₦ {formattedNumber}</span>;
  };

  const getCloudinaryUrl = (publicId) => {
    const cloudinaryBaseUrl =
      "https://res.cloudinary.com/dd0yi5utp/image/upload/v1729430075/";
    return `${cloudinaryBaseUrl}${publicId}`;
  };

  const images = [
    uniqueProduct.img1 && getCloudinaryUrl(uniqueProduct.img1),
    uniqueProduct.img2 && getCloudinaryUrl(uniqueProduct.img2),
    uniqueProduct.img3 && getCloudinaryUrl(uniqueProduct.img3),
  ].filter(Boolean);

  const handleAddToCart = () => {
    const productToAdd = {
      productId: id,
      title: uniqueProduct.title,
      price: uniqueProduct.price,
      img: uniqueProduct.img1,
      quantity: counter,
    };

    addToCart(productToAdd);
    router.push("/cart");
  };
  return (
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <SearchParamsWrapper>
          {(id) => {
            setId(id);
            return (
              <section className={styles.product}>
                <div className={styles.imgs}>
                  <IoIosArrowBack
                    onClick={handlePrevSlide}
                    className={styles.arrow}
                  />
                  <div className={styles.carousel}>
                    <div
                      className={styles.carouselInner}
                      style={{
                        transform: `translateX(-${currentImageIndex * 100}%)`,
                      }}
                    >
                      {images.map((imgSrc, index) => (
                        <div key={index} className={styles.carouselSlide}>
                          <CldImage
                            src={imgSrc}
                            alt="Blaq Kouture"
                            className={styles.carouselImage}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <IoIosArrowForward
                    onClick={handleNextSlide}
                    className={styles.arrow}
                  />
                </div>

                <div className={styles.productdetails}>
                  <div className={styles.prod}>
                    <h4>{uniqueProduct.title}</h4>
                    <span className={styles.prod_price}>
                      {uniqueProduct.price ? (
                        <NumberWithCommas numberString={uniqueProduct.price} />
                      ) : (
                        "₦ ..."
                      )}{" "}
                      <span className={styles.prod_overprice}>
                        {uniqueProduct.overprice && (
                          <NumberWithCommas
                            numberString={uniqueProduct.overprice}
                          />
                        )}
                      </span>
                    </span>
                    <div className={styles.productdetail}>
                      <div>
                        <div
                          className={styles.col}
                          onClick={() => setProductDetails(!productDetails)}
                        >
                          <div>
                            <h2>product details</h2>
                            {productDetails ? (
                              <FaMinus className={styles.plus} />
                            ) : (
                              <FaPlus className={styles.plus} />
                            )}
                          </div>
                          {productDetails && <p>{uniqueProduct.details}</p>}
                        </div>
                      </div>
                      <div>
                        <div
                          className={styles.col}
                          onClick={() => setShipping(!shipping)}
                        >
                          <div>
                            <h2>shipping & returns</h2>
                            {shipping ? (
                              <FaMinus className={styles.plus} />
                            ) : (
                              <FaPlus className={styles.plus} />
                            )}
                          </div>
                          {shipping && (
                            <ul>
                              <li>- Standard Shipping 6 working days</li>
                              <li>- Express Shipping 3-4 working days</li>
                              <li>- Free returns in 30 days</li>
                            </ul>
                          )}
                        </div>
                      </div>
                      <div>
                        <div
                          className={styles.col}
                          onClick={() => setSize(!size)}
                        >
                          <div>
                            <h2>size guide</h2>
                            {size ? (
                              <FaMinus className={styles.plus} />
                            ) : (
                              <FaPlus className={styles.plus} />
                            )}
                          </div>
                          {size && (
                            <div className={styles.table}>
                              <table>
                                <thead>
                                  <th>size</th>
                                  <th>xs</th>
                                  <th>s</th>
                                  <th>m</th>
                                  <th>l</th>
                                  <th>xl</th>
                                  <th>xxl</th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>body length</td>
                                    <td>27</td>
                                    <td>28</td>
                                    <td>29</td>
                                    <td>30</td>
                                    <td>31¾</td>
                                    <td>32¾</td>
                                  </tr>
                                  <tr>
                                    <td>chest</td>
                                    <td>21</td>
                                    <td>22</td>
                                    <td>23</td>
                                    <td>24</td>
                                    <td>25¾</td>
                                    <td>27½</td>
                                  </tr>
                                  <tr>
                                    <td>sleeve length</td>
                                    <td>32</td>
                                    <td>33</td>
                                    <td>34</td>
                                    <td>35</td>
                                    <td>36</td>
                                    <td>37</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.addtocart}>
                  <select name="size">
                    <option value="select size">select size</option>
                    <option value="one size fits all">one size fits all</option>
                  </select>
                  <span className={styles.availability}>
                    AVAILABILITY:{" "}
                    <span>{uniqueProduct.stockquantity} IN STOCK</span>
                  </span>
                  <div className={styles.quantity}>
                    <button
                      onClick={() => {
                        if (counter > 1) setCounter(counter - 1);
                      }}
                    >
                      <FaMinus />
                    </button>
                    <div>{counter}</div>
                    <button
                      onClick={() => {
                        if (counter < parseInt(uniqueProduct.stockquantity))
                          setCounter(counter + 1);
                      }}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button className={styles.cart} onClick={handleAddToCart}>
                    add to cart
                  </button>
                  {uniqueProduct.associatedWith !== "-" && (
                    <>
                      <p>this product pairs well with:</p>

                      <Product
                        img={pro.img1}
                        key={pro.productId}
                        amt={pro.price}
                        title={pro.title}
                        prevAmt={pro.overprice}
                        sale={pro.stockquantity}
                        productId={pro.productId}
                      />
                    </>
                  )}
                </div>
              </section>
            );
          }}
        </SearchParamsWrapper>
      </Suspense>
      <UniqueProduct title="All" />
      <Contact />
      <Footer />
    </>
    //   )}
    // </>
  );
}
