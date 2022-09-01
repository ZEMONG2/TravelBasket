import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as utill from '../../Utils/Utils';

const ScheduleBoardArticle = ({ idx, data }) => {
  const [time, setTime] = useState('');
  useEffect(() => {
    // var diffDate = new Date() - new Date(Date.parse(data.SCHEDULE_DATE));

    // console.log(Math.abs(diffDate / (1000 * 60 * 60 * 24)));
    var timeArr = data.DATE_DIFF.split(':');
    console.log();
    for (let i = 0; i < timeArr.length; i++) {
      var timeInt = parseInt(timeArr[i]);
      if (i === 0 && timeInt > 0) {
        if (timeInt > 24) {
          setTime(Math.floor(timeInt / 24) + '일 전');
        } else {
          setTime(timeInt + '시간 전');
        }
        break;
      } else if (i === 1 && timeInt > 0) {
        setTime(timeInt + '분 전');
        break;
      } else if (i === 2 && timeInt > 0) {
        setTime(timeInt + '초 전');
        break;
      }
    }
  });
  return (
    <>
      <div className={`scheduleBoard ${idx}`}>
        <div className="">
          {/* 추후 페이지 이동 경로 추가 */}
          <Link
            to={'/myplan'}
            state={{
              schedule_idx: data.SCHEDULE_IDX,
              user_id: data.USER_ID,
            }}
          >
            {/* 서버에 섬네일 경로를 요청해서 받아옴 */}
            {/* <img src={'http://localhost:8000' + data.THUMBNAIL} alt="" /> */}
            {/* <img src={require('../../img/서울_남산.jpg')} alt="" /> */}
            {/* <img src={utill.thumbnailSrc()[data.SCHEDULE_PLACE]} alt="" /> */}
            <img
              className="scheduleBoardImg"
              src={utill.thumbnailSrc()[data.SCHEDULE_PLACE]}
              alt=""
            />
          </Link>
        </div>
        <div className="scheduleDate">
          {/* 추후 페이지 이동 경로 추가 */}
          <Link
            to={'/myplan'}
            state={{
              schedule_idx: data.SCHEDULE_IDX,
              user_id: data.USER_ID,
              //schedule_idx: 0,
            }}
          >
            <div className="sc_board_title">{data.SCHEDULE_TITLE}</div>
            <div className="sc_board_nick">{data.USER_NICK}</div>
            {/* <div className="sc_board_nick">{data.USER_IDX}</div> */}
          </Link>

          <div className="sc_board_etc">
            ❤️{data.SCHEDULE_LIKE} 👁️‍🗨️{data.SCHEDULE_LOOK}{' '}
            <span className="whendidIMaid">{time}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ScheduleBoardArticle;
