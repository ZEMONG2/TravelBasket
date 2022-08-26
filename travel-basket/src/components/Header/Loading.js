import React from 'react';
import '../Header/header_css/Loading.scss';
import Spinner from '../../img/loading.gif';

const Loading = () => {
  return (
    <div className="loading">
      <img className="spinner" src={Spinner} alt="로딩중" />
      <p>잠시만 기다려 주세요.</p>
    </div>
  );
};

export default Loading;
