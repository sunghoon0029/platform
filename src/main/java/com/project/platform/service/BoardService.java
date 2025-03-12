package com.project.platform.service;

import com.project.platform.dto.request.board.BoardRequest;
import com.project.platform.dto.response.board.BoardListResponse;
import com.project.platform.dto.response.board.BoardResponse;
import com.project.platform.entity.Board;
import com.project.platform.entity.BoardType;
import com.project.platform.entity.User;
import com.project.platform.repository.BoardRepository;
import com.project.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public BoardResponse save(Authentication authentication, BoardRequest request) {
        String email = authentication.getName();
        System.out.println(email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));

        Board board = request.toEntity(user);

        Board savedBoard = boardRepository.save(board);

        return BoardResponse.toDTO(savedBoard);
    }

    public Page<BoardListResponse> listAll(Pageable pageable) {
        return boardRepository.findAll(pageable)
                .map(BoardListResponse::toDTO);
    }

    public Page<BoardListResponse> listByType(Pageable pageable, BoardType type) {
        return boardRepository.findByType(type, pageable)
                .map(BoardListResponse::toDTO);
    }

    public BoardResponse findById(Long id) throws Exception {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new Exception("게시글 정보를 찾을 수 없습니다."));

        return BoardResponse.toDTO(board);
    }

    public void incrementView(Long id) throws Exception {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new Exception("게시글 정보를 찾을 수 없습니다."));

        board.incrementView();
        boardRepository.save(board);
    }

    public BoardResponse findByTitle(String title) throws Exception {
        Board board = boardRepository.findByTitle(title)
                .orElseThrow(() -> new Exception("게시글 정보를 찾을 수 없습니다."));

        return BoardResponse.toDTO(board);
    }

    @Transactional
    public BoardResponse update(Long id, BoardRequest request) throws Exception {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new Exception("게시글 정보를 찾을 수 없습니다."));

        board.update(request);

        return BoardResponse.toDTO(board);
    }

//    public BoardResponse update(String title, BoardRequest request) throws Exception {
//        Board board = boardRepository.findByTitle(title)
//                .orElseThrow(() -> new Exception("게시글 정보를 찾을 수 없습니다."));
//
//        board.update(request);
//        boardRepository.save(board);
//
//        return BoardResponse.toDTO(board);
//    }

    @Transactional
    public void delete(Long id) {
        boardRepository.deleteById(id);
    }
}
