import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import * as List from './ReviewList';
import './board_css/LikeStorage.scss';

const LikeStorage = () => {
  const navigate = useNavigate();
  const sessionIdx = window.sessionStorage.getItem('USER_IDX');

  const [likelist, setLikelist] = useState([]);
  const [likeSlice, setLikeSlice] = useState(10);
  const [page, setPage] = useState(1);

  var countLA = likelist.length;
  var likeIdx = countLA - (page - 1) * likeSlice;

  useEffect(() => {
    getLikeList();
  }, []);

  // 좋아요 누른 게시물 가져오기
  const getLikeList = () => {
    axios
      .post('http://localhost:8000/storage/like', { sessionIdx })
      .then((res) => {
        setLikelist(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handlePage = (page) => {
    setPage(page);
  };

  return (
    <div className="LikeStorage">
      <h1>좋아요 보관함</h1>

      <div>
        <p className="LikeList_count">총 {countLA} 개</p>
        <table className="LikeTable" border="0" cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th>No.</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성날짜</th>
            </tr>
          </thead>
          <tbody>
            {likelist
              .slice(likeSlice * (page - 1), likeSlice * (page - 1) + likeSlice)
              .map((likelist) => {
                return (
                  <tr>
                    <td>{likeIdx--}</td>
                    <td
                      className="storageTitle"
                      onClick={() =>
                        navigate(`/review/view/${likelist.REVIEW_IDX}`)
                      }
                    >
                      {likelist.REVIEW_TITLE}
                    </td>
                    <td>{likelist.USER_NICK}</td>
                    <td>
                      {
                        List.reviewTime(likelist.REVIEW_DATE)
                          .toString()
                          .split('T')[0]
                      }
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <Pagination
        activePage={page}
        itemCountPerPage={likeSlice}
        totalItemsCount={likelist.length}
        firstPageText={'<<'}
        prevPageText={'<'}
        nextPageText={'>'}
        lastPageText={'>>'}
        onChange={handlePage}
      />
    </div>
  );
};

export default LikeStorage;
