import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../component/homeLayout/Header';
import axios from 'axios';
import './boardWrite.css';

function BoardUpdate() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const { boardIdx } = useParams(); 

    useEffect(() => {
        // 기존 게시글 데이터 불러오기
        const fetchBoardData = async () => {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            try {
                const response = await axios.get(`/jpa/board/${boardIdx}`);
                setTitle(response.data.title); 
                setContent(response.data.content); 
                setFile(response.data.file);
            } catch (error) {
                console.error('Error fetching board details:', error);
                alert('게시글 데이터를 불러오지 못했습니다.');
            }
        };

        fetchBoardData();
    }, [boardIdx]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); 
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('file', file);
        }

        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
            const response = await axios.put(`/jpa/board/update/${boardIdx}`, formData, {
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
            alert('수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <Header/>

            <div className="container">
                <h2>게시판 수정</h2>
                <form onSubmit={handleUpdate}>
                    <table className="board_detail">
                        <tbody>
                            <tr>
                                <td>제목</td>
                                <td>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                    />
                    <div className="post-actions">
                        <button type="button" onClick={() => navigate('/board')}>목록으로</button>
                        <button type="submit">수정하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BoardUpdate;
