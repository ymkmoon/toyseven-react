import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CommonTable from '../components/table/CommonTable';
import CommonTableColumn from '../components/table/CommonTableColumn';
import CommonTableRow from '../components/table/CommonTableRow';

function GetData() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/toyseven/voc').then((response)=> {
      setData(response.data);
    })
  }, []);

  const item = (Object.values(data)).map((voc) => (
    <CommonTableRow key={voc.id}>
      <CommonTableColumn>{voc.id}</CommonTableColumn>
      <CommonTableColumn>
        <Link to={`/voc/${voc.id}`}>
          {voc.title}
        </Link>
      </CommonTableColumn>
      <CommonTableColumn>{voc.createAt}</CommonTableColumn>
      <CommonTableColumn>{voc.username}</CommonTableColumn>
    </CommonTableRow>
  ));

  return item;
}

function Voc() {
  const item = GetData();

  return (<>
    <CommonTable headersName={['글번호', '제목', '등록일', '작성자']}>
      {item}
    </CommonTable>
  </>);
}
  
export default Voc;