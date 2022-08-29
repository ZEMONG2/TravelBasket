import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useState, useEffect, useMemo } from 'react';
import * as utill from '../../../Utils/Utils';

const PlanMapForMyPlan = ({ markerlist, pointsList }) => {
  /* lat: 위도 , lng:경도 */

  // const lat = 37.5537586;
  // const lng = 126.9809696;
  const [info, setInfo] = useState();
  const [style, setStyle] = useState({
    color: '#000',
    fontSize: '13px',
  });

  return (
    <Map
      center={{ lat: pointsList[0].getLat(), lng: pointsList[0].getLng() }}
      level={6} //맵의 확대 기본값
      style={{ width: '100%', height: '360px' }}
      onTileLoaded={(map) => {
        //지도 이동이벤트 발생하면 마커들이 다 보이게 중앙정렬

        //console.log('this is map!! : ', pointsList, pointsList.length);
        if (map.getLevel() !== 6) {
          return;
        } else {
          if (pointsList.length === 1) {
            //좌표가 하나밖에 없으면(지역 선택, 첫 장소 선택)
            map.setLevel(6, { animate: true });
          } else {
            utill.setBounds(pointsList, map);
          }
        }
      }}
    >
      {markerlist[0].noEditted !== true &&
        markerlist.map(
          (
            val, //이거는 일차를 순회
            idx,
          ) =>
            val.area.map((val2, idx2) => (
              <MapMarker
                key={idx2}
                position={{
                  lat: parseFloat(val2.y),
                  lng: parseFloat(val2.x),
                }}
                clickable={true}
                onClick={() => setInfo(val2)}
                image={
                  //마커 이미지 세팅
                  {
                    src:
                      'http://localhost:8000' + utill.getMarkerListSrc()[idx], //마커 이미지 경로, 여기서 순회시켜줘야함
                    size: {
                      //마커 이미지 크기
                      width: 33,
                      height: 42,
                    },
                    // options: {
                    //   offset: {
                    //     //마커 이미지 옵션, 마커의 좌표와 일치시킬 이미지안에서의 좌표 설정
                    //     x: 15,
                    //     y: 40,
                    //   },
                    // },
                  }
                }
              >
                {info && info.place_name === val2.place_name && (
                  <div className="tests" style={style}>
                    <a href={val2.place_url}>
                      {' '}
                      {val.day + ')' + val2.place_name}
                    </a>
                  </div>
                )}
              </MapMarker>
            )),
        )}
    </Map>
  );
};
export default PlanMapForMyPlan;
