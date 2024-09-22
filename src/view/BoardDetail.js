import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../component/homeLayout/Header';
import './boardDetail.css';

function BoardDetail() {
    const { boardIdx } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        const fetchBoardData = async () => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username'); // 현재 로그인한 사용자 정보
            setCurrentUser(username); // 현재 사용자 상태 설정
            console.log("use", username)
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const response = await axios.get(`/jpa/board/${boardIdx}`);
                console.log('Data received:', response.data); // 데이터 확인
                console.log(response.data.username);
                setBoard(response.data); // board 상태 업데이트
                console.log('Board data:', board);
                setTitle(response.data.title); // 제목 상태 업데이트
                setContent(response.data.content); // 내용 상태 업데이트
                setFile(response.data.file); // 내용 상태 업데이트
            } catch (error) {
                console.error('Error fetching board details:', error);
                alert('상세페이지 열기 실패');
            }
        };

        fetchBoardData();
    }, [boardIdx]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/jpa/board/${boardIdx}`, { title, content }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert('게시글 수정 성공');
                navigate('/board');
            } else {
                alert('수정 실패');
            }
        } catch (error) {
            console.error('Error updating post:', error);
            alert('권한 없음.')
        }
    };
    const handleUpdateClick = (e) => {
        // 작성자와 현재 사용자가 다를 경우
        if (currentUser !== board.createdUsername) {
            e.preventDefault(); // 버튼 클릭 동작 중단
            alert('수정 권한이 없습니다.');
        } else {
            // 사용자가 동일하면 수정 처리 함수 호출
            // handleUpdate();
            navigate(`/board/update/${boardIdx}`);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/jpa/board/${boardIdx}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 204) {
                alert('게시글 삭제 성공');
                navigate('/board');
            } else {
                alert('삭제 실패.');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('권한 없음')
            
        }
    };

    if (!board) return <p>Loading...</p>;

    return (
        <div>
            <Header/>
            <div className="forum-container">
            <h1>자유게시판</h1>
            <hr />
            
            {/* Table for Post Detail */}
            <table className="board_detail">
                <tbody>
                    <tr>
                        <td>제목 : {board.title}</td>
                        <td>
                            작성자 : {board.createdUsername}
                        </td>
                    </tr>
                    <td>작성 날짜 : {new Date(board.createTime).toLocaleDateString()}</td>
                    <td>조회수 : {board.hitCnt}</td>
                    <tr>
                        <td colSpan="2">
                            {board.content}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Buttons for editing and deleting the post */}
            <div className="post-actions">
                <button onClick={() => navigate('/board')} className="btn">목록으로</button>
                <button onClick={handleUpdateClick} className="btn">수정하기</button>
                <button onClick={handleDelete} className="btn">삭제하기</button>
            </div>
        </div>
        </div>
    );
}
        
export default BoardDetail;
