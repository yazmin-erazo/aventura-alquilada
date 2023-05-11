package com.digitalbooking.digitalbooking.common.response;

public class CommandResponse <T> {

    private T response;

    public CommandResponse(T valor) {
        this.response = valor;
    }

    public T getResponse() {
        return response;
    }
}