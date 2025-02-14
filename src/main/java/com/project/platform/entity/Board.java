package com.project.platform.entity;

import com.project.platform.dto.request.board.BoardRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "board")
public class Board extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String contents;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private int view;

    @Enumerated(EnumType.STRING)
    @Column
    private BoardType type;

    public void update(BoardRequest request) {
        this.title = request.getTitle();
        this.contents = request.getContents();
    }
}
