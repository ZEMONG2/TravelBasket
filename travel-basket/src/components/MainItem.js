import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
// import { Cart } from "./";

// 보관함 추가 CSS
const Mainitem = styled.div`
  .Cart_btn {
    border-radius: 1px;
    padding: 3px;
  }
`;

const MainItem = (props) => {
  // const dispatch = useDispatch();

  return (
    <Mainitem>
      <li>
        <dl>
          <dt>
            <img src={props.thumbnail} alt={props.thumbnail} />
          </dt>
          <dd>
            <h3 dangerouslySetInnerHTML={{ __html: props.title }}></h3>
            <p dangerouslySetInnerHTML={{ __html: props.blogname }}></p>
            <article
              dangerouslySetInnerHTML={{ __html: props.contents }}
            ></article>
            <a href={props.url}>포스팅 바로가기</a>
            <p>{props.datetime}</p>
          </dd>
          <button type="button" onClick={() => props} className="Cart_btn">
            + 보관함 추가
          </button>
        </dl>
      </li>
    </Mainitem>
  );
};

// dangerouslySetInnerHTML={{ __html: props.code }} = 검색어에 html 태그 포함현상 제거

export default MainItem;

// dispatch(Cart(props))

{
  /* <button onClick={() => dispatch(props)} className="Cart_btn">
            <p className="Carts">장바구니 담기</p>
            </button> */
}
