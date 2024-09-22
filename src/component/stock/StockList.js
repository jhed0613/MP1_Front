import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
// import './stock.css';
import Clock from '../Clock';
import { DiffAmount, DayRange } from '../UpDownColor';
// import useFetchUsername from '../Component/useFetchUsername'; 
import Header from '../homeLayout/Header';
import GetList from './GetList';

const StockList = ({ apiEndpoint, title }) => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    // const username = useFetchUsername();


    useEffect(() => {
        const fetchStockData = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            if (!token) {
                setError('No token found. Please log in.');
                setLoading(false);
                return;
            }
            console.log(token);
            axios.defaults.headers.common['Authorization'] = `Bearer `+token;
            // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const response = await axios.get(apiEndpoint);
                setStocks(response.data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
                setError('Failed to load stock data.');
            } finally {
                setLoading(false);
            }
        };

        fetchStockData();
    }, [apiEndpoint]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Header/>
            {/* <Menu username={username} /> */}
        <div className="container">
            <h2>{title} <Clock /></h2>
            <GetList stocks={stocks} title={title}/>
            </div>
        </div>
    );
}

export default StockList;
