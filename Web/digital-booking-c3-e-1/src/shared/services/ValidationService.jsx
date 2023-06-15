const ValidationService = {
  patterns: {
    name: /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ'][a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s']*$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    pass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/,
  },

  errorMessages: {
    req: "Este campo es obligatorio",
    name: "Debe ser solo letras y al menos contener 3 letras",
    email: "Debes introducir una dirección de correo válida",
    pass: "Debes introducir una contraseña de al menos 6 caracteres, que contenga, al menos, una mayúscula y un número",
  },
};

export default ValidationService;
