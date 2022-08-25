const {
  RenderAfterNavermapsLoaded,
  NaverMap,
  Marker,
} = require('react-naver-maps');
/* 카카오 api로 검색 선향하면서 유기 */
const NaverPlanMap = () => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={'359ggltjid'}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMap
        mapDivId={'react-naver-map'}
        style={{
          width: '100%',
          height: '100%',
        }}
        defaultCenter={{ lat: 37.554722, lng: 126.970833 }}
        defaultZoom={16}
      >
        <Marker
          key={1}
          position={{ lat: 37.554722, lng: 126.970833 }}
          animation={2}
          onClick={() => {
            alert('여기는 N서울타워입니다.');
          }}
        />{' '}
        <Marker
          key={2}
          position={{ lat: 37.5591786, lng: 126.9776692 }}
          animation={2}
          onClick={() => {
            alert('여기는 N서울타워입니다.');
          }}
        />{' '}
        <Marker
          key={3}
          position={{ lat: 37.5616685, lng: 126.9858438 }}
          animation={2}
          onClick={() => {
            alert('여기는 N서울타워입니다.');
          }}
        />
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
};
export default NaverPlanMap;
