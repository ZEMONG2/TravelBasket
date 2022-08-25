import React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useDrag, useDrop } from 'react-dnd';
const List = () => {
  const testarr = [
    { idx: 1, name: 'aaa' },
    { idx: 2, name: 'bbb' },
    { idx: 3, name: 'ccc' },
    { idx: 4, name: 'ddd' },
  ];
  const divStyle = {
    border: '1px solid black',
    fontSize: '15px',
    width: '100%',
    height: '50px',
  };
  const wrapStyle = {
    width: '400px',
    height: '220px',
    margin: '0 auto',
  };

  //isdragging : 드래그중일때 true 아닐때 false
  //dragRef : ref처럼 쓰면됨
  //previewRef : 드래깅중에 보여주는 이미지
  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({}));

  return (
    <>
      <div style={wrapStyle}>
        {testarr.map((val, idx) => (
          <div key={idx} style={divStyle}>
            idx : {val.idx}
            name : {val.name}
          </div>
        ))}
      </div>
    </>
  );
};
export default List;
