'use client'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if user data is available in localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (!userData) {
    return <p>Loading...</p>; // You can show a loading indicator while waiting for user data
  }

  // Ensure the user is an admin before showing the content
  if (userData.role !== 'admin') {
    return <p>Access Denied. You are not authorized to view this page.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin {userData.username}!</p>
      {/* Add any admin-specific content here */}
    </div>
  );
}
