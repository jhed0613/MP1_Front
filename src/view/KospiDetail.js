import React from 'react';
import StockDetail from '../component/stock/StockDetail';

const KospiDetail = () => {
    return (
        <div>
            
            <StockDetail apiEndpoint='/stocks/kospi' isKospi={true} title='KOSPI'/>
        </div>
    );
}

export default KospiDetail;