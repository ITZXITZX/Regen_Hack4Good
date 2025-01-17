'use client'
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { UserData } from '@/app/lib/definitions';

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data is available in localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (userData && userData.role === 'admin') {
      // Fetch tasks from backend
      fetchTasks();
    }
  }, [userData]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/get-tasks');
      const data = await response.json();
      if (data && data.tasks) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (taskName) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/approve-task/${taskName}`, { method: 'POST' });
      if (response.ok) {
        alert('Task approved');
        fetchTasks(); // Refresh the task list
      }
    } catch (error) {
      console.error('Error approving task:', error);
    }
  };

  const handleCancel = async (taskName) => {
    console.log('Canceling task:', taskName.task);

    try {
      const response = await fetch(`http://localhost:4000/api/users/cancel-task/${taskName}`, { method: 'POST' });
      if (response.ok) {
        alert('Task canceled');
        fetchTasks(); // Fetch updated task list after canceling the task
      }
    } catch (error) {
      console.error('Error canceling task:', error);
    }
  };
  

  // const handleCancel = async (taskName) => {
  //   try {
  //     const response = await fetch(`http://localhost:4000/api/users/cancel-task/${taskName}`, { method: 'POST' });
  //     if (response.ok) {
  //       alert('Task canceled');
  //       fetchTasks(); // Refresh the task list
  //     }
  //   } catch (error) {
  //     console.error('Error canceling task:', error);
  //   }
  // };

  if (!userData) {
    return <p>Loading...</p>;
  }

  if (userData.role !== 'admin') {
    return <p>Access Denied. You are not authorized to view this page.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin {userData.username}!</p>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div>
          <h3>Task List</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Task</th>
                <th>Voucher Amount</th>
                <th>Approved</th>
                <th>UUID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.task}</td>
                  <td>{task.voucher_amount}</td>
                  <td>{task.is_approved ? 'Yes' : 'No'}</td>
                  <td>{task.uuid}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleCancel(task.task)}
                    >
                      Cancel
                    </Button>
                    &nbsp;
                    <Button
                      variant="success"
                      onClick={() => {
                        if (task.uuid !== 0) {
                          handleApprove(task.task);
                        } else {
                          alert('Approval failed: UUID is 0');
                        }
                      }}
                    >
                      Approve
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}


// 'use client'
// import { Container, Row, Col, Table, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect, useState } from 'react';
// import { UserData } from '@/app/lib/definitions';

// export default function DashboardPage() {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user data is available in localStorage
//     const storedUserData = localStorage.getItem('userData');
//     if (storedUserData) {
//       setUserData(JSON.parse(storedUserData));
//     }
//   }, []);

//   useEffect(() => {
//     if (userData && userData.role === 'admin') {
//       // Fetch tasks from backend
//       fetchTasks();
//     }
//   }, [userData]);

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/users/get-tasks');
//       const data = await response.json();
//       if (data && data.tasks) {
//         setTasks(data.tasks);
//       }
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelTask = async (taskId) => {
//     try {
//       const response = await fetch(`http://localhost:4000/api/users/cancel-task/${taskId}`, {
//         method: 'POST',
//       });
//       const data = await response.json();
//       if (data.success) {
//         // Remove the canceled task from the list
//         setTasks(tasks.filter(task => task !== taskId));
//       }
//     } catch (error) {
//       console.error('Error canceling task:', error);
//     }
//   };

//   const handleApproveTask = async (taskId) => {
//     try {
//       const response = await fetch(`http://localhost:4000/api/users/approve-task/${taskId}`, {
//         method: 'POST',
//       });
//       const data = await response.json();
//       if (data.success) {
//         // Remove the approved task from the list
//         setTasks(tasks.filter(task => task !== taskId));
//       }
//     } catch (error) {
//       console.error('Error approving task:', error);
//     }
//   };

//   if (!userData) {
//     return <p>Loading...</p>;
//   }

//   if (userData.role !== 'admin') {
//     return <p>Access Denied. You are not authorized to view this page.</p>;
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome, Admin {userData.username}!</p>

//       {loading ? (
//         <p>Loading tasks...</p>
//       ) : (
//         <div>
//           <h3>Task List</h3>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Task</th>
//                 <th>Voucher Amount</th>
//                 <th>Approved</th>
//                 <th>UUID</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map((task, index) => (
//                 <tr key={index}>
//                   <td>{task.task}</td>
//                   <td>{task.voucher_amount}</td>
//                   <td>{task.is_approved ? 'Yes' : 'No'}</td>
//                   <td>{task.uuid}</td>
//                   <td>
//                     <Button 
//                       variant="danger" 
//                       onClick={() => handleCancelTask(task.id)}
//                     >
//                       Cancel Task
//                     </Button>
//                     <Button 
//                       variant="success" 
//                       onClick={() => handleApproveTask(task.id)} 
//                       disabled={task.uuid === '0'} // Disable if UUID is 0
//                     >
//                       Approve Task
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client'
// import { Container, Row, Col, Table } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect, useState } from 'react';
// import { UserData } from '@/app/lib/definitions';

// export default function DashboardPage() {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user data is available in localStorage
//     const storedUserData = localStorage.getItem('userData');
//     if (storedUserData) {
//       setUserData(JSON.parse(storedUserData));
//     }
//   }, []);

//   useEffect(() => {
//     if (userData && userData.role === 'admin') {
//       // Fetch tasks from backend
//       fetchTasks();
//     }
//   }, [userData]);

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/users/get-tasks');
//       const data = await response.json();
//       if (data && data.tasks) {
//         setTasks(data.tasks);
//       }
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!userData) {
//     return <p>Loading...</p>;
//   }

//   if (userData.role !== 'admin') {
//     return <p>Access Denied. You are not authorized to view this page.</p>;
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome, Admin {userData.username}!</p>

//       {loading ? (
//         <p>Loading tasks...</p>
//       ) : (
//         <div>
//           <h3>Task List</h3>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Task</th>
//                 <th>Voucher Amount</th>
//                 <th>Approved</th>
//                 <th>UUID</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map((task, index) => (
//                 <tr key={index}>
//                   <td>{task.task}</td>
//                   <td>{task.voucher_amount}</td>
//                   <td>{task.is_approved ? 'Yes' : 'No'}</td>
//                   <td>{task.uuid}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// }






// 'use client'
// import { Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect, useState } from 'react';
// import { UserData } from '@/app/lib/definitions';


// export default function DashboardPage() {
//   // const [userData, setUserData] = useState(null);
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
//       <h1>Admin Dashboard</h1>
//       <p>Welcome, Admin {userData.username}!</p>
//       {/* Add any admin-specific content here */}
//     </div>
//   );
// }
