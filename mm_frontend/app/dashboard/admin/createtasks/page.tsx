'use client';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { UserData } from '@/app/lib/definitions';

export default function CreateTaskPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [taskName, setTaskName] = useState('');
  const [voucherPoints, setVoucherPoints] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!taskName || !voucherPoints) {
      setError('Both fields are required.');
      setIsSubmitting(false);
      return;
    }

    const taskData = {
      task: taskName,
      voucher_amount: parseInt(voucherPoints),
      is_approved: false,
      uuid: 0, // You can modify this based on the user_id or any other logic
    };

    try {
      const response = await fetch('http://localhost:4000/api/users/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Task created successfully!');
        // Clear the form after submission
        setTaskName('');
        setVoucherPoints('');
      } else {
        setError(data.message || 'Failed to create task');
      }
    } catch (err) {
      setError('An error occurred while creating the task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create Task</h1>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="taskName">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="voucherPoints">
          <Form.Label>Voucher Points</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter voucher points"
            value={voucherPoints}
            onChange={(e) => setVoucherPoints(e.target.value)}
          />
        </Form.Group>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create Task'}
        </Button>
      </Form>
    </div>
  );
}


// 'use client'
// import { Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect, useState } from 'react';
// import { UserData } from '@/app/lib/definitions';


// export default function AdminPage() {
// //   const [userData, setUserData] = useState(null);
//   const [userData, setUserData] = useState<UserData | null>(null);
 
//   useEffect(() => {
//     // Check if user data is available in localStorage
//     const storedUserData = localStorage.getItem('userData');
//     if (storedUserData) {
//       setUserData(JSON.parse(storedUserData));
//     }
//   }, []);

//   if (!userData) {
//     return <p>Loading...</p>; // You can show a loading indicator while waiting for user data
//   }

//   // Ensure the user is an admin before showing the content
//   if (userData.role !== 'admin') {
//     return <p>Access Denied. You are not authorized to view this page.</p>;
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Create Task</h1>
//       <p>Welcome, Admin {userData.username}!</p>
//       {/* Add any admin-specific content here */}
//     </div>
//   );
// }