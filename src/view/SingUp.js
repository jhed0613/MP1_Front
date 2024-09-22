import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 임포트
import './signup.css';
import Header from '../component/homeLayout/Header';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

        if (password !== passwordConfirm) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post('/joinProc', {
                username,
                password,
                passwordConfirm,
                email
            }, {
                headers: {
                    'Content-Type': 'application/json', 
                },
            });

            if (response.status === 200) {
                navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
                alert("회원가입 성공");
            } else {
                alert('회원가입에 실패했습니다.');
                setErrorMessage('회원가입에 실패했습니다.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // 회원가입 실패: 잘못된 자격 증명 또는 다른 문제
                setErrorMessage(error.response.data.message || '회원가입에 실패했습니다.');
                alert('아이디가 이미 존재합니다');
            } else {
                // 기타 오류
                console.error('Error occurred:', error);
                alert('회원가입 중 문제가 발생했습니다.');
                setErrorMessage('회원가입 중 문제가 발생했습니다.');
            }
        }
    };

    return (
        <div>
            <Header />
            <div className="main-content"> {/* 추가된 main-content */}
                <section className="signup-section">
                    <h2 className='h2'>회원가입</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="user-id">
                                아이디 <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="user-id"
                                placeholder="ID"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">
                                비밀번호 <span className="required">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirm-password">비밀번호 확인</label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="비밀번호 확인"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">
                                이메일주소 <span className="required">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="이메일주소 입력"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">가입하기</button>
                    </form>
                </section>
            </div> {/* main-content 닫기 */}
        </div>
    );
}
        
export default SignUp;
