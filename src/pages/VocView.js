import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './VocView.css';

function GetData(vocId) {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/toyseven/voc/search/'+vocId).then((response)=> {
        setQuestion(response.data.question);
        setAnswer(response.data.answer);
    })
  }, []);

  const item =  (<>
    <h2 align="center">게시글 상세정보</h2>
    <div className="voc-view-wrapper">
        <div className="voc-view-row">
            <label>게시글 번호</label>
            <label>{ question.id }</label>
        </div>
        <div className="voc-view-row">
            <label>제목</label>
            <label>{ question.title }</label>
        </div>
        <div className="voc-view-row">
            <label>작성일</label>
            <label>{ question.createDate }</label>
        </div>
        <div className="voc-view-row">
            <label>내용</label>
            <div>
                {
                question.content
                }
            </div>
        </div>
    </div></>)

    return item;
}

function VocView() {
  const{vocId} = useParams();
  const item = GetData(vocId);

  return (<>
    <div>
        {item}
    </div>
  </>);
}
  
export default VocView;