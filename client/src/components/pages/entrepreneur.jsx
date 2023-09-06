import React, { useEffect, useState } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid"; // เพิ่มอิมพอร์ตสำหรับ Grid

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
            ข้อมูลส่วนตัว
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Card>
              <CardContent style={{ textAlign: "left" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  </Grid><Grid item xs={12} sm={6}>
                    <Typography
                      component="h1"
                      variant="h5"
                      color="text.primary"
                      gutterBottom
                    >
                      Map
                    </Typography>
                    <div
                      style={{
                        position: "relative",
                        paddingBottom: "75%", // สัดส่วนของแผนที่
                        height: 0,
                        overflow: "hidden",
                      }}
                    >
                      <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.6336779969315!2d100.19645547515051!3d16.745120084036667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30dfbe9bcfe26897%3A0xd643532d92c6aee8!2zQ29mZmVlIFNwYWNlIOC4quC4suC4guC4suC4m-C4o-C4sOC4leC4uSA0!5e0!3m2!1sth!2sth!4v1694017726141!5m2!1sth!2sth"
                        width="100%"
                        height="100%"
                        style={{ position: "absolute", top: 0, left: 0 }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </Grid>

                  
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
