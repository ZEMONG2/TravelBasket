import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { Tabs, TabContent, TabLink } from 'react-tabs-redux';
import * as List from './ReviewList';
import './board_css/LikeStorage.scss';

const LikeStorage = () => {
  const navigate = useNavigate();
  const sessionIdx = window.sessionStorage.getItem('USER_IDX');

  // 후기게시판용 변수
  const [likelist, setLikelist] = useState([]);
  const [likeSlice, setLikeSlice] = useState(10);
  const [page, setPage] = useState(1);

  var countLA = likelist.length;
  var likeIdx = countLA - (page - 1) * likeSlice;


  // 일정게시판용 변수
  const [likelist2, setLikelist2] = useState([]);
  const [likeSlice2, setLikeSlice2] = useState(10);
  const [page2, setPage2] = useState(1);

  var countLA2 = likelist2.length;
  var likeIdx2 = countLA2 - (page2 - 1) * likeSlice2;


  useEffect(() => {
    getLikeList();
    getLikeList2();
  }, []);

  // 좋아요 누른 후기게시판 게시물 가져오기
  const getLikeList = () => {
    axios
      .post("http://localhost:8000/storage/like/review", { sessionIdx })
      .then((res) => {
        console.log(res.data)
        setLikelist(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handlePage = (page, page2) => {
    setPage(page);
    setPage2(page2);
  };


  // 좋아요 누른 일정공유게시판 게시물 가져오기
  const getLikeList2 = () => {
    axios
      .post("http://localhost:8000/storage/like/schedule", {sessionIdx})
      .then((res) => {
        console.log(res);
        setLikelist2(res.data);
      })
      .catch((e) => {console.error(e);});
  };

 
    return (
      <div className="LikeStorage">
        <h1>좋아요 보관함</h1>

        <div className="storageSort">
          <Tabs renderActiveTabContentOnly={true}>
            <ul>
              <li className="storageTab">
                <TabLink to="like_Review" default>후기 게시판</TabLink>
              </li>
              <li className="storageTab">
                <TabLink to="like_Schedule">일정 공유 게시판</TabLink>
              </li>
            </ul>

            <div className="storageTab_content">
              {likelist.length == 0 ? (              
                <TabContent for="like_Review">
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
                        <td colSpan="4"><p className="NoList">좋아요 누른 게시물이 없습니다.</p></td>
                      </tbody>
                    </table>
                  </div>                
                </TabContent>
              ) : (
              <TabContent for="like_Review">
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
              </TabContent>
              )}
              
              {likelist2.length == 0 ? (
                <TabContent for="like_Schedule">
                  <div>
                    <p className="LikeList_count">총 {countLA2} 개</p>
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
                        <td colSpan="4"><p className="NoList">좋아요 누른 게시물이 없습니다.</p></td>
                      </tbody>
                    </table>
                  </div>
                </TabContent>
              ) : (
                <TabContent for="like_Schedule">
                  <div>
                    <p className="LikeList_count">총 {countLA2} 개</p>
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
                        {likelist2
                          .slice(likeSlice2 * (page2 - 1), likeSlice2 * (page2 - 1) + likeSlice2)
                          .map((likelist2) => {
                            return (
                              <tr>
                                <td>{likeIdx2--}</td>
                                <td className="storageTitle">
                                  <Link to={'/myplan'} state={{schedule_idx: likelist2.SCHEDULE_IDX, user_id: likelist2.USER_ID}}>
                                    {likelist2.SCHEDULE_TITLE}
                                  </Link>
                                </td>
                                <td>{likelist2.USER_NICK}</td>
                                <td>
                                  {
                                    List.reviewTime(likelist2.SCHEDULE_DATE)
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
                    activePage={page2}
                    itemCountPerPage={likeSlice2}
                    totalItemsCount={likelist2.length}
                    firstPageText={'<<'}
                    prevPageText={'<'}
                    nextPageText={'>'}
                    lastPageText={'>>'}
                    onChange={handlePage}
                  /> 
                </TabContent>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    );

};

export default LikeStorage;
