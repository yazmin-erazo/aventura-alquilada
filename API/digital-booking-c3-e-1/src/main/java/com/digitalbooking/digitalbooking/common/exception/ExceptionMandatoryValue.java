package com.digitalbooking.digitalbooking.common.exception;

public class ExceptionMandatoryValue extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ExceptionMandatoryValue(String message) {
        super(message);
    }
}
