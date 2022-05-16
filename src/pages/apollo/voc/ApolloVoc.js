import React, {useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { Link } from 'react-router-dom';

import CommonTable from '../../../components/table/CommonTable';
import CommonTableColumn from '../../../components/table/CommonTableColumn';
import CommonTableRow from '../../../components/table/CommonTableRow';
import ApolloVocHeader from '../../../components/apollo/voc/ApolloVocHeader';

// Set `RestLink` with your endpoint
const restLink = new RestLink({ uri: "http://127.0.0.1:8000/toyseven" });

// Setup your client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
});

const query = gql`
  mutation getQuestions {
    questions 
      @rest(
          type: "Question" 
          path: "/voc" 
          method: "GET"
      ) {
      id
      title
      createdAt
      username
    }
  }
`;


function GetData() {
  const [questions, setQuestions] = useState({});
  useEffect(() => {
    client.mutate({ mutation: query }).then(response => {
      setQuestions(response.data.questions);
    });
  }, [])

  const item = questions && Object.values(questions).map((voc) => (
    <CommonTableRow key={voc.id}>
      <CommonTableColumn>{voc.id}</CommonTableColumn>
      <CommonTableColumn>
        <Link to={`/apollo/voc/${voc.id}`}>
          {voc.title}
        </Link>
      </CommonTableColumn>
      <CommonTableColumn>{voc.createdAt}</CommonTableColumn>
      <CommonTableColumn>{voc.username}</CommonTableColumn>
    </CommonTableRow>
  ));

  return item;
}


function ApolloVoc() {
  const item = GetData();

  return (<>
    <ApolloVocHeader></ApolloVocHeader>
    <CommonTable headersName={['글번호', '제목', '등록일', '작성자']}>
      {item}
    </CommonTable>
  </>);
}
  
export default ApolloVoc;