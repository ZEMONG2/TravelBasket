import Slider from 'react-slick';
import './HowToUse.css';
const HowToUse = () => {
  const settings = {
    // 슬라이드 기본 제공 코드 함수형으로 전환
    arrow: true, // 화살표 표시
    dots: false, // 밑에 현재 페이지와 나머지 페이지 점으로 표시
    infinite: true, // 무한 반복
    speed: 500, // 넘기는 속도
    slidesToShow: 1, // 슬라이드에 보여지는 아이템 개수
    slidesToScroll: 1, // 슬라이드 넘기는 아이템 개수
    vertical: false, // 스크롤 가로세로 모드 온오프
    autoplay: true, // 자동 재생
    autoplaySpeed: 3000, // 자동 재생 속도
    centerMode: true,
    centerPadding: '0px', // 0px = 슬라이드 끝쪽 이미지 안잘림
    // cssEase: "linear",
  };

  return (
    <div>
      <div>
        <h2>세 단계로 간단하게 알아보는 나만의 여행 플래닝</h2>
      </div>
      <div className="updownSpace" />
      <div className="updownSpace" />
      <div className="howtoUseBody">
        <div className="explainTxt">
          <h3>1. 어디로 가볼까?</h3>
          <br />
          <p>
            메인 화면에서는 현재 화제가 되어있는 각 지역별 관광지, 맛집, 축제
            등을 소개해주고 있어요! <br /> <br />
            무엇을 할지 고민중이시라면 여기서 참고해보시는건 어떨까요? <br />
            <br />
            마음에 드는 키워드는 내 장바구니에 저장할수있어요! <br />
          </p>
        </div>
        <div className="explainImg">
          <Slider {...settings}>
            <img className="explain_img" src="/img/howtouse/메인.png" alt="" />
            <img
              className="explain_img"
              src="/img/howtouse/메인_검색.png"
              alt=""
            />
            <img
              className="explain_img"
              src="/img/howtouse/메인_장바구니담기.png"
              alt=""
            />
          </Slider>
        </div>
        <div className="clear" />
      </div>
      <div className="updownSpace" />
      <div className="updownSpace" />
      <div className="howtoUseBody">
        <div className="explainImg">
          <Slider {...settings}>
            <img
              className="explain_img"
              src="/img/howtouse/일정만들기.png"
              alt=""
            />
            <img
              className="explain_img"
              src="/img/howtouse/일정만들기_장소검색.png"
              alt=""
            />
            <img
              className="explain_img"
              src="/img/howtouse/일정만들기_메모.png"
              alt=""
            />
            <img
              className="explain_img"
              src="/img/howtouse/내 일정 보관함.png"
              alt=""
            />
            <img
              className="explain_img"
              src="/img/howtouse/일정만들기.png"
              alt=""
            />
            <img
              className="explain_img"
              src="/img/howtouse/내 일정 상세.png"
              alt=""
            />
          </Slider>
        </div>
        <div className="explainTxt">
          <h3 className="txt_right">2. 나만의 여행 일정 만들기</h3>
          <br />
          <p className="txt_right">
            이제 나만의 여행 플랜을 만들어 볼까요? <br />
            <br />
            제목을 지어주고 가고싶은 지역과 날짜를 선택해보세요. <br />
            누구와 함께 가는지, 어떻게 이동할것인지도 기록할 수 있다면 더
            좋겠죠?
            <br /> 마지막으로 가고싶은 장소와 메모를 적은 후에 저장하면 완료!
            <br />
            저장한 내 일정은 오른쪽 상단 아이콘을 클릭하면 나타나는 "내 일정
            보관함" 에서 확인할 수 있어요!
          </p>
        </div>
        <div className="clear" />
      </div>
      <div className="updownSpace" />
      <div className="updownSpace" />
      <div className="updownSpace" />
      <div className="updownSpace" />
      <div className="howtoUseBody">
        <div className="explainTxt">
          <h3>3. 여행을 기록하고 공유하기</h3>
          <br />
          <p>
            내가 만든 일정은 "일정 공유 게시판" 에서 회원들과 공유할 수 있어요!
            <br /> <br />
            다른 회원들이 공유하는 일정도 보면서 내 여행 플랜을 짜는데
            참고해볼까요? <br />
            후기 게시판에서 다른 회원들의 여행 후기도 볼 수 있어요! <br />{' '}
            <br />
            자, 이제 우리만의 여행을 만들어볼까요?
          </p>
        </div>

        <div className="explainImg">
          <Slider {...settings}>
            <img
              className="explain_img"
              src="/img/howtouse/일정공유게시판.png"
              alt=""
            />
            <img
              className="explain_img"
              src="/img/howtouse/후기게시판.png"
              alt=""
            />
          </Slider>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};
export default HowToUse;
