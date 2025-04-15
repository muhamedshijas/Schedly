import React, { useState } from "react";
import { format } from "date-fns";
import {jsPDF} from 'jspdf'
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
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
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
    Object.entries(timetabledata).forEach(([day, items]) => {
      doc.setFontSize(14);
      doc.text(day, 14, y);
      y += 10;

      doc.setFontSize(12);
      items.forEach((item) => {
        doc.text(`- ${item}`, 14, y);
        y += 6;
      });

      y += 10;
    });

    doc.save("Weekly_Timetable.pdf");
  };

  return (
    <div style={{ padding: 24, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#1976d2",
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        Today's Timetable – {today}
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          marginBottom: 3,
        }}
      >
        {timetabledata[today]?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                backgroundColor:
                  index % 4 === 0
                    ? "#e8f5e9" // Light Green
                    : index % 4 === 1
                    ? "#e3f2fd" // Light Blue
                    : index % 4 === 2
                    ? "#fce4ec" // Light Pink
                    : "#f5f5f5", // Light Grey
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "150px",
                transition: "0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    textAlign: "center",
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )) || (
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

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
        sx={{
          marginTop: 3,
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#1565c0" },
          padding: "12px 24px",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Today />
        View Full Timetable
      </Button>

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Full Weekly Timetable</DialogTitle>
        <DialogContent dividers>
          {Object.entries(timetabledata).map(([day, items]) => (
            <div key={day} style={{ marginBottom: 16 }}>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: 600, marginBottom: 1 }}
              >
                {day}
              </Typography>
              <List dense>
                {items.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item}
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "#333",
                      }}
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
