const ScheduleArticle = ({ data, idx }) => {
  // idx는 추후 일정 상세 보기에서 데이터 조회에 사용해야함
  /*
    data : 디비에서 조회한 일정 데이터(row 단위)
    idx : 일정 데이터의 목차(tb_schedule.schedule_idx)
  */
  return (
    <>
      {/* 혹시 idx로 컨트롤해야할 수도 있을지 몰라서 추가 */}
      <div className={`mySchedule ${data.SCHEDULE_IDX}`}>
        <div className="img">
          {/* 추후 페이지 이동 경로 추가 */}
          <a href="#!">
            {/* 서버에 섬네일 경로를 요청해서 받아옴 */}
            <img src={"http://localhost:8000" + data.THUMBNAIL} alt="" />
          </a>
        </div>
        <div className="scheduleDate">
          {/* 추후 페이지 이동 경로 추가 */}
          <a href="#!">
            <p className="scheduleLabel">{data.SCHEDULE_TITLE}</p>
          </a>
        </div>
      </div>
    </>
  );
  //}
};
export default ScheduleArticle;
