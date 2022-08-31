import * as utill from '../../Utils/Utils';
import { useEffect, useState } from 'react';
import { Router, Link, NavLink } from 'react-router-dom';

const ScheduleArticle = ({ data, idx }) => {
  const [dayLabel, setState] = useState('');
  useEffect(() => {
    //console.log(data);
    const arr = data.SCHEDULE_DAY.split(',');
    const dayLableStr = arr[0] + ' ~ ' + arr[arr.length - 1];
    setState(dayLableStr);
  });
  // idx는 추후 일정 상세 보기에서 데이터 조회에 사용해야함
  /*
    data : 디비에서 조회한 일정 데이터(row 단위)
    idx : 일정 데이터의 목차(tb_schedule.schedule_idx)
  */
  //const src = utill.thumbnailSrc()[0];
  return (
    <>
      {/* 혹시 idx로 컨트롤해야할 수도 있을지 몰라서 추가 */}
      <div className={`mySchedule ${data.SCHEDULE_IDX}`}>
        <div className="img">
          {/* 추후 페이지 이동 경로 추가 */}
          <Link
            to={'/myplan'}
            state={{
              schedule_idx: data.SCHEDULE_IDX,
            }}
          >
            {/* 서버에 섬네일 경로를 요청해서 받아옴 */}
            {/* <img src={'http://localhost:8000' + data.THUMBNAIL} alt="" /> */}
            {/* <img src={require('../../img/서울_남산.jpg')} alt="" /> */}
            <img
              className="plan_image"
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
            }}
          >
            <p className="dayLabel">{dayLabel}</p>
            <p className="scheduleLabel">{data.SCHEDULE_TITLE}</p>
          </Link>
        </div>
      </div>
    </>
  );
  //}
};
export default ScheduleArticle;
