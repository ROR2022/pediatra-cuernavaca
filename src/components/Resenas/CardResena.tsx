import React, {FC} from 'react';
import { Card, CardContent, Typography, Avatar, Box, Rating } from '@mui/material';

interface CardResenaProps {
  dataResena: {
    name: string;
    avatarUrl: string;
    resena: string;
    stars: number;
  };
}

const CardResena:FC<CardResenaProps> = ({ dataResena }) => {
  const { name, avatarUrl, resena, stars } = dataResena;

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={avatarUrl} alt={name} sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            {name}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {resena}
        </Typography>
        <Rating value={stars} readOnly />
      </CardContent>
    </Card>
  );
};

export default CardResena;
