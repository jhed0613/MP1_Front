import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';

const Header = (userId) => {
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    const navigate = useNavigate();

    return (
        <header>
            <div className="logo">
                <h1>INVESTMENT</h1>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/stocks/kospi">코스피</Link></li>
                    <li><Link to="/stocks/kosdaq/">코스닥</Link></li>
                    <li><Link to="/board">자유게시판</Link></li>
                </ul>
            </nav>
            <div className="user-options">
                {isLoggedIn ? (
                    <>
                        {/* <li><Link to="/mypage">마이페이지</Link></li> */}
                        <div className="user-icons">
                        <span className="profile">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>

                            {/* Font Awesome의 user 아이콘을 Link 태그로 감싸서 클릭 가능하게 함 */}
                            <Link to={`/mypage/${userId}`}>
                                <i className="fas fa-user-circle"></i>
                            </Link>
                        </span>
                        </div>

                        <button onClick={() => {
                        localStorage.removeItem('token'); // 로그아웃 시 토큰 삭제
                        navigate('/');
                        window.location.reload(); // UI 업데이트를 위해 페이지 새로 고침
                    }}>로그아웃</button>
                    </>
                
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
