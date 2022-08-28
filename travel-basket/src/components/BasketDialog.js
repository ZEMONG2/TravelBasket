import React, { useEffect } from 'react';
import './header_css/BasketDialog.scss';

function BasketDialog(props) {
  // 모달창 활성화 시 스크롤 방지 코드
  // useEffect(() => {
  //   document.body.style.cssText = `
  //     position: fixed;
  //     top: -${window.scrollY}px;
  //     overflow-y: scroll;
  //     width: 100%;`;
  //   return () => {
  //     const scrollY = document.body.style.top;
  //     document.body.style.cssText = '';
  //     window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  //   };
  // }, []);

  function closeModal() {
    props.closeModal();
  }

  return (
    <div className="BasketModal" onClick={closeModal}>
      <div className="BasketmodalBody" onClick={(e) => e.stopPropagation()}>
        <button className="BasketmodalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        {props.children}
      </div>
    </div>
  );
}

export default BasketDialog;
