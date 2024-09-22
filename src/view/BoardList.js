import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './board.css'; // 기존 CSS 파일을 임포트합니다.
import Header from '../component/homeLayout/Header';

function BoardList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            try {
                const response = await axios.get('/jpa/board');
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    console.error('Received data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <Header/>
        <div className="container">
            <h2>게시판 목록</h2>
            <table className="board_list">
                <colgroup>
                    <col width="15%" />
                    <col width="*" />
                    <col width="15%" />
                    <col width="20%" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">글번호</th>
                        <th scope="col">제목</th>
                        <th scope="col">작성자</th>
                        <th scope="col">조회수</th>
                        <th scope="col">작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <tr key={post.boardIdx}>
                                <td>{post.boardIdx}</td>
                                <td className="title">
                                    <Link to={`/board/${post.boardIdx}`}>{post.title}</Link>
                                </td>
                                <td>{post.createdUsername}</td>
                                <td>{post.hitCnt}</td>
                                <td>{new Date(post.createTime).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">조회된 결과가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link to="write" className="btn">글쓰기</Link>
        </div>
        </div>
    );
}


export default BoardList;
