import { useState } from 'react';
import { MdRadioButtonChecked } from 'react-icons/md';
import { Accordion, AccordionItem } from 'react-light-accordion';
import './accordion.scss';

const MyDailyPlan = ({ viewData }) => {
  const category = ['숙소', '카페', '식당', '관광', '기타'];
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
              <Accordion atomic={true}>
                <AccordionItem className="dailyHeader" title={days.day}>
                  <div className="AccordionContent">
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
                                  idx3 > 0
                                    ? 'dailyCate duplicate_cate'
                                    : 'dailyCate'
                                }
                              >
                                <div className="dailyCateBody">
                                  {/* <div className="dailyicon">
                              <MdRadioButtonChecked size={25} />
                            </div> */}
                                  <div className="dailyCateText">
                                    {category[cate.category - 1]}
                                  </div>
                                </div>
                              </div>
                              <div
                                key={'memo' + idx3}
                                className="dailyMemoWrap"
                              >
                                <div className="dailyMemoMain">
                                  <div className="place_Name">
                                    {data.place_name}
                                  </div>
                                  {/* &nbsp;|&nbsp;
                            {data.memo_title} */}
                                  {/* 
                            더보기로 상세메모 열고 닫으려고 했는데 굳이 없어도 될듯?
                            <button className="dailyMemoBtn">더보기</button> 
                            */}
                                </div>
                                <div className="dailyMemoDetail">
                                  메모 : {data.memo_memo}
                                </div>
                              </div>
                            </div>
                          )),
                      )}
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          ),
        )}
    </>
  );
};
export default MyDailyPlan;
