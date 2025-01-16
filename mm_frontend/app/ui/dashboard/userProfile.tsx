'use client';
// next & react
import Image from 'next/image';
import { useEffect } from 'react';
// ui
import { Row, Dropdown } from 'react-bootstrap';
// functions & state
import { signout } from '@/app/functions';
import { shortenString } from '@/app/functions';
import { useUserStore } from '@/app/store';

export default function UserProfile() {
  // to handle local storage
  const { userData, setUserData } = useUserStore();

  useEffect(() => {
    // Retrieve userDataString from localStorage
    const userDataString: string | null = localStorage.getItem('userData');

    // Check if userDataString is null (no data found in localStorage)
    if (userDataString != null) {
      // Parse userDataString into userData object
      setUserData(JSON.parse(userDataString));
    }
  }, []);

  // handle sign out
  const handleSignOut = () => {
    // Clear localStorage
    localStorage.clear();
    // Clear cookies
    signout().then((success) => {
      if (success) {
        alert('Sign out successful');
      } else {
        alert('Sign out failed');
      }
    });
  };

  return (
    <div className="d-flex flex-column align-items-center mb-4 w-48 border-t-2 border-slate-300">
      <Dropdown>
        <Dropdown.Toggle
          as="div"
          className="custom-dropdown-toggle mt-4 flex flex-col"
        >
          <Image
            src="/user-profile.png"
            width={40}
            height={40}
            className="justify-content-center mb-2 flex rounded-full"
            alt="User Profile"
          />
          <Row className="justify-content-center flex font-semibold">
            {shortenString(userData.username, 8)}
          </Row>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            href="/dashboard/user"
            style={{ textDecoration: 'none', color: 'inherit' }}
            className="content-center text-sm"
          >
            Edit Profile
          </Dropdown.Item>
          <Dropdown.Item
            href="/"
            className="text-sm"
            onClick={handleSignOut}
            style={{ textDecoration: 'none', color: 'red' }}
          >
            Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
