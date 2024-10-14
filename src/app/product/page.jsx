"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Contact from "@/components/contact/page";
import Footer from "@/components/footer/page";
import TrendingProducts from "@/components/trendingproducts/page";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import img from "../../image/a28f3b1c-00be-4f69-be0f-f916a31d8bf1 2.JPG";
import img2 from "../../image/541e2a4e-64a2-45f5-8180-8be9abe2ce08 2.JPG";
import img3 from "../../image/9f8f2ef2-6cc7-4bfe-96e6-52c88302afaa 2.JPG";
import Product from "@/components/product";
import { FaMinus } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loader from "@/components/Loader";
import Header from "@/components/header/page";

export default function ProductView() {
  const [productDetails, setProductDetails] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [size, setSize] = useState(false);

  const [counter, setCounter] = useState(1);
  const images = [img, img2, img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevSlide = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
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
                      <Image
                        src={imgSrc}
                        alt={`Image ${index + 1}`}
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
                <h4>T-Shirt Blaq Kouture</h4>
                <span>
                  ₦ 58,000 <span>₦ 78,000</span>
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
                      {productDetails && (
                        <p>
                          THE HF PANEL CAP IS A STRUCTURED CAMPER STYLE CAP WITH
                          A FIRM FLAT BRIM, PERFECT FOR ADDING A TOUCH OF URBAN
                          FLAIR LOOK. WITH ITS ADJUSTABLE DRAWSTRING AT THE
                          BACK, YOU CAN CUSTOMIZE THE FIT FOR MAXIMUM COMFORT.
                        </p>
                      )}
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
                    <div className={styles.col} onClick={() => setSize(!size)}>
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
                AVAILABILITY: <span>5 IN STOCK</span>
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
                <button onClick={() => setCounter(counter + 1)}>
                  <FaPlus />
                </button>
              </div>
              <button className={styles.cart}>add to cart</button>
              <p>this product pairs well with:</p>
              <Product img={img} />
            </div>
          </section>
          <TrendingProducts />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
}
