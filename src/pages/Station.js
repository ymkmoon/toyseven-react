import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GetData() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/toyseven/stations').then((response)=> {
      setData(response.data);
    })
  }, []);

  // response.data 의 데이터는 array 형식[{...}, {...}, ...] 이기 때문에
  // data 에 바로 map 함수를 이용하면 에러가 발생한다.
  // Object.values(data) 을 사용해 배열을 리턴받아 사용
  const item = (Object.values(data)).map((item) => (
    <li key={item.stationId}>
      {item.stationName}
    </li>
  ));

  return item;
}

function Station() {
  const item = GetData();
  return (<div><ul>
    {item}
    </ul>
  </div>);  
}
  
export default Station;