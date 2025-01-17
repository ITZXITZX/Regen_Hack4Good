'use client';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Assuming you have a Task type and a way to fetch tasks
interface Task {
  id: string;
  description: string;
  completedBy: string;
  status: string; // 'pending' or 'approved'
}

const AdminPage = () => {
  // State for storing tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from localStorage or an API
  useEffect(() => {
    // Example of fetching data (you can replace this with an API call)
    const fetchTasks = async () => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };
    fetchTasks();
  }, []);

  // Handle task approval
  const approveTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'approved' } : task
      )
    );
    // Update in localStorage or send to an API
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Admin Dashboard - Approve Tasks</h1>
          {tasks.length === 0 ? (
            <p>No tasks to approve.</p>
          ) : (
            <div>
              {tasks
                .filter((task) => task.status === 'pending')
                .map((task) => (
                  <div key={task.id} className="task-item">
                    <p>
                      <strong>{task.description}</strong> - Submitted by{' '}
                      {task.completedBy}
                    </p>
                    <Button
                      variant="success"
                      onClick={() => approveTask(task.id)}
                    >
                      Approve Task
                    </Button>
                  </div>
                ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;


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
//       <h1>Approve Task</h1>
//       <p>Welcome, Admin {userData.username}!</p>
//       {/* Add any admin-specific content here */}
//     </div>
//   );
// }