import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const Post = ({ 
  id,
  _id,
  title, 
  imageUrl, 
  user = {}, 
  createdAt, 
  viewsCount, 
  tags = [],
  text 
}) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/posts/${_id || id}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Дата не указана';
    try {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Улучшенная обработка изображений
  const getImageUrl = () => {
    if (!imageUrl) return null;
    
    // Если это URL из legalCases
    if (imageUrl.startsWith('http')) return imageUrl;
    
    // Если это локальный путь из ваших постов
    if (imageUrl.startsWith('/')) {
      return `http://localhost:4444${imageUrl}`;
    }
    
    // Для других случаев
    return imageUrl;
  };

  const imageSrc = getImageUrl();

  return (
    <Card sx={{ mb: 4, cursor: 'pointer' }} onClick={handleTitleClick}>
      <CardHeader
        avatar={
          <Avatar 
            src={user.avatarUrl || 'https://mui.com/static/images/avatar/1.jpg'} 
            alt={user.fullName}
          />
        }
        title={user.fullName || 'Анонимный автор'}
        subheader={formatDate(createdAt)}
      />

      {imageSrc && (
        <CardMedia
          component="img"
          height="300"
          image={imageSrc}
          alt={title}
          sx={{ objectFit: 'cover' }}
          onError={(e) => {
            e.target.style.display = 'none'; // Скрываем если изображение не загрузилось
          }}
        />
      )}

      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          {title || 'Без названия'}
        </Typography>

        {text && (
          <Typography paragraph sx={{ mb: 2 }}>
            {text.length > 150 ? `${text.substring(0, 150)}...` : text}
          </Typography>
        )}

        {tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {tags.map((tag, index) => (
              <Typography 
                key={index} 
                variant="caption" 
                color="primary"
                sx={{ px: 1, py: 0.5, bgcolor: 'primary.light', borderRadius: 1 }}
              >
                #{tag}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Card>
  );
};