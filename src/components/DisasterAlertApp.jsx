"use client";
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  Button, 
  Box, 
  TextField 
} from '@mui/material';
import { 
  Warning as AlertIcon, 
  LocationOn as LocationIcon, 
  Chat as ChatIcon, 
  LocalHospital as HospitalIcon, 
  Phone as PhoneIcon, 
  Newspaper as NewsIcon, 
  Send as SendIcon 
} from '@mui/icons-material';

const DisasterAlertApp = () => {
  const [location, setLocation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const emergencyContacts = [
    { name: 'Emergency Services', number: '112' },
    { name: 'Local Hospital', number: '555-0123' },
    { name: 'Police Department', number: '100' }
  ];

  const newsUpdates = [
    { id: 1, title: " Land Slides", description: "Residents advised to move to Safer place.", severity: "high" },
    { id: 2, title: "Emergency Shelter Opens", description: "New shelter available at Central Community Center.", severity: "medium" },
    { id: 3, title: "Power Outage Expected", description: "Prepare for possible blackouts tonight.", severity: "low" }
  ];
 
  
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        }
      );
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, timestamp: new Date().toLocaleTimeString(), sender: 'You' }]);
      setNewMessage('');
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#ffdbe9', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom color="error">
        Disaster Alert System
      </Typography>

      {/* Emergency SOS and Location Tracking Cards */}
      <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
        <Card sx={{ width: 300 }}>
          <CardHeader 
            avatar={<AlertIcon color="error" />} 
            title="Emergency SOS" 
          />
          <CardContent>
            <Button fullWidth variant="contained" color="error" onClick={() => alert('SOS Alert Triggered!')}>
              SOS EMERGENCY
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ width: 300 }}>
          <CardHeader 
            avatar={<LocationIcon color="primary" />} 
            title="Location Tracking" 
          />
          <CardContent>
            <Button fullWidth variant="contained" color="primary" onClick={getLocation}>
              Get Current Location
            </Button>
            {location && (
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Latest Updates Card */}
      <Card sx={{ marginTop: 3 }}>
        <CardHeader 
          avatar={<NewsIcon color="success" />} 
          title="Latest Updates" 
        />
        <CardContent>
          {newsUpdates.map((news) => (
            <Box 
              key={news.id} 
              sx={{ 
                padding: 1, 
                borderLeft: `5px solid ${news.severity === 'high' ? 'red' : 'orange'}`
              }}
            >
              <Typography variant="h6">{news.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {news.description}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Community Chat Card */}
      <Card sx={{ marginTop: 3 }}>
        <CardHeader 
          avatar={<ChatIcon color="secondary" />} 
          title="Community Chat" 
        />
        <CardContent>
          <Box sx={{ height: 200, overflowY: 'auto', padding: 1, backgroundColor: '#ffb7ce', borderRadius: 1 }}>
            {messages.map((msg, index) => (
              <Typography key={index} variant="body2">
                {msg.timestamp}: {msg.text}
              </Typography>
            ))}
          </Box>
          <Box display="flex" gap={1} marginTop={2}>
            <TextField 
              fullWidth 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)} 
              placeholder="Type your message..." 
            />
            <Button variant="contained" color="secondary" onClick={handleSendMessage}>
              <SendIcon />
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Emergency Contacts and Resources Cards */}
      <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center" marginTop={3}>
        <Card sx={{ width: 300 }}>
          <CardHeader 
            avatar={<PhoneIcon color="warning" />} 
            title="Emergency Contacts" 
          />
          <CardContent>
            {emergencyContacts.map((contact, index) => (
              <Typography key={index} variant="body2">
                {contact.name}: {contact.number}
              </Typography>
            ))}
          </CardContent>
        </Card>

        <Card sx={{ width: 300 }}>
          <CardHeader 
            avatar={<HospitalIcon color="info" />} 
            title="Emergency Resources" 
          />
          <CardContent>
            <Typography variant="body2">
              Shelter available at Central Community Center.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DisasterAlertApp;