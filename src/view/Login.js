import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 임포트
import './login.css';
import Header from '../component/homeLayout/Header';
import { jwtDecode } from "jwt-decode";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [userId, setUserId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

        try {
            const response = await axios.post('/loginProc', new URLSearchParams({
                username,
                password
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.status === 200) {
                const token = response.headers.token;
                // userId = response.headers.userId; // 서버로부터 userId 받기
                
                console.log(">>>>", response.headers.token);
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                // JWT 토큰에서 userId 추출
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                console.log("UserId from Token:", userId);

                localStorage.setItem('userId', userId); // userId 저장
                navigate('/'); 
            } else {
                setErrorMessage('로그인에 실패했습니다.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // 로그인 실패: 잘못된 자격 증명
                setErrorMessage('잘못된 이메일 또는 비밀번호입니다.');
            } else {
                // 기타 실패
                console.error('Error occurred:', error);
                setErrorMessage('로그인 중 문제가 발생했습니다.');
            }
        }
    };

    return (
        <div>
            <Header />
            <section className="login-section">
                <h2>로그인</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="아이디 또는 이메일" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="비밀번호" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="options">
                        <div className="links">
                            <Link to="/signup">회원가입</Link>
                        </div>
                    </div>
                    <button type="submit">로그인</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </section>
        </div>
    );
}

export default Login;
