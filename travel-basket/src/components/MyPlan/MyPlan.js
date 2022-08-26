import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as utill from '../../Utils/Utils';
import PlanMap from '../Plan/container/PlanMap';
import './myPlan.css';

const MyPlan = () => {
  const location = useLocation();
  useEffect(() => {
    const myplan = utill.getMyPlan(
      window.sessionStorage.getItem('USER_ID'),
      location.state.schedule_idx,
    );
  });
  return (
    <div className="myPlanBody">
      <div className="myPlanBtnWrap">
        <button className="btnMyplan" id="updateMyplan">
          전체수정
        </button>
        <button className="btnMyplan" id="deleteThisPlan">
          삭제
        </button>
      </div>
      <div className="myPlanTitle">
        <p id="planTitle">2박 3일 여름 제주도 휴가</p>
        <p id="planRange">2022.08.13 ~ 2022.08.15</p>
      </div>
      <div>
        <div className="halfGrid" id="daysSelecterWrap">
          <select id="daySelecter">
            <option>1일차</option>
          </select>
        </div>
        <div className="halfGrid" id="writerWrap">
          <span>작성자 : 누구누구</span>
          <br />
          <span>작성일 : 2022.08.12</span>
        </div>
        <div className="clear" />
      </div>
      <div className="myMap">
        {/* <PlanMap markerlist={[]} pointsList ={[]}/> */}
      </div>
      <div>
        <div>카테고리 제주공항 타이틀</div>
        <div>메모</div>
      </div>
    </div>
  );
};
export default MyPlan;
