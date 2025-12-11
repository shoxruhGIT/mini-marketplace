import { useEffect, useState } from "react";
import CartList from "./components/cart-list";

const App = () => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("product");
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("product", JSON.stringify(items));
    } catch (error) {
      console.log(error);
    }
  }, [items]);

  useEffect(() => {
    const handleAddToCart = (event) => {
      const product = event.detail;
      setItems((prev) => {
        const exists = prev.find((item) => item.id === product.id);
        if (exists) {
          return prev;
        }
        return [...prev, product];
      });
    };

    window.addEventListener("addToCart", handleAddToCart);
    return () => window.removeEventListener("addToCart", handleAddToCart);
  }, []);

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-section">
      <h2>
        Your Cart
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </h2>

      <CartList
        items={items}
        handleRemove={handleRemove}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default App;
