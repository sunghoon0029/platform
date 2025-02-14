import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards } from '../../store/reducers/boardSlice';
import { Alert, Box, Button, CircularProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BoardList = ({ type }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const { boards, totalPages, status, error } = useSelector((state) => state.board);

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchBoards({ page: page - 1, size: 5, type: type }));
    }, [dispatch, page, type]);

    const handleCreateBoard = () => {
        if (type) {
            navigate(`/create-board?type=${type}`);
        } else {
            navigate('/create-board');
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const headerStyle = {
        fontWeight: 'bold',
        textAlign: 'center',
    };

    const bodyStyle = {
        textAlign: 'center',
    };

    if (status === 'pending') return <CircularProgress />;

  return (
    <Box>
        {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
                {JSON.stringify(error)}
            </Alert>
        )}

        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={headerStyle}>번호</TableCell>
                        <TableCell sx={headerStyle}>제목</TableCell>
                        <TableCell sx={headerStyle}>작성자</TableCell>
                        <TableCell sx={headerStyle}>작성일</TableCell>
                        <TableCell sx={headerStyle}>조회</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {boards.map((board) => (
                        <TableRow key={board.id}>
                            <TableCell sx={bodyStyle}>{board.id}</TableCell>
                            <TableCell>{board.title}</TableCell>
                            <TableCell sx={bodyStyle}>{board.author}</TableCell>
                            <TableCell sx={bodyStyle}>{new Date(board.createdDate).toLocaleDateString()}</TableCell>
                            <TableCell sx={bodyStyle}>{board.view}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        {isAuthenticated && (
            <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button variant="outlined" color="primary" onClick={handleCreateBoard}>
                    게시글 작성
                </Button>
            </Box>
        )}

        <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                siblingCount={1}
                boundaryCount={1}
            />
        </Box>
    </Box>
  );
};

export default BoardList;