import { jsPDF } from "jspdf";
import React, { useState } from "react";
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

    let y = 30; // Starting y position for the first day
    Object.entries(timetabledata).forEach(([day, items]) => {
      doc.setFontSize(14);
      doc.text(day, 14, y);
      y += 10;

      doc.setFontSize(12);
      items.forEach((item) => {
        doc.text(`- ${item}`, 14, y);
        y += 6;
      });

      y += 10; // Add some space after each day
    });

    doc.save("Weekly_Timetable.pdf");
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Today's Timetable – {today}
      </Typography>

      <List dense sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}>
        {timetabledata[today]?.map((item, index) => (
          <ListItem key={index} sx={{ paddingY: 1 }}>
            <ListItemText primary={item} sx={{ fontWeight: 500 }} />
          </ListItem>
        )) || (
          <ListItem>
            <ListItemText
              primary="No timetable available."
              sx={{ color: "#f44336", fontStyle: "italic" }}
            />
          </ListItem>
        )}
      </List>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
        sx={{
          marginTop: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#1565c0" },
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
        sx={{ padding: 2 }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Full Weekly Timetable</DialogTitle>
        <DialogContent dividers>
          {Object.entries(timetabledata).map(([day, items]) => (
            <div key={day} style={{ marginBottom: 16 }}>
              <Typography variant="h6" color="secondary" sx={{ fontWeight: 600 }}>
                {day}
              </Typography>
              <List dense sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                {items.map((item, index) => (
                  <ListItem key={index} sx={{ paddingY: 1 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ marginY: 1 }} />
            </div>
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            onClick={() => setShowModal(false)}
            color="secondary"
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Close /> Close
          </Button>
          <Button
            onClick={downloadPDF}
            color="success"
            variant="contained"
            sx={{
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
