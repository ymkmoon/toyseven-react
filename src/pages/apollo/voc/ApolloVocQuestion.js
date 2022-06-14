import React, { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

import './ApolloVocView.css';

const restLink = new RestLink({ uri: "/toyseven" });
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
});

const categoryQuery = gql`
  query getCategories {
    categories 
      @rest(
          type: "Category" 
          path: "/voc/categories" 
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
    'Authorization' : "Bearer access token"
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