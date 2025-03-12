package com.project.platform.controller;

import com.project.platform.dto.request.board.BoardRequest;
import com.project.platform.dto.response.board.BoardListResponse;
import com.project.platform.dto.response.board.BoardResponse;
import com.project.platform.entity.BoardType;
import com.project.platform.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/")
    public ResponseEntity<BoardResponse> save(Authentication authentication, @RequestBody BoardRequest request) {
        return ResponseEntity.ok(boardService.save(authentication, request));
    }

    @GetMapping
    public ResponseEntity<Page<BoardListResponse>> list(
            @PageableDefault(size = 5, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(value = "type", required = false) BoardType type) {
        if (type == null) {
            return ResponseEntity.ok(boardService.listAll(pageable));
        } else {
            return ResponseEntity.ok(boardService.listByType(pageable, type));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardResponse> findById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(boardService.findById(id));
    }

    @PostMapping("/{id}/increment-view")
    public ResponseEntity<Void> incrementView(@PathVariable Long id) throws Exception {
        boardService.incrementView(id);
        return ResponseEntity.ok().build();
    }


//    @GetMapping("/{title}")
//    public ResponseEntity<BoardResponse> findByTitle(@PathVariable String title) throws Exception {
//        return ResponseEntity.ok(boardService.findByTitle(title));
//    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardResponse> update(@PathVariable Long id, @RequestBody BoardRequest request) throws Exception {
        return ResponseEntity.ok(boardService.update(id, request));
    }

//    @PutMapping("/{title}")
//    public ResponseEntity<BoardResponse> update(@PathVariable String title, @RequestBody BoardRequest request) throws Exception {
//        return ResponseEntity.ok(boardService.update(title, request));
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        boardService.delete(id);
        return ResponseEntity.ok("게시글 삭제 완료");
    }
}
