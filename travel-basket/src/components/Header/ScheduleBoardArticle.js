import { Link } from 'react-router-dom';
import * as utill from '../../Utils/Utils';
const ScheduleBoardArticle = ({ idx, data }) => {
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

            <div className="sc_board_nick">{data.USER_IDX}</div>
          </Link>

          <div className="sc_board_etc">
            ❤️{10} 👁️‍🗨️{0} <span className="whendidIMaid">몇일전</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ScheduleBoardArticle;
