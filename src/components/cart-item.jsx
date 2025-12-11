export default function CartItem({ id, title, price, image, onRemove }) {
  return (
    <div className="cart-item">
      <img src={image} alt={title} className="cart-item-image" />
      <div className="cart-item-details">
        <div className="cart-item-title" title={title}>
          {title}
        </div>
        <div className="cart-item-price">${price.toFixed(2)}</div>
      </div>
      <button className="remove-btn" onClick={() => onRemove(id)}>
        Remove
      </button>
    </div>
  );
}
