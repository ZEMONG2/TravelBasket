import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as utill from '../../Utils/Utils';
import PlanMapForMyPlan from '../Plan/container/PlanMapForMyPlan';
import MyDailyPlan from './MyDailyPlan';
import TypeContainer from '../Plan/container/TypeContainer';
import './myPlan.css';

const MyPlan = () => {
  const location = useLocation();
  const [point, setPoint] = useState([]);
  //const selecterRef = useRef();
  // const handlePoints = () => {
  //   const select = selecterRef.current.value;
  //   setPoint(article.points[select]);
  // };

  const transport = ['도보', '자전거', '오토바이', '대중교통', '자동차']; //교통수단
  const trip_type = ['나혼자', '친구', '연인', '가족', '반려동물']; //여행타입
  const plan_or_trans = ['타입', '교통'];
  const [article, setArticle] = useState({
    user_id: '',
    user_nick: '',
    //write_date: '',
    schedule: {
      SCHEDULE_DAY: '',
      SCHEDULE_OX: '',
      SCHEDULE_PLACE: '',
      SCHEDULE_PLAN: '',
      SCHEDULE_TITLE: '',
      SCHEDULE_TOGETHER: [],
      SCHEDULE_VEHICLE: [],
      USER_IDX: 1,
      dayList: [],
      points: [],
    },
    points: [utill.cityPoints[0]],
    dayList: [
      {
        noEditted: true,
        area: [
          {
            address_name: '',
            category_name: '',
            place_name: '',
            place_url: '',
            road_address_name: '',
            x: '',
            y: '',
          },
        ],
        day: '1일차',
        memo: [
          {
            category: 0,
            memo: '',
            title: '',
          },
        ],
      },
    ],
    viewData: [{ day: '1일차', data: [] }],
  });
  useEffect(() => {
    const user_id = location.state.user_id
      ? location.state.user_id
      : window.sessionStorage.getItem('USER_ID');
    fetch('http://localhost:8000/getMyPlan', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        user_id: user_id,
        schedule_idx: location.state.schedule_idx,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        return JSON.stringify(json);
      })
      .then((jsonStr) => {
        setArticle(utill.getMyPlan2(jsonStr));
      });
  }, []);

  const deleteThisPlan = async () => {
    await axios
      .post('http://localhost:8000/deletePlan', {
        schedule_idx: location.state.schedule_idx,
      })
      .then((res) => {
        const { data } = res;
        if (data === 'success') {
          alert('일정이 삭제되었습니다! 메인페이지로 이동합니다.');
          window.location.href = './';
        } else {
          alert('일정을 삭제할 수 없습니다! 고객센터에 문의해주세요!');
        }
      })
      .catch((e) => {
        console.error(e);
      });
    return;
  };

  return (
    <div className="myPlanBody">
      <div className="myPlanBtnWrap">
        {window.sessionStorage.getItem('USER_ID') === article.user_id ? (
          <>
            <Link
              to={'/makeplan'}
              state={{
                mode: 'upate',
                data: article,
                schedule_idx: location.state.schedule_idx,
              }}
            >
              <button className="btnMyplan" id="updateMyplan">
                수정
              </button>
            </Link>
            <button
              className="btnMyplan"
              id="deleteThisPlan"
              onClick={deleteThisPlan}
            >
              삭제
            </button>
          </>
        ) : (
          <button>좋아요</button>
        )}
      </div>
      <div className="myPlanTitle">
        <p id="planTitle">{article.schedule.SCHEDULE_TITLE}</p>
        <p id="planRange">
          {article.schedule.SCHEDULE_DAY[0] +
            ' ~ ' +
            article.schedule.SCHEDULE_DAY[
              article.schedule.SCHEDULE_DAY.length - 1
            ]}
        </p>
      </div>
      <div>
        <div className="halfGrid" id="daysSelecterWrap">
          {/* <select
            id="daySelecter"
            ref={selecterRef}
            onChange={handlePoints}
            defaultValue={0}
          >
            {article.dayList &&
              article.dayList.map((val, idx) => (
                <option key={idx} value={idx}>
                  {val.day}
                </option>
              ))}
          </select> */}
        </div>
        <div className="halfGrid" id="writerWrap">
          <span>작성자 : {article.user_nick}</span>
          <br />
          <span>작성일 : {article.write_date}</span>
        </div>
        <div className="clear" />
      </div>
      {/* <table className="typeTable">
        <tbody>
          <tr>
            <td>타입</td>
            <td>
              {trip_type.map((val, idx) => (
                <TypeContainer
                  key={idx}
                  type={plan_or_trans[0]} //여행 타입인지 이동수단인지를 전달(여행타입과 이동수단이 같은 컨테이너를 사용)
                  val={val} //여행타입
                  idx={idx} //선택시 데이터 처리를 위한 인덱스
                  selected={
                    article.schedule.SCHEDULE_TOGETHER.indexOf(val) !== -1
                      ? true
                      : false
                  } //선택시 css 처리를 위한 속성
                  handleType={''} //버튼 클릭시 발생하는 이벤트
                  isMaking={false}
                />
              ))}
            </td>
          </tr>
          <tr>
            <td>교통수단</td>
            <td>
              {transport.map((val, idx) => (
                <TypeContainer
                  key={idx}
                  type={plan_or_trans[1]} //여행 타입인지 이동수단인지를 전달(여행타입과 이동수단이 같은 컨테이너를 사용)
                  val={val} //이동수단
                  idx={idx} //선택시 데이터 처리를 위한 인덱스
                  selected={
                    article.schedule.SCHEDULE_VEHICLE.indexOf(val) !== -1
                      ? true
                      : false
                  } //선택시 css 처리를 위한 속성
                  handleType={''} //버튼 클릭시 발생하는 이벤트
                  isMaking={false}
                />
              ))}
            </td>
          </tr>
        </tbody>
      </table> */}

      <div className="myMap">
        <PlanMapForMyPlan
          markerlist={article.dayList}
          pointsList={point.length === 0 ? article.points : point}
        />
      </div>
      <div className="updownSpace" />

      <MyDailyPlan viewData={article.viewData} />

      <div className="updownSpace" />
    </div>
  );
};
export default MyPlan;
