import { useState, useEffect } from 'react';
import axios from 'axios';
const NaverSearchEngine = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    onClick();
  });
  async function onClick() {
    var search = '서울 맛집';
    await axios
      .get(`http://localhost:8000/searchbynaver/${search}`)
      .then((res) => {
        const { data } = res;
        console.log('client : ', data.items);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return <div className="App"></div>;
};
export default NaverSearchEngine;
