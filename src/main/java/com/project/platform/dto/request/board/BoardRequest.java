package com.project.platform.dto.request.board;

import com.project.platform.entity.Board;
import com.project.platform.entity.BoardType;
import com.project.platform.entity.User;
import lombok.Getter;

@Getter
public class BoardRequest {

    private String title;
    private String contents;
    private BoardType type;

    public Board toEntity(User user) {
        return Board.builder()
                .user(user)
                .title(title)
                .contents(contents)
                .type(type)
                .build();
    }
}
