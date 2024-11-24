import React from 'react';
import { Link } from 'react-router-dom';

import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const Sidebar = () => {
  return (
    <Drawer
        variant="permanent"
        anchor="left"
        sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
                position: 'fixed',
                top: 64,
                height: '100vh',
            },
        }}
    >
        <List>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/">
                    <ListItemText primary="홈" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/board">
                    <ListItemText primary="게시판" />
                </ListItemButton>
            </ListItem>
        </List>
    </Drawer>
  );
};

export default Sidebar;