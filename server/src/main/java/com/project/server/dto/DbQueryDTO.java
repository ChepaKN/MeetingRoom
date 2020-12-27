package com.project.server.dto;

public class DbQueryDTO {
    private final Long startOfWeek;
    private final Long endOfWeek;

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

}
