import React from "react";
import "../css/main_css/MainItem.scss";

const MainItem = (props) => {
  const write_post = () => {
    window.open(props.url, "_blank");
  };

  return (
    <div>
      <li className="blogWrite">
        <h3
          className="blog_title"
          dangerouslySetInnerHTML={{ __html: props.title }}
          onClick={write_post}
        ></h3>
        <img
          className="write_img"
          src={props.thumbnail}
          alt={props.thumbnail}
        />
        <article dangerouslySetInnerHTML={{ __html: props.contents }}></article>
        <br />
        <span dangerouslySetInnerHTML={{ __html: props.blogName }}></span>
        <span>✍🏻{props.dateTime}</span>
        <button onClick={() => props} className="cart_btn">
          장바구니
        </button>
      </li>
      <hr />
    </div>
  );
};

export default MainItem;
