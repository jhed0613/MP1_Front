import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DiffAmount, DayRange } from '../UpDownColor';
import Clock from '../Clock';
import Header from '../homeLayout/Header';
import './stockDetail.css'; 
import GetList from './GetList';

function StockDetail({ apiEndpoint, isKospi, title }) {
    const { stockName } = useParams();
    const [stock, setStock] = useState(null);
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [calculatedMaxQuantity, setCalculatedMaxQuantity] = useState(0);
    const [userData, setUserData] = useState({ username: '', coins: 0 });

    const handleQuantityChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setQuantity(Number(value));
    };

    useEffect(() => {
        const fetchStockData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('No token found. Please log in.');
                setLoading(false);
                return;
            }

            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const userResponse = await axios.get('/home'); // Adjusted endpoint
                const coins = userResponse.data?.user?.coins || 0;
                setUserData({
                    username: userResponse.data?.user?.username || '',
                    coins,
                });

                // Fetch the stocks list for the given apiEndpoint
                const stocksResponse = await axios.get(apiEndpoint);
                setStocks(stocksResponse.data); // Update stocks data

                // Find the specific stock
                const foundStock = stocksResponse.data.find(stock => stock.stockName === stockName);
                if (foundStock) {
                    setStock(foundStock);
                    const price = parseFloat(foundStock.price.replace(/[^0-9]/g, ''));
                    const calculatedMaxQuantity = coins ? Math.floor(coins / price) : 0;
                    setCalculatedMaxQuantity(calculatedMaxQuantity);
                } else {
                    setError('Stock not found.');
                }
            } catch (error) {
                setError('Error fetching stock data.');
            } finally {
                setLoading(false);
            }
        };

        fetchStockData();
    }, [stockName, apiEndpoint]);


    const handleBuy = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found. Please log in.');
            return;
        }

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.post('/api/trading/buy', {
                username: userData.username,
                stockName: stock.stockName,
                quantity: quantity,
                stockType: isKospi ? 'kospi' : 'kosdaq',
            });
            if (response.data) {
                alert(`매수 성공 ${quantity} 주, 주식 종목 : ${stock.stockName}`);
            } else {
                alert('Failed to buy stock. Please try again.');
            }
        } catch (error) {
            alert('잔액 부족');
        }
    };


    const handleSell = async () => {
    
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found. Please log in.');
            return;
        }
        
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.post('/api/trading/sell', {
                username: userData.username,
                stockName: stock.stockName,
                quantity: quantity,
                stockType: isKospi ? 'kospi' : 'kosdaq',
                
            });
            
            if (response.data) {
                alert(`매도 성공 ${quantity} 주, 주식 종목 : ${stock.stockName}`);
            } else {
                alert('Failed to sell stock. Please try again.');
            }
        } catch (error) {
                alert('수량 부족1');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="stock-detail">
            <Header />
            <main>
                <div className="container">
                    <h2>{title} <Clock /></h2>
                    <GetList stocks={stocks} title={title} />
                </div>
                <div className="stock-info">
                    <div className="stock-name">
                        <h2>{stock.stockName}</h2>
                    </div>
                    <div className="info-grid">
                        <div>주문 가격</div>
                        <div className="value">{stock.price}</div>
                        <div>전일비</div>
                        <div className="value"><DiffAmount diffAmount={stock.diffAmount} /></div>
                        <div>등락률</div>
                        <div className="value"><DayRange dayRange={stock.dayRange} /></div>
                        <div>거래량</div>
                        <div className="value">{stock.turnover}</div>
                        <div>외국인 비율</div>
                        <div className="value">{stock.foreignOwnRate}</div>
                        <div>PER</div>
                        <div className="value">{stock.per}</div>
                        <div>ROE</div>
                        <div className="value">{stock.roe}</div>
                        <div>수량</div>
                        <div className="input-quantity">
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                max={calculatedMaxQuantity}
                                placeholder={`수량입력`}
                            />
                        </div>
                        <div>보유자산</div>
                        <div className="value">{userData.coins.toLocaleString()} 원</div>
                        {/* <div colspan="2" className="order-status">{calculatedMaxQuantity} 주 주문가능</div> */}
                        <div className="order-status">{calculatedMaxQuantity} 주 주문가능</div>
                        <div>총 금액</div>
                        <div className="value">{(quantity * parseFloat(stock.price.replace(/[^0-9]/g, ''))).toLocaleString()} 원</div>
                    </div>
                    <div className="buttons">
                        <button className="buy" onClick={handleBuy}>매수</button>
                        <button className="sell" onClick={handleSell}>매도</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default StockDetail;
