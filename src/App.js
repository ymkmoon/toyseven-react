import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Navbar from'./components/Navbar';
import Home from'./pages/Home';
import SignUp from'./pages/SignUp';
import Station from'./pages/station/Station';
import Voc from'./pages/voc/Voc';
import VocView from './pages/voc/VocView';
import VocQuestion from './pages/voc/VocQuestion';
import ApolloStation from './pages/apollo/station/ApolloStation';
import ApolloVoc from './pages/apollo/voc/ApolloVoc';
import ApolloVocView from './pages/apollo/voc/ApolloVocView';
import ApolloVocQuestion from './pages/apollo/voc/ApolloVocQuestion';

function App() {

    return (
      <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/station' element={<Station />} />
          <Route path='/voc' element={<Voc />} />
          <Route path='/voc/:vocId' element={<VocView />}  />
          <Route path='/voc/question' element={<VocQuestion />}  />
          <Route path='/apollo/station' element={<ApolloStation />}  />
          <Route path='/apollo/voc' element={<ApolloVoc />}  />
          <Route path='/apollo/voc/:vocId' element={<ApolloVocView />}  />
          <Route path='/apollo/voc/question' element={<ApolloVocQuestion />}  />
          <Route path='/sign-up' element={<SignUp />}  />
        </Routes>
      </Router>
      </>
    );
}
export default App;