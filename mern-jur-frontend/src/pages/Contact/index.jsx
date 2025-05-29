import React from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  styled,
  InputAdornment,
  IconButton
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

const ContactPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: '0 auto',
  boxShadow: theme.shadows[4],
  borderRadius: theme.shape.borderRadius,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

export const ContactLawyerForm = () => {
  const [formData, setFormData] = React.useState({
    subject: '',
    details: '',
    contactMethod: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
    // Здесь будет логика отправки формы
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Свяжитесь с адвокатом
      </Typography>
      
      <ContactPaper elevation={3}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Тема обращения"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Подробности дела"
            name="details"
            value={formData.details}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          
          <TextField
            fullWidth
            label="Средство для обратной связи"
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleChange}
            margin="normal"
            required
            placeholder="Email или телефон"
          />
          
          <Box sx={{ mt: 2, mb: 3 }}>
            <input
              accept=".pdf,.doc,.docx,.jpg,.png"
              style={{ display: 'none' }}
              id="case-file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="case-file-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<AttachFileIcon />}
              >
                Загрузить дело
              </Button>
            </label>
            {formData.file && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Выбран файл: {formData.file.name}
              </Typography>
            )}
          </Box>
          
          <SubmitButton
            fullWidth
            variant="contained"
            type="submit"
            endIcon={<SendIcon />}
          >
            Отправить запрос
          </SubmitButton>
        </form>
      </ContactPaper>
    </Container>
  );
};