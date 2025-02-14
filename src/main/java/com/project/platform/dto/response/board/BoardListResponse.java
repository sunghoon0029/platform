package com.project.platform.dto.response.board;

import com.project.platform.entity.Board;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class BoardListResponse {

    private Long id;
    private String title;
    private String author;
    private LocalDateTime createdDate;
    private int view;

    public static BoardListResponse toDTO(Board board) {
        return BoardListResponse.builder()
                .id(board.getId())
                .title(board.getTitle())
                .author(board.getUser().getName())
                .createdDate(board.getCreatedDate())
                .view(board.getView())
                .build();
    }
}
