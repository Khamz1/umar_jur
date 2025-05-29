import React from 'react';
import { jurs } from '../../jurs';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container
} from '@mui/material';
import { Link } from 'react-router-dom';

const JurCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[6]
  }
}));

const ContactButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

export const Jurs = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container justifyContent="center">
        {jurs.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <JurCard>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={`${item.name} ${item.lastname}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.lastname} {item.name} {item.fatherName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Опыт работы: {item.exp}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Завершённых дел: {item.cases}
                </Typography>
                <Link to={'/contact'}>
                <ContactButton
                  fullWidth
                  variant="contained"
                  onClick={() => console.log(`Contact ${item.name}`)}
                >
                  Связаться
                </ContactButton>
                </Link>
              </CardContent>
            </JurCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
