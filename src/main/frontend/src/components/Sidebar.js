import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Collapse, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Sidebar = () => {
    const [openBoard, setOpenBoard] = useState(false);

    const handleClickBoard = () => {
        setOpenBoard(!openBoard);
    };

  return (
    <Drawer
        variant="permanent"
        anchor="left"
        sx={{
            width: 200,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 200,
                boxSizing: 'border-box',
                position: 'fixed',
                top: 64,
                height: '100vh',
            },
        }}
    >
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={handleClickBoard}>
                    <ListItemText primary="게시판" />
                    {openBoard ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
            </ListItem>
            <Collapse in={openBoard} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/board">
                            <ListItemText primary="전체글보기" sx={{ pl: 2 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/sale-board">
                            <ListItemText primary="판매게시판" sx={{ pl: 2 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/purchase-board">
                            <ListItemText primary="구매게시판" sx={{ pl: 2 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/free-board">
                            <ListItemText primary="자유게시판" sx={{ pl: 2 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/create-board">
                            <ListItemText primary="게시글 작성 테스트" sx={{ pl: 2 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    </Drawer>
  );
};

export default Sidebar;