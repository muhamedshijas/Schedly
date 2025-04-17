import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import { Download, Today, Close } from "@mui/icons-material";
import timetabledata from "../data/timetabledata";

export default function Timetable() {
  const [showModal, setShowModal] = useState(false);
  const today = format(new Date(), "EEEE");

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Weekly Timetable`, 14, 16);

    let y = 30;
    const lineHeight = 6;
    const pageHeight = doc.internal.pageSize.height;

    Object.entries(timetabledata).forEach(([day, items]) => {
      if (y + 10 > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(14);
      doc.text(day, 14, y);
      y += 10;

      doc.setFontSize(12);
      items.forEach((item) => {
        if (y + lineHeight > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        doc.text(`- ${item.time}: ${item.activity}`, 14, y);
        y += lineHeight;
      });

      y += 10;
    });

    doc.save("Weekly_Timetable.pdf");
  };
  console.log(timetabledata[today]);
  return (
    <div
      style={{
        padding: 24,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          px: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#1976d2",
            mr: 2,
          }}
        >
          Schedly
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowModal(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
            px: 3,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 3,
            mt: { xs: 2, sm: 0 },
          }}
        >
          <Today />
          View More
        </Button>
      </Box>

      {/* Subheading */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 400,
          color: "#333",
          textAlign: "center",
          mb: 3,
        }}
      >
        Welcome to Schedly, your personalized timetable tracker. Stay organized
        by keeping track of your daily activities.
      </Typography>
      <Card
        sx={{
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
          borderRadius: 3,
          boxShadow: 4,
          p: 2,
          maxWidth: 400,
          maxHeight: 170,
          mx: "auto",
          mb: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#0d47a1",
              textAlign: "center",
              mb: 2,
            }}
          >
            🌙 Today’s Dua – {today}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: "1.5rem",
              textAlign: "center",
              color: "#1a237e",
              
            }}
          >
            {timetabledata[today].dua}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontStyle: "italic",
              textAlign: "center",
              color: "#4a148c",
            }}
          >
            {`(${timetabledata[today].meaning})`}
          </Typography>
        </CardContent>
      </Card>
      {/* Today's Timetable Section */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#1976d2",
          textAlign: "center",
          mb: 3,
        }}
      >
        Today's Timetable – {today}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {timetabledata[today]?.schedule.length > 0 ? (
          timetabledata[today]?.schedule.map((item, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  width: 300,
                  height: 200,
                  backgroundColor:
                    index % 4 === 0
                      ? "#e8f5e9"
                      : index % 4 === 1
                      ? "#e3f2fd"
                      : index % 4 === 2
                      ? "#fce4ec"
                      : "#f5f5f5",
                  borderRadius: 2,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#333",
                      textAlign: "center",
                      mb: 1,
                    }}
                  >
                    {item.time}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: "#555",
                      textAlign: "center",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.activity}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: "#ffebee",
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "150px",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#f44336",
                    fontStyle: "italic",
                    textAlign: "center",
                  }}
                >
                  No timetable available.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Full Timetable Dialog */}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Full Weekly Timetable
        </DialogTitle>
        <DialogContent dividers>
          {Object.entries(timetabledata).map(([day, items]) => (
            <div key={day} style={{ marginBottom: 16 }}>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                {day}
              </Typography>
              <List dense>
                {items.schedule.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 500 }}>
                          <strong>{item.time}</strong>: {item.activity}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowModal(false)}
            color="secondary"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          >
            <Close />
            Close
          </Button>
          <Button
            onClick={downloadPDF}
            color="success"
            variant="contained"
            sx={{
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#388e3c",
              "&:hover": { backgroundColor: "#2c6e2f" },
            }}
          >
            <Download />
            Download as PDF
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
