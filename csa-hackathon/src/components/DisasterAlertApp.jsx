"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocationOn, Warning, Send } from "@mui/icons-material";

const EMERGENCY_CONTACTS = [
  { name: "Local Emergency Services", phone: "911" },
  { name: "Red Cross", phone: "+1-800-RED-CROSS" },
];

const NEARBY_SHELTERS = [
  {
    id: 1,
    name: "Community Center Shelter",
    address: "123 Main St",
    resources: ["Food", "Water", "Medical Aid"],
    distance: "2.3 miles",
  },
  {
    id: 2,
    name: "City Stadium Evacuation Point",
    address: "456 Civic Way",
    resources: ["Water", "Blankets"],
    distance: "5.1 miles",
  },
];

const DisasterAlertApp = () => {
  const [location, setLocation] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Location error:", error.message);
        }
      );
    }
  }, []);

  const sendSOSNotification = () => {
    if (location) {
      const emergencyMessage = `EMERGENCY: User location https://maps.google.com/?q=${location.latitude},${location.longitude}`;
      console.log("Sending SOS:", emergencyMessage);
      setIsAlarmActive(true);
      audioRef.current?.play();
    }
  };

  const sendCommunityMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { text: newMessage, sender: "User" }]);
      setNewMessage("");
    }
  };
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error("Location error:", error.message);
        if (error.code === error.PERMISSION_DENIED) {
          alert("Please enable location access in your browser settings.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };
  return (
    <Box maxWidth={500} mx="auto" p={3} boxShadow={3} borderRadius={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" display="flex" alignItems="center">
          <LocationOn color="primary" /> {location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : "Locating..."}
        </Typography>
        <Button variant="contained" color="error" startIcon={<Warning />} onClick={sendSOSNotification}>
          SOS
        </Button>
      </Box>
      {isAlarmActive && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="error">Emergency Alarm Active!</Alert>
        </Snackbar>
      )}
      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">🏥 Nearby Shelters</Typography>
          <List>
            {NEARBY_SHELTERS.map((shelter) => (
              <ListItem key={shelter.id} divider>
                <ListItemText primary={shelter.name} secondary={`${shelter.address} - ${shelter.distance}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">💬 Community Chat</Typography>
          <List>
            {chatMessages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText primary={msg.text} secondary={msg.sender} />
              </ListItem>
            ))}
          </List>
          <Box display="flex" mt={2}>
            <TextField fullWidth value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Share updates..." />
            <IconButton color="primary" onClick={sendCommunityMessage}>
              <Send />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      <audio ref={audioRef} src="/api/placeholder/alarm.mp3" />
    </Box>
  );
};

export default dynamic(() => Promise.resolve(DisasterAlertApp), { ssr: false });