package com.project.server.controller.dto;

public class DbQueryDTO {
    private Long startOfWeek;
    private Long endOfWeek;

    public DbQueryDTO(Long startOfWeek, Long endOfWeek) {
        this.startOfWeek = startOfWeek;
        this.endOfWeek = endOfWeek;
    }

    public Long getStartOfWeek() {
        return startOfWeek;
    }

    public Long getEndOfWeek() {
        return endOfWeek;
    }

    public void setStartOfWeek(Long startOfWeek) {
        this.startOfWeek = startOfWeek;
    }

    public void setEndOfWeek(Long endOfWeek) {
        this.endOfWeek = endOfWeek;
    }
}
