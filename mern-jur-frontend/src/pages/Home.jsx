import { legalCases } from './services/cases/cases';
import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
    setLoading(false);
  }, []);

  // Правильное объединение данных
  const allPosts = [...legalCases, ...posts].map((post) => {
    // Для legalCases
    if (post.id) {
      return {
        id: post.id,
        title: post.title,
        imageUrl: post.imageUrl,
        user: {
          avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
          fullName: 'Система'
        },
        createdAt: post.createdAt,
        tags: post.tags || [],
        text: post.text
      };
    }
    // Для ваших постов
    return {
      _id: post._id,
      title: post.title,
      imageUrl: post.imageUrl,
      user: {
        avatarUrl: post.user?.avatarUrl || 'https://mui.com/static/images/avatar/1.jpg',
        fullName: post.user?.fullName || 'Аноним'
      },
      createdAt: post.createdAt,
      viewsCount: post.viewsCount || 0,
      tags: post.tags || [],
      text: post.text
    };
  });

  if (loading) return <div>Загрузка...</div>;

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новости" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          {allPosts.map((post) => (
            <Post
              key={post.id || post._id}
              {...post}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};