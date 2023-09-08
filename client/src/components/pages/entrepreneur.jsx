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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; // เพิ่ม TextField

const defaultTheme = createTheme();

export default function Album() {
  const [account, setAccount] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // สถานะโหมดแก้ไข
  const [editedData, setEditedData] = useState({}); // ข้อมูลที่ใช้สำหรับการแก้ไข

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

  function handleMapClick() {
    console.log("แผนที่ถูกคลิก");
  }

  function handleEditClick() {
    // เปิดโหมดแก้ไขข้อมูล
    setIsEditing(true);
    // ตั้งค่าข้อมูลที่จะแก้ไขโดยใช้ข้อมูลของ account ปัจจุบัน
    setEditedData({ ...account, password: "" });
  }

  function handleSaveClick() {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (editedData.password === "") {
      editedData.password = account.password;
    }
    axios
      .put("http://localhost:3000/EditEntrepreneur", editedData, { headers })
      .then((response) => {
        if (response.status === 200) {
          console.log("ข้อมูลถูกอัปเดตเรียบร้อย");
          setIsEditing(false);
          fetchData();

        } else if (response.status === 404) {
          console.error("ไม่พบผู้ประกอบการ");
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
      });
  }

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
          <Grid container spacing={2}>
            <Container maxWidth="sm">
              <Card>
                <CardContent style={{ textAlign: "left" }}>
                  <Grid container spacing={2}>
                    {/* ชื่อร้าน */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        component="h1"
                        variant="h5"
                        color="text.primary"
                        gutterBottom
                      >
                        Shop Name
                      </Typography>
                      {isEditing ? (
                        <TextField
                          label="Shop Name"
                          variant="outlined"
                          value={editedData.shopname}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              shopname: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <Typography
                          component="h1"
                          variant="h5"
                          color="text.secondary"
                        >
                          {account.shopname}
                        </Typography>
                      )}
                    </Grid>

                    {/* จังหวัด */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        component="h1"
                        variant="h5"
                        color="text.primary"
                        gutterBottom
                      >
                        Province
                      </Typography>
                      {isEditing ? (
                        <TextField
                          label="Province"
                          variant="outlined"
                          value={editedData.province}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              province: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <Typography
                          component="h1"
                          variant="h5"
                          color="text.secondary"
                        >
                          {account.province}
                        </Typography>
                      )}
                    </Grid>

                    {/* Detail */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        component="h1"
                        variant="h5"
                        color="text.primary"
                        gutterBottom
                      >
                        Detail
                      </Typography>
                      {isEditing ? (
                        <TextField
                          label="Detail"
                          variant="outlined"
                          value={editedData.detail}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              detail: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <Typography
                          component="h1"
                          variant="h5"
                          color="text.secondary"
                        >
                          {account.detail}
                        </Typography>
                      )}
                    </Grid>

                    {/* username */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        component="h1"
                        variant="h5"
                        color="text.primary"
                        gutterBottom
                      >
                        Usersname
                      </Typography>
                      {isEditing ? (
                        <TextField
                          label="Usersname"
                          variant="outlined"
                          value={editedData.usersname}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              usersname: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <Typography
                          component="h1"
                          variant="h5"
                          color="text.secondary"
                        >
                          {account.usersname}
                        </Typography>
                      )}
                    </Grid>

                    {/* location */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        component="h1"
                        variant="h5"
                        color="text.primary"
                        gutterBottom
                      >
                        location
                      </Typography>
                      {isEditing ? (
                        <TextField
                          label="location"
                          variant="outlined"
                          value={editedData.location}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              location: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <Typography
                          component="h1"
                          variant="h5"
                          color="text.secondary"
                        >
                          {account.location}
                        </Typography>
                      )}
                    </Grid>

                    {/* เพิ่มฟิลด์อื่น ๆ ในฟอร์มที่คุณต้องการแก้ไข */}
                    <Grid item xs={12}>
                      {isEditing ? (
                        <div>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleSaveClick}
                          >
                            บันทึก
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setIsEditing(false)}
                          >
                            ยกเลิก
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleEditClick}
                        >
                          แก้ไข
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Container>
            {/* ตำแหน่งการ์ดอื่น ๆ ที่คุณต้องการให้มีปุ่มแก้ไข */}
          </Grid>
        </Box>
      </main>
    </ThemeProvider>
  );
}
