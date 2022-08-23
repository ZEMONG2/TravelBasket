import {
  MdLocalGroceryStore,
  MdLocalHotel,
  MdLocalCafe,
  MdLocalDining,
  MdLocalActivity,
} from "react-icons/md";
import "../css/Basket.scss";

const Basket = () => {
  return (
    <>
      <div>
        <h1>나의 장바구니</h1>
        <MdLocalGroceryStore className="basket" />
        <h3>장바구니에 담긴 장소가 없습니다.</h3>
      </div>
      <button>
        <MdLocalHotel />
      </button>
      <button>
        <MdLocalCafe />
      </button>
      <button>
        <MdLocalDining />
      </button>
      <button>
        <MdLocalActivity />
      </button>
    </>
  );
};

export default Basket;
