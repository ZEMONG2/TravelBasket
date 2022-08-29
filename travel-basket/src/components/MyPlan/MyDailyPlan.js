import { useState } from 'react';
import { MdRadioButtonChecked } from 'react-icons/md';
const MyDailyPlan = ({ viewData }) => {
  const category = ['관광지', '숙박', '맛집', '카페', '기타'];
  const [checkDay, setDay] = useState('');
  var checkday = '';
  return (
    <>
      {viewData &&
        viewData.map(
          (
            days,
            idx, //n일차루프
          ) => (
            <div key={'loop' + idx} className="daillyMemoMain">
              <div className="dailyHeader">{days.day}</div>

              {days &&
                days.data.map(
                  (cate, idx2) =>
                    cate.plan.length > 0 &&
                    cate.plan.map((data, idx3) => (
                      <div
                        key={'plan' + idx3}
                        className={
                          idx3 > 0 ? 'dailyBody duplicate' : 'dailyBody'
                        }
                      >
                        <div
                          className={
                            idx3 > 0 ? 'dailyCate duplicate_cate' : 'dailyCate'
                          }
                        >
                          <div className="dailyCateBody">
                            <div className="dailyicon">
                              <MdRadioButtonChecked size={25} />
                            </div>
                            <div className="dailyCateText">
                              {category[cate.category - 1]}
                            </div>
                          </div>
                        </div>
                        <div key={'memo' + idx3} className="dailyMemoWrap">
                          <div className="dailyMemoMain">
                            <div className="placeName"> {data.place_name}</div>
                            &nbsp;|&nbsp;
                            {data.memo_title}
                            {/* 
                            더보기로 상세메모 열고 닫으려고 했는데 굳이 없어도 될듯?
                            <button className="dailyMemoBtn">더보기</button> 
                            */}
                          </div>
                          <div className="dailyMemoDetail">
                            {data.memo_memo}
                          </div>
                        </div>
                      </div>
                    )),
                )}
              <div className="clear" />
              <div className="updownSpace" />
            </div>
          ),
        )}
    </>
  );
};
export default MyDailyPlan;
