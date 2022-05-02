import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './VocView.css';

function GetCategory() {
  const [category, setCategory] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/toyseven/voc/category').then((response)=> {
      setCategory(response.data);
    })
  }, []);

  const categories = (Object.values(category)).map((item) => (
    <option key={item.id} value={item.id}>
      {item.displayName}
    </option>
  ));

  return categories;
}

const HandleQuestionSubmit = async({body}) => {
  console.log('body : '+JSON.stringify(body));
  const response = await axios.post('http://127.0.0.1:8000/toyseven/voc', body).then((response) => {
    console.log('response status : '+response.status);
  });
}

function VocQuestion() {
  const categories = GetCategory();

  const [category, setCategory] = useState(1);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('unknown');
  const [stationId, setStationId] = useState('ST-4');

  const body = {
      category : category,
      title: title,
      content: content,
      username: username,
      email: email,
      stationId: stationId
    }

  return (<>
    <h2 align="center">게시글 작성</h2>
    <div className="voc-view-wrapper">
        <div className="voc-view-row">
            <label>문의 유형</label>
            <select onChange={(event) => setCategory(parseInt(event.target.value))}>
              {categories}
            </select>
        </div>
        <div className="voc-view-row">
            <label>email</label>
            <input onChange={(event) => setEmail(event.target.value)}></input>
        </div>
        <div className="voc-view-row">
            <label>제목</label>
            <input onChange={(event) => setTitle(event.target.value)}></input>
        </div>
        <div className="voc-view-row">
            <label>내용</label>
            <textarea onChange={(event) => setContent(event.target.value)}></textarea>
        </div>
    <button className="voc-view-go-list-btn" onClick={() => HandleQuestionSubmit({body})}>등록</button>
    </div>
    </>);
}
  
export default VocQuestion;