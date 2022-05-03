import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { useParams } from 'react-router-dom';

import './ApolloVocView.css';

const restLink = new RestLink({ uri: "http://127.0.0.1:8000/toyseven" });
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
});

const query = gql`
  query getVoc($vocId: Int!) {
    voc(vocId: $vocId)
      @rest(
          type: "Voc" 
          path: "/voc/search/{args.vocId}" 
          method: "GET"
      ) {
          question {
            id
            title
            createdAt
            content
          }
          answer {
            id
            adminName
            createdAt
            content
          }
    }
  }
`;

  
function GetData(vocId) {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});

  client.query({ query, variables: {vocId: vocId} }).then(response => {
    setQuestion(response.data.voc.question);
    setAnswer(response.data.voc.answer);
  });

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
            <label>{ question.createdAt }</label>
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