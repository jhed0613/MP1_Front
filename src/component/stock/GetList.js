// GetList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { DiffAmount, DayRange } from '../UpDownColor';

const GetList = ({ stocks, title }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>종목명</th>
                    <th>현재가</th>
                    <th>전일비</th>
                    <th>등락률</th>
                </tr>
            </thead>
            <tbody>
                {stocks.length > 0 ? (
                    stocks.map(stock => (
                        <tr key={stock.id}>
                            <td>{stock.no}</td>
                            <td>
                                <Link to={`/stocks/${title}/${stock.stockName}`}>{stock.stockName}</Link>
                            </td>
                            <td>{stock.price}</td>
                            <td><DiffAmount diffAmount={stock.diffAmount} /></td>
                            <td><DayRange dayRange={stock.dayRange} /></td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No stock information available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default GetList;
