import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Header from '../component/homeLayout/Header';
import axios from 'axios';
import './boardWrite.css';

function BoardWrite() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const { boardIdx } = useParams();


    const handleFileChange = (e) => {
        setFile(e.target.files[0]); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('file', file);
        }
        
        const token = localStorage.getItem('token');
            
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log(token);

        try {
            const response = await axios.get('/jpa/board/write');
            console.log('Data received:', response.data); // 데이터 확인
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        

        try {
            const response = await axios.post('/jpa/board/write', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                alert('게시글 생성 성공');
                navigate('/board');
            } else {
                console.error('Error creating post:', response.data);
                alert('게시글 생성 실패');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('There was a problem creating the post.');
        }
    };

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

    return (
        <div>
            <Header/>

        <div className="container">
            <h2>게시판 등록</h2>
            <form onSubmit={handleSubmit}>
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
                <input
                    type="submit"
                    id="submit"
                    value="생성"
                    className="btn"
                />
                <button onClick={() => navigate('/board')} className="btn">목록으로</button>
                {/* <button onClick={handleUpdate}>수정하기</button> */}
                <Link
                    to="/board/write"
                    onClick={handleUpdate} // 클릭 시 수정 권한 체크
                >
                    <button>수정하기</button>
                </Link>
                {/* <button onClick={handleDelete} className="btn">삭제하기</button> */}
            </form>
        </div>
        </div>
    );
}

export default BoardWrite;
