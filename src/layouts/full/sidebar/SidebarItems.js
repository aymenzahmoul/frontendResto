import React from 'react';
import MenuItems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  const user = { role: 'RESTAURANT' }; // Replace with the actual user object containing the role property

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {MenuItems.map((item) => {
           if (user.role === 'admin') {
            if (item.title !== 'Dashboard' && item.title !== 'Users' && item.title !== 'Chatting') {
              return null; // Skip rendering pages other than Dashboard and Users for USER
            }
          } else if (user.role === 'RESTAURANT') {
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
