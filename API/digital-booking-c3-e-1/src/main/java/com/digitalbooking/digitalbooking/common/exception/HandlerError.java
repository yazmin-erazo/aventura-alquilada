package com.digitalbooking.digitalbooking.common.exception;


import com.digitalbooking.digitalbooking.common.response.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.concurrent.ConcurrentHashMap;

@ControllerAdvice
public class HandlerError extends ResponseEntityExceptionHandler {

    private static final Logger LOGGER_ERROR = LoggerFactory.getLogger(HandlerError.class);

    private static final String ADMIN_ERROR = "Ocurrió un error favor contactar al administrador.";

    private static final ConcurrentHashMap<String, Integer> STATE_CODE = new ConcurrentHashMap<>();

    public HandlerError() {
        STATE_CODE.put(ExceptionLengthValue.class.getSimpleName(), HttpStatus.BAD_REQUEST.value());
        STATE_CODE.put(ExceptionInvalidValue.class.getSimpleName(), HttpStatus.BAD_REQUEST.value());
        STATE_CODE.put(ExceptionNullValue.class.getSimpleName(), HttpStatus.NOT_FOUND.value());
        STATE_CODE.put(ExceptionMandatoryValue.class.getSimpleName(), HttpStatus.BAD_REQUEST.value());
        STATE_CODE.put(TecnicalException.class.getSimpleName(), HttpStatus.INTERNAL_SERVER_ERROR.value());


    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ErrorResponse> handleAllExceptions(Exception exception) {
        ResponseEntity<ErrorResponse> result;

        String exceptionName = exception.getClass().getSimpleName();
        String message = exception.getMessage();
        Integer code = STATE_CODE.get(exceptionName);

        if (code != null) {
            ErrorResponse error = new ErrorResponse(exceptionName, message);
            result = new ResponseEntity<>(error, HttpStatus.valueOf(code));
        } else {
            LOGGER_ERROR.error(exceptionName, exception);
            ErrorResponse error = new ErrorResponse(exceptionName, ADMIN_ERROR);
            result = new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return result;
    }


}