import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, CircularProgress, Divider, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { fetchProfile } from '../../store/reducers/userSlice';
import { deleteBoard, fetchBoardDetail, incrementView } from '../../store/reducers/boardSlice';

const BoardDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const { accessToken } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user);
    const { board, status, error } = useSelector((state) => state.board);
    
    useEffect(() => {
        dispatch(fetchBoardDetail(id));
        dispatch(incrementView(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchProfile(accessToken));
        }
    }, [dispatch, accessToken]);

    const handleDelete = async () => {
        if (window.confirm("정말 게시글을 삭제하시겠습니까?")) {
            try {
                await dispatch(deleteBoard(id)).unwrap();
                navigate('/board');
            } catch (err) {
                console.error("게시글 삭제 실패:", err);
            }
        }
    };

    if (status === "pending") return <CircularProgress />;
    if (status === "failed") return <Typography color="error">오류: {error}</Typography>;
    if (!board) return <Typography>게시글을 찾을 수 없습니다.</Typography>;

    const formattedDate = dayjs(board.createdDate).format('YYYY.MM.DD HH:mm');
    const isAuthor = user?.id === board.authorId;

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
        <Typography variant="h4">{board.title}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {board.author}
        </Typography>
        <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
            {formattedDate} 조회 {board.view}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
            {board.contents}
        </Typography>

        {isAuthor && (
            <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={() => navigate(`/board/edit/${board.id}`)}
                >
                    수정
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                >
                    삭제
                </Button>
            </Box>
        )}
    </Box>
  );
};

export default BoardDetail;