import React, {useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

// Set `RestLink` with your endpoint
const restLink = new RestLink({ uri: "http://127.0.0.1:8000/toyseven" });

// Setup your client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
});

const query = gql`
  query getStations {
    station 
      @rest(
          type: "Station" 
          path: "/stations" 
          method: "GET"
      ) {
      stationId
      stationName
    }
  }
`;


function GetData() {
  const [stations, setStations] = useState({});
  client.query({ query }).then(response => {
    setStations(response.data.stations);
  });

  const item = stations && Object.values(stations).map((item) => (
    <li key={item}>
      {item.stationName}
    </li> 
  ));

  return item;
}


function ApolloStation() {
  const item = GetData();

  return (<div><ul>
    {item}
    </ul>
  </div>);
}
  
export default ApolloStation;