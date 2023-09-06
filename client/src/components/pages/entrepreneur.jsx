import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card'; // เพิ่มอิมพอร์ตสำหรับ Card
import CardContent from '@mui/material/CardContent'; // เพิ่มอิมพอร์ตสำหรับ CardContent

const defaultTheme = createTheme();

export default function Album() {
  const [account, setAccount] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get("http://localhost:3000/entrepreneur", {
        headers,
      });
      setAccount(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
          <Card> {/* เพิ่ม Card */}
  <CardContent style={{ textAlign: 'left' }}> {/* ใช้ inline CSS เพื่อจัดข้อมูลไปทางซ้าย */}
    <Typography
      component="h1"
      variant="h5"
      color="text.primary"
      gutterBottom
    >
      Shop Name
    </Typography>
    <Typography
      component="h1"
      variant="h5"
      color="text.secondary"
    >
      {account.shopname}
    </Typography>
    <Typography
      component="h1"
      variant="h5"
      color="text.primary"
      gutterBottom
    >
      Detail
    </Typography>
    <Typography
      component="h1"
      variant="h5"
      color="text.secondary"
    >
      {account.detail}
    </Typography>

    <Typography
      component="h1"
      variant="h5"
      color="text.primary"
      gutterBottom
    >
      Province
    </Typography>
    <Typography
      component="h1"
      variant="h5"
      color="text.secondary"
    >
      {account.province}
    </Typography>
    <Typography
      component="h1"
      variant="h5"
      color="text.primary"
      gutterBottom
    >
      Location
    </Typography>
    <Typography
      component="h1"
      variant="h5"
      color="text.secondary"
    >
      {account.location}
    </Typography>
    <Typography
      component="h1"
      variant="h5"
      color="text.primary"
      gutterBottom
    >
      Usersname
    </Typography>
    <Typography
      component="h1"
      variant="h5"
      color="text.secondary"
    >
      {account.usersname}
    </Typography>
  </CardContent>
</Card>

          </Container>
        </Box>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
