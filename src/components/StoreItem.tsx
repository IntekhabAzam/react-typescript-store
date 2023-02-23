import { Card, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const { getItemQuantity, increaseCartQuntity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

    const quantity = getItemQuantity(id);
  return (
    <Card>
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-4">{name}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div>
            {quantity === 0 ? (
                <Button className="w-100" onClick={() => increaseCartQuntity(id)}>+ Add To Cart</Button>
            ) : (
                <div className="d-flex flex-column justify-content-center gap-2">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                        <div>
                            <span className="fs-3">{quantity}</span> in cart
                        </div>
                        <Button onClick={() => increaseCartQuntity(id)}>+</Button>
                    </div>
                    <Button variant="danger" onClick={() => removeFromCart(id)}>Remove</Button>
                </div>
            )}
        </div>
      </Card.Body>
    </Card>
  );
}
