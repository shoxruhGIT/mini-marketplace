import CartItem from "./cart-item";

export default function CartList({
  items,
  handleRemove,
  totalItems,
  totalPrice,
}) {
  return (
    <>
      {items?.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <p style={{ fontSize: "0.9rem", marginTop: "8px" }}>
            Add products to get started!
          </p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items?.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <span className="cart-total-label">
                Total ({totalItems} items):
              </span>
              <span className="cart-total-value">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </>
  );
}
