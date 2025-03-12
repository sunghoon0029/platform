package com.project.platform.repository;

import com.project.platform.entity.Board;
import com.project.platform.entity.BoardType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findByType(BoardType type, Pageable pageable);

    Optional<Board> findByTitle(String title);
}
