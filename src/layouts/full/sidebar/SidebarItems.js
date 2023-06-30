import React, { useEffect, useState } from 'react';
import MenuItems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import axios from 'axios';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const userId = localStorage.getItem('userId');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/authentication-management/userInfo/${userId}`);
        const userInfo = response.data.authority.toString();
        setUserRole(userInfo); // Update the userRole state with the resolved value
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    getUserInfo();
  }, [userId]);

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {MenuItems.map((item) => {
          if (userRole === 'ADMIN_AUTHORITY') {
            if (item.title !== 'Dashboard' && item.title !== 'Users' && item.title !== 'Chatting') {
              return null; // Skip rendering pages other than Dashboard and Users for USER
            }
          } else if (userRole === 'RESTAURANT_AUTHORITY') {
            if (item.title === 'Register' || item.title === 'Login' || item.title === 'Users') {
              return null; // Skip rendering Register, Login, and Users pages for RESTAURANT
            }
          }

          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
