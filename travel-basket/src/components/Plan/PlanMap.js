// import { Map, MapMarker } from 'react-kakao-maps-sdk';
// import { useState } from 'react';

// const PlanMap = () => {
//   /* lat: 위도 , lng:경도 */

//   const lat = 37.5537586;
//   const lng = 126.9809696;
//   const [state, setState] = useState();
//   return (
//     <Map
//       center={{ lat: lat, lng: lng }}
//       style={{ width: '100%', height: '360px' }}
//       onCenterChanged={(map) =>
//         setState({
//           level: map.getLevel(),
//           center: {
//             lat: map.getCenter().getLat(),
//             lng: map.getCenter().getLng(),
//           },
//         })
//       }
//     >
//       <MapMarker position={{ lat: lat, lng: lng }}>
//         {/* <div style={{ color: '#000' }}>Hello World!</div> */}
//       </MapMarker>
//       <MapMarker position={{ lat: 37.5591786, lng: 126.9776692 }}>
//         {/* <div style={{ color: '#000' }}>Hello World!</div> */}
//       </MapMarker>
//       <MapMarker position={{ lat: 37.5616685, lng: 126.9858438 }}>
//         {/* <div style={{ color: '#000' }}>Hello World!</div> */}
//       </MapMarker>
//     </Map>
//   );
// };
// export default PlanMap;
