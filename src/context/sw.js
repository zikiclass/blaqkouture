import { useRouter } from "next/navigation";
import { useCart } from "../../contexts/cartContext";

export default function CartContext({ productId, quantity }) {
  const { addToCart } = useCart();
  const router = useRouter;

  const handleAddToCart = () => {
    const productToAdd = {
      productId: productId,
      quantity: quantity,
    };
    addToCart(productToAdd);
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

// Example data fetching (could be replaced with actual data fetching logic)
export async function getServerSideProps(context) {
  const { id } = context.params;
  const product = {
    productId: parseInt(id),
    title: "Sample Product",
    price: 29.99,
  };

  return {
    props: { product },
  };
}
