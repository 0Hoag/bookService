package com.example.bookservice.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import com.example.bookservice.dto.request.*;
import com.example.bookservice.dto.response.CreateChapterResponse;
import com.example.bookservice.entity.Chapter;
import com.example.bookservice.mapper.ChapterMapper;
import com.example.bookservice.repository.ChapterRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.bookservice.dto.response.BookResponse;
import com.example.bookservice.entity.BookProfile;
import com.example.bookservice.exception.AppException;
import com.example.bookservice.exception.ErrorCode;
import com.example.bookservice.mapper.BookMapper;
import com.example.bookservice.repository.BookRepository;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookService {

    BookRepository bookRepository;
    BookMapper bookMapper;
    ChapterRepository chapterRepository;
    ChapterMapper chapterMapper;
    public BookResponse createBook(CreateBookRequest request) {
        BookProfile bookProfile = bookMapper.toBookProfile(request);
        bookProfile = bookRepository.save(bookProfile);
        return bookMapper.toBookResponse(bookProfile);
    }

    public BookResponse createBookWithChapter(CreateBookWithChapterRequest request) {
        var book = bookMapper.toBookWithChapter(request);

        Set<Chapter> chapters = chapterRepository.findAllById(request.getChapters())
                        .stream()
                .collect(Collectors.toSet());
        book.setChapters(chapters);

        book = bookRepository.save(book);
        return bookMapper.toBookResponse(book);
    }

    public BookResponse addChaptertoBook(String bookId, AddChaptersRequest request) {
        var book = bookRepository.findById(bookId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));
        Set<Chapter> chapters = chapterRepository.findAllById(request.getChapterIds())
                .stream()
                .collect(Collectors.toSet());
        book.getChapters().addAll(chapters);

        return bookMapper.toBookResponse(bookRepository.save(book));
    }

    public BookResponse removeChapterBook(String bookId, RemoveChapterRequest request) {
        var book = bookRepository.findById(bookId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));
        Set<Chapter> chapters = chapterRepository.findAllById(request.getChapterIds())
                .stream()
                .collect(Collectors.toSet());
        book.getChapters().removeAll(chapters);

        return bookMapper.toBookResponse(bookRepository.save(book));
    }

    public BookResponse updateBookWithChapter(String bookId, UpdateBookWithChapterRequest request) {
        var book = bookRepository.findById(bookId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));
        Set<Chapter> chapters = chapterRepository.findAllById(request.getChapters())
                .stream().collect(Collectors.toSet());
        bookMapper.updateBookWithChapter(book, request);
        book.setChapters(chapters);
        return bookMapper.toBookResponse(bookRepository.save(book));
    }



//    @PreAuthorize("hasRole('ADMIN')")
    public BookResponse getBook(String bookId) {
        BookProfile bookProfile = bookRepository.findById(bookId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));

        return bookMapper.toBookResponse(bookRepository.save(bookProfile));
    }


    public BookResponse getBookWithChapter(String bookId) {
        BookProfile bookProfile = bookRepository.findById(bookId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));
        Set<Chapter> chapters = chapterRepository.findAll().stream().collect(Collectors.toSet());
        bookProfile.setChapters(chapters);
        bookProfile = bookRepository.save(bookProfile);
        BookResponse bookResponse = bookMapper.toBookResponse(bookProfile);

        return bookResponse;
    }

//    @PreAuthorize("hasRole('ADMIN')")
    public List<BookResponse> getAllBook() {
        return bookRepository.findAll().stream().map(bookMapper::toBookResponse).toList();
    }

//    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBook(String bookId) {
        BookProfile bookProfile =
                bookRepository.findById(bookId).orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));
        chapterRepository.deleteAll(bookProfile.getChapters());
        bookRepository.deleteById(bookId);
    }

//    @PreAuthorize("hasRole('ADMIN')")
    public BookResponse updateBook(String bookId, UpdateBookRequest request) {
        BookProfile bookProfile =
                bookRepository.findById(bookId).orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));
        bookMapper.updateBook(bookProfile, request);
        return bookMapper.toBookResponse(bookRepository.save(bookProfile));
    }
}
