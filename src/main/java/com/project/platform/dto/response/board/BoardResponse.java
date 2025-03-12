package com.project.platform.dto.response.board;

import com.project.platform.entity.Board;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class BoardResponse {

    private Long id;
    private String title;
    private String contents;
    private Long authorId;
    private String author;
    private LocalDateTime createdDate;
    private int view;

    public static BoardResponse toDTO(Board board) {
        return BoardResponse.builder()
                .id(board.getId())
                .title(board.getTitle())
                .contents(board.getContents())
                .authorId(board.getUser().getId())
                .author(board.getUser().getName())
                .createdDate(board.getCreatedDate())
                .view(board.getView())
                .build();
    }
}
