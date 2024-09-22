import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './component/homeLayout/Home';
import Login from './view/Login';
import SignUp from './view/SingUp';
import KospiDetail from './view/KospiDetail';
import KospiList from './view/KospiList';
import KosdaqList from './view/KosdaqList';
import KosdaqDetail from './view/KosdaqDetail'
import Mypage from './component/homeLayout/Mypage';
import BoardList from './view/BoardList';
import BoardWrite from './view/BoardWrite';
import BoardDetail from './view/BoardDetail';
import BoardUpdate from './view/BoardUpdate';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/login" element={<Login/>} /> 
          <Route path="/signup" element={<SignUp/>} /> 
          <Route path="/mypage/:userId" element={<Mypage/>} /> 
          <Route path="/board" element={<BoardList/>} /> 
          <Route path="/board/write" element={<BoardWrite/>} /> 
          <Route path="/board/:boardIdx" element={<BoardDetail/>} /> 
          <Route path="/board/update/:boardIdx" element={<BoardUpdate/>} /> 
          <Route path="/stocks/kospi/:stockName" element={<KospiDetail />} />
          <Route path="/stocks/kosdaq/:stockName" element={<KosdaqDetail />} />
          <Route path="/stocks/kospi" element={<KospiList />} />
          <Route path="/stocks/kosdaq" element={<KosdaqList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
