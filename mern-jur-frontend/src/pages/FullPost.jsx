import React, { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { useParams } from "react-router-dom";
import { QRCodeGenerator } from "../QRCodeGenerator";
import { legalCases } from "./services/cases/cases";

export const FullPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // 1. Сначала ищем в пользовательских постах (localStorage)
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    let foundPost = savedPosts.find(p => p._id === id);

    // 2. Если не нашли - ищем в legalCases
    if (!foundPost) {
      foundPost = legalCases.find(caseItem => caseItem.id.toString() === id.toString());
      
      // Если нашли дело - преобразуем в структуру поста
      if (foundPost) {
        foundPost = {
          ...foundPost,
          _id: foundPost.id.toString(), // Приводим к строке для единообразия
          user: {
           
            avatarUrl: "https://mui.com/static/images/avatar/1.jpg"
          },
          viewsCount: 0,
          comments: []
        };
      }
    }

    setPost(foundPost || null);
    setLoading(false);
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (!post) return <div>Пост не найден</div>;

  // Функция для обработки изображений
  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('data:image')) return url;
    return `http://localhost:4444${url}`;
  };

  return (
    <Post
      _id={post._id}
      title={post.title}
      text={post.text}
      imageUrl={getImageUrl(post.imageUrl)}
      user={post.user || {
        avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
        fullName: "Автор не указан"
      }}
      createdAt={post.createdAt}
      viewsCount={post.viewsCount || 0}
      tags={post.tags || []}
      isFullPost
    >
      <div style={{ marginBottom: 20 }}>
        {post.text && post.text.split("\n").map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
      
      <div className="qr" style={{ marginTop: 30, textAlign: 'center' }}>
        <QRCodeGenerator 
          value={window.location.href}
          size={150}
        />
        <p style={{ marginTop: 10 }}>Отсканируйте QR-код для быстрого доступа</p>
      </div>
    </Post>
  );
};