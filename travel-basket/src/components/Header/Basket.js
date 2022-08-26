import {
  MdLocalGroceryStore,
  MdLocalHotel,
  MdLocalCafe,
  MdLocalDining,
  MdLocalActivity,
} from 'react-icons/md';
import '../Header/header_css/Basket.scss';

const Basket = () => {
  return (
    <>
      <div>
        <h1>나의 장바구니</h1>
        <MdLocalGroceryStore className="basket" />
        <h3 className="bin_basket">장바구니에 담긴 장소가 없습니다.</h3>
      </div>
      <button>
        <MdLocalHotel className="hotel" />
      </button>
      <button>
        <MdLocalCafe className="cafe" />
      </button>
      <button>
        <MdLocalDining className="dining" />
      </button>
      <button>
        <MdLocalActivity className="activity" />
      </button>
    </>
  );
};

export default Basket;
