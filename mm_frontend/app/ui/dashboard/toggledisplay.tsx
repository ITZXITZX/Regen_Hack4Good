'use client';
import { useUserTypeStore } from '@/app/store';
import { Row, Col } from 'react-bootstrap';
import clsx from 'clsx';

export default function ToggleDisplay({ setRole }: { setRole: (role: string) => void }) {
  const { isAdmin, setIsAdmin } = useUserTypeStore();

  const handleAdminClick = () => {
    if (!isAdmin) {
      setIsAdmin(true);
      setRole('admin'); // Update parent component with 'admin'
    }
  };

  const handleResidentClick = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setRole('resident'); // Update parent component with 'resident'
    }
  };

  return (
    <button className="w-22 mr-3 rounded-full">
      <Row className="d-flex justify-content-center rounded-full bg-gray-200 p-1">
        <Col
          xs={5}
          style={{ width: '100px' }}
          className={clsx('flex h-8 rounded-full text-justify', {
            'bg-blue-400 text-white': isAdmin,
            'bg-transparent': !isAdmin,
          })}
          onClick={handleAdminClick}
        >
          Admin
        </Col>
        <Col
          xs={5}
          style={{ width: '100px' }}
          className={clsx('flex h-8 rounded-full text-justify', {
            'bg-blue-400 text-white': !isAdmin,
            'bg-transparent': isAdmin,
          })}
          onClick={handleResidentClick}
        >
          Resident
        </Col>
      </Row>
    </button>
  );
}


// 'use client';
// // ui
// import { Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import clsx from 'clsx';
// // functions & state
// import { useUserTypeStore } from '@/app/store';

// export default function ToggleDisplay() {
//   const { isAdmin, setIsAdmin } = useUserTypeStore();

//   // Function to switch to Admin state
//   const handleAdminClick = () => {
//     if (!isAdmin) {
//       setIsAdmin(true); // Switch to Admin only if currently not Admin
//     }
//   };

//   // Function to switch to Resident state
//   const handleResidentClick = () => {
//     if (isAdmin) {
//       setIsAdmin(false); // Switch to Resident only if currently Admin
//     }
//   };

//   return (
//     <button className="w-22 mr-3 rounded-full">
//       <Row className="d-flex justify-content-center rounded-full bg-gray-200 p-1">
//         <Col
//           xs={5}
//           style={{ width: '100px' }}
//           className={clsx('flex h-8 rounded-full text-justify', {
//             'bg-blue-400 text-white': isAdmin,
//             'bg-transparent': !isAdmin,
//           })}
//           onClick={handleAdminClick} // Switch to Admin when clicked
//         >
//           Admin
//         </Col>
//         <Col
//           xs={5}
//           style={{ width: '100px' }}
//           className={clsx('flex h-8 rounded-full text-justify', {
//             'bg-blue-400 text-white': !isAdmin,
//             'bg-transparent': isAdmin,
//           })}
//           onClick={handleResidentClick} // Switch to Resident when clicked
//         >
//           Resident
//         </Col>
//       </Row>
//     </button>
//   );
// }


// 'use client';
// // ui
// import { Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { QueueListIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
// import clsx from 'clsx';
// import '../home.module.css';
// // functions & state
// import { useUserTypeStore } from '@/app/store';

// export default function ToggleDisplay() {
//   const { isAdmin, setIsAdmin } = useUserTypeStore();
//   return (
//     <button onClick={() => setIsAdmin(!isAdmin)} className="w-22 mr-3 rounded-full">
//       <Row className="d-flex justify-content-center rounded-full bg-gray-200 p-1">
//         <Col
//           xs={5}
//           style={{ width: '100px' }}
//           className={clsx('flex h-8 rounded-full text-justify', {
//             'bg-blue-400 text-white': isAdmin,
//             'bg-transparent': !isAdmin,
//           })}
//         >
//           Admin
//         </Col>
//         <Col
//           xs={5}
//           style={{ width: '100px' }}
//           className={clsx('flex h-8 rounded-full text-justify', {
//             'bg-blue-400 text-white': !isAdmin,
//             'bg-transparent': isAdmin,
//           })}
//         >
//           Resident
//         </Col>
//       </Row>
//     </button>
//   );
// }
