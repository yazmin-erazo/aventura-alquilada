package com.digitalbooking.digitalbooking.common.response;

public class ErrorResponse {

    private String nombreExcepcion;
    private String mensaje;

    public ErrorResponse(String nombreExcepcion, String mensaje) {
        this.nombreExcepcion = nombreExcepcion;
        this.mensaje = mensaje;
    }

    public String getNombreExcepcion() {
        return nombreExcepcion;
    }

    public String getMensaje() {
        return mensaje;
    }

}
