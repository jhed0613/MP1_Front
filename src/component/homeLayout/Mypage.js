import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import './home.css'; 

const Mypage = () => {
  const [stockData, setStockData] = useState([]); // 주식 데이터를 상태로 관리
  const [userData, setUserData] = useState(null); // 유저 데이터를 객체로 관리
  const token = localStorage.getItem('token'); // JWT 토큰을 로컬 스토리지에서 가져옴
  const userId = localStorage.getItem('userId'); // userId도 로컬 스토리지에서 가져옴 (또는 다른 방법으로 얻을 수 있음)

  useEffect(() => {
    // API 호출
    const fetchStockData = async () => {
      try {
        const stockResponse = await axios.get(`/api/mypage/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
          },
        });
        setStockData(stockResponse.data); // API 응답 데이터로 상태 업데이트
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }

      try {
        const userResponse = await axios.get(`/user`, {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
          },
        });
        setUserData(userResponse.data); // API 응답 데이터로 상태 업데이트
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchStockData();
  }, [userId, token]); // userId와 token이 변경될 때마다 API를 호출

  return (
    <div>
      <Header /> {/* Header 컴포넌트 */}
      <div className="table-container1">
        {/* 유저 데이터가 있을 때만 테이블 표시 */}
        {userData && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>보유 코인</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData.username}</td>
                <td>{Number(userData.coin).toLocaleString()}원</td>
              </tr>
            </tbody>
          </table>
        )}
        <p> </p>
        <hr/>
        </div>
        <div className="table-container2">
        <table>
          <thead>
            <tr>
              <th>종목명</th>
              <th>수량</th>
              <th>평균 가격</th>
              <th>종목 타입</th>
              <th>총 가격</th>
              <th>현재 총 가격</th>
              <th>순이익</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((stock, index) => (
              <tr key={index}>
                <td>{stock.stockName}</td>
                <td>{stock.quantity}</td>
                <td>{Number(stock.averagePrice).toLocaleString()}원</td>
                <td>{stock.stockType.toUpperCase()}</td>
                <td>{Number(stock.totalPrice).toLocaleString()}원</td>
                <td>{Number(stock.totalCurrentValue).toLocaleString()}원</td>
                <td>{Number(stock.profit).toLocaleString()}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mypage;
