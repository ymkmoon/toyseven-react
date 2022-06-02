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

  const headers = {
    'Content-Type' : 'application/json',
    'Authorization' : "Bearer eyJraWQiOiI1VG5rb1BwN0ZJS1NPSVhnNFY2SytNQTV2ZlV6S3cwdGp1cDRYdmw5Um9JPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiNDI2YzFjMS0zYzk1LTQ2MDQtYjA4NC1jYTQ5ZDM2MGQyM2YiLCJjb2duaXRvOmdyb3VwcyI6WyJhcC1ub3J0aGVhc3QtMl9wNUhwSzZzNmtfR29vZ2xlIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1ub3J0aGVhc3QtMi5hbWF6b25hd3MuY29tXC9hcC1ub3J0aGVhc3QtMl9wNUhwSzZzNmsiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIyb28yaTc3M2ljYjUycmQ2cTY2MDlta3JhciIsIm9yaWdpbl9qdGkiOiI0NTliYTBlNy1hY2MyLTQ2NTQtYTk4My1jYzgyNjMwOTlhYTYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjU0MTMwODE2LCJleHAiOjE2NTQxNTM5MjMsImlhdCI6MTY1NDE1MDMyMywianRpIjoiMzgzNDRlMTItMzcwZi00YmJhLThlNWQtZmNkMGViNzFiNDg0IiwidXNlcm5hbWUiOiJnb29nbGVfMTE3ODA5NTkwNTI3MzQyNzc5MzU0In0.FYwOJKng-eiNiixdyM5SU0vDRon675UATIDbbMPqXVGKgVu_srd5TQJYT4k1gWbACqm8FRYHUWw-L11_CF6MfGnqExBMJ0tI9WxIsLYm2ddEtBVbAl0IUTtlv032JRBJbrGQF81Gdp6c_V2ro-9xQ309N1BTTfL4d0xIDmgWi3J57SMLu7JvvAjx7RdLFohtwkNBzogvVHnxenSeqEMHwPfv6fdbKsnBbW0G4DbjPBtgAw9XBP4qMJXerdt1v_QJSeY98FuLa_kFoYJRu25RkLUVKtVIyQH6jEnrsZbmTzc_UUIikFoUsBuWAyKYH12jGUQYRqMtjLM_iQCENe-7Zg"
  }

  const response = await axios.post('http://127.0.0.1:8000/toyseven/voc/question', body, {headers: headers}).then((response) => {
    console.log('status : '+response.status);
  }).catch((error) => {
    console.log('error : '+error);
  });
}

function VocQuestion() {
  const categories = GetCategory();

  const [categoryId, setCategoryId] = useState(1);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [stationId, setStationId] = useState('ST-4');

  const body = {
      categoryId : categoryId,
      title: title,
      content: content,
      email: email,
      stationId: stationId
    }

  return (<>
    <h2 align="center">게시글 작성</h2>
    <div className="voc-view-wrapper">
        <div className="voc-view-row">
            <label>문의 유형</label>
            <select onChange={(event) => setCategoryId(parseInt(event.target.value))}>
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