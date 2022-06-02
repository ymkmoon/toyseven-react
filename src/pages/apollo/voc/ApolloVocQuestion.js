import React, { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

import './ApolloVocView.css';

const restLink = new RestLink({ uri: "http://127.0.0.1:8000/toyseven" });
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
});

const categoryQuery = gql`
  query getCategories {
    categories 
      @rest(
          type: "Category" 
          path: "/voc/category" 
          method: "GET"
      ) {
      id
      name
      displayName
    }
  }
`;

const questionSubmitQuery = gql`
  mutation submitQuestion($body: PublishablePostInput!) {
    question(body: $body) 
      @rest(
          type: "Question" 
          path: "/voc/question" 
          method: "POST"
          bodyKey: "body"
      ) {
      id
    }
  }
`;

function GetCategory() {
  const [category, setCategory] = useState({});
  useEffect(() => {
    client.query({ query: categoryQuery }).then(response => {
      setCategory(response.data.categories);
    }).catch((error) => {
      console.log(error);
    });
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
    'Authorization' : "Bearer eyJraWQiOiI1VG5rb1BwN0ZJS1NPSVhnNFY2SytNQTV2ZlV6S3cwdGp1cDRYdmw5Um9JPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiNDI2YzFjMS0zYzk1LTQ2MDQtYjA4NC1jYTQ5ZDM2MGQyM2YiLCJjb2duaXRvOmdyb3VwcyI6WyJhcC1ub3J0aGVhc3QtMl9wNUhwSzZzNmtfR29vZ2xlIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1ub3J0aGVhc3QtMi5hbWF6b25hd3MuY29tXC9hcC1ub3J0aGVhc3QtMl9wNUhwSzZzNmsiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIyb28yaTc3M2ljYjUycmQ2cTY2MDlta3JhciIsIm9yaWdpbl9qdGkiOiI0NTliYTBlNy1hY2MyLTQ2NTQtYTk4My1jYzgyNjMwOTlhYTYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjU0MTMwODE2LCJleHAiOjE2NTQxNTcxMDAsImlhdCI6MTY1NDE1MzUwMCwianRpIjoiN2Y1MmZiMTUtOThmNi00ZGIwLTkzZmYtNDExYjUzOWM4MTBiIiwidXNlcm5hbWUiOiJnb29nbGVfMTE3ODA5NTkwNTI3MzQyNzc5MzU0In0.hPbyAMPHXXoYsvULlwVfbSXjETN6oBWPkKERJHDThoj23PR3zahETO2m10wiT9HQj_h2xRSpuu_ir2Im5W2p3D_cFznrvBCirMhFNpmPbazd6NfhN_W2eqldeE7uMD9VLG-f-au0QHoWeRQ6hfR_z-wvisZZS_NS3QkjuvBLBaNWq5IdCspO4hRINIks6G_SUi73oVHXMTQAK1ZOo71XJndKvqgegemFRtDMLpDmnnxXmVciOhStG06QtEfmegBaIfnTRtnKFwRNJopLc4wqLwQA3HgIEWT3mRjUUlLZJXaoMc1_YVNum14G-jsiCRiADY1tmFJovw3YuXE2BBi-5A"
  }
  
  const response = await client.mutate({ mutation: questionSubmitQuery, variables: {body: body}, context: {headers: headers} }).then(response => {
    console.log('response : '+JSON.stringify(response));
  }).catch((error) => {
    console.log('error : '+error);
  });
}

function ApolloVocQuestion() {
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
      stationId: stationId,
      email: email
    }  

  return (<>
    <h2 align="center">게시글 작성</h2>
    <div className="voc-view-wrapper">
      <div className="voc-view-row">
          <label>문의 유형</label>
          <select onChange={(event) => setCategoryId(event.target.value)}>
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
  
export default ApolloVocQuestion;