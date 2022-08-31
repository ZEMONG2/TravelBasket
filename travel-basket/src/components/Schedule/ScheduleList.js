import { useEffect } from 'react';
import ScheduleArticle from './ScheduleArticle';
const ScheduleList = ({
  handlePage,
  isActivate,
  setActive,
  pageArr,
  handlelist,
  scheduleList,
}) => {
  /*
        handlePage : 페이지 핸들링 함수
        isActivate, setActive : 페이지 이동 버튼의 css활성화/비활성화에 사용되는 state
        pageArr : 페이지 버튼 구현에 사용되는 페이지 배열 state
        handlelist : 일정 리스트 추출 및 일정 페이징 처리 함수
        scheduleList : 추출된 일정 리스트
    */

  useEffect(() => {
    //로그인되어있다면 일정 리스트를 가져온다.
    //현재는 로그인 확인 처리를 거치지 않고 처리
    handlelist();
  }, []);

  const movePage = (e) => {
    const tag_id = e.target.id; //클릭한 버튼의 태그 아이디

    if (tag_id === 'move2left' || tag_id === 'move2right') {
      //화살표 버튼 이벤트 처리
      handlePage(e);
    } else {
      //페이지 버튼 이벤트 처리
      const pageNo = parseInt(e.target.attributes.getNamedItem('page').value); //클릭한 버튼의 페이지 번호

      //1. 클릭한 버튼 css 변경
      let activeArr = [];
      for (let i = 0; i < isActivate.length; i++) {
        /*
          기본적으로는 false를 넣되 현재 페이지 번호 - 1(배열의 인덱스는 0부터 시작하므로) 에는 true를 넣음
        */
        activeArr[i] = false;
        if (i === pageNo - 1) activeArr[i] = true;
      }
      setActive(activeArr); //여기서 변경사항 반영후 렌더링

      //2. 페이지 이동
      handlePage(e);
    }
  };
  //페이지 버튼 컴포넌트
  const PageButton = (props) => {
    const { page, type, ...other } = props; //전달받은 프로퍼티를 변수화하여 사용(사용되지 않는 프로퍼티는 other로 처리)
    return (
      <button
        className={'btn' + (type === undefined ? '' : ' ' + type)}
        page={page === undefined ? '' : page}
        {...other}
      />
    );
  };

  return (
    <>
      <div className="scheduleWrap">
        {/* 일정 리스트의 동적 구현 */}
        {scheduleList.list.length > 0 ? (
          scheduleList.list.map((schedule, idx) => (
            <ScheduleArticle key={idx} idx={idx} data={schedule} />
          ))
        ) : (
          <div className="noListHere">등록된 일정이 없습니다</div>
        )}
      </div>

      <div className="updownSpace clear" />
      <div className="scheduleListWrap">
        <button className="btn">&lt;&lt;</button>
        <PageButton type="mover" id="move2left" onClick={movePage}>
          &lt;
        </PageButton>
        {/* 페이지 버튼의 동적 구현 */}
        {pageArr.length > 0
          ? pageArr.map((page, idx) => (
              <PageButton
                type={isActivate[idx] === true ? 'activate' : ''}
                page={page}
                key={idx}
                id={idx + 1}
                onClick={movePage}
              >
                {page}
              </PageButton>
            ))
          : ''}
        <PageButton type="mover" id="move2right" onClick={movePage}>
          &gt;
        </PageButton>
        <button className="btn">&gt;&gt;</button>
      </div>
    </>
  );
};
export default ScheduleList;
