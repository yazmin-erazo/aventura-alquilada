package com.digitalbooking.digitalbooking.common.validations;


import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionLengthValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionMandatoryValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import org.apache.commons.lang3.ObjectUtils;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validator {

    private Validator() {
    }

    public static void validateMandatory(Object value, String message) {
        if (ObjectUtils.isEmpty(value)) {
            throw new ExceptionMandatoryValue(message);
        }
    }

    public static void validateMaxLength(String value, int length, String message) {
        if (value.length() > length) {
            throw new ExceptionLengthValue(message);
        }
    }

    public static <T> void validateNoEmpty(List<T> list, String message) {
        if (list.isEmpty()) {
            throw new ExceptionMandatoryValue(message);
        }
    }

    public static void validatePositive(Double value, String message) {
        if (value <= 0) {
            throw new ExceptionInvalidValue(message);
        }
    }

    public static void validateEqual(Double value, Double valueExpect, String message) {
        if (!value.equals(valueExpect)) {
            throw new ExceptionInvalidValue(message);
        }
    }

    public static void validateMinLength(Object value, int minLength, String message) {
        if (value.toString().length() < minLength) {
            throw new ExceptionLengthValue(message);
        }
    }

    public static void validateLessDate(LocalDateTime starDate, LocalDateTime endDate, String message) {
        if (starDate.toLocalDate().isAfter(endDate.toLocalDate())) {
            throw new ExceptionInvalidValue(message);
        }
    }

    public static void validateLess(Long initialNumber, Long finalNumber, String message) {
        if (initialNumber > finalNumber) {
            throw new ExceptionInvalidValue(message);
        }
    }

    public static void validateGreater(Long value, Long  greaterThan, String message) {
        if (greaterThan < value) {
            throw new ExceptionInvalidValue(message);
        }
    }

    public static void validateGreater(BigDecimal value, BigDecimal  greaterThan, String message) {
        if (value.compareTo(greaterThan) != 1) {
            throw new ExceptionInvalidValue(message);
        }
    }

    public static void validateRegex(String value, String regex, String message) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(value);

        if (!matcher.matches()) {
            throw new ExceptionInvalidValue(message);
        }
    }

    public static <E extends Enum<E>> E validateEnum(String value, Class<E> enumExpect, String message) {
        E resultEnum = null;
        if (null != value) {
            Optional<E> optionalE = Arrays.stream(enumExpect.getEnumConstants())
                    .filter(resultado -> resultado.toString().equals(value)).findFirst();

            if (optionalE.isPresent()) {
                resultEnum = optionalE.get();
            } else {
                throw new ExceptionInvalidValue(message);
            }
        }
        return resultEnum;
    }

    public static void validateNumber(String value, String message) {
        try {
            Long.parseLong(value);
        } catch (NumberFormatException numberFormatException) {
            throw new ExceptionInvalidValue(message);
        }
    }

    public static void validateWeekend(LocalDateTime date, String message) {
        if ((date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY)) {
            throw new ExceptionInvalidValue(message);
        }
    }

    public static void validateNull(Object data, String message) {
        if (data == null) {
            throw new ExceptionNullValue(message);
        }
    }

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
    );

    public static void validateEmailFormat(String email, String message) {
        Matcher matcher = EMAIL_PATTERN.matcher(email);
        if (!matcher.matches()) {
            throw new ExceptionInvalidValue(message);
        }
    }

    public static void validateOnlyChars(String value, String message) {
        if (!value.matches("[a-zA-Z]+")) {
            throw new ExceptionInvalidValue(message);
        }
    }

    public static void validatePassword(String value, String message) {
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{3,}$";

        Pattern pattern = Pattern.compile(passwordRegex);
        Matcher matcher = pattern.matcher(value);

        if (!matcher.matches()) {
            throw new ExceptionInvalidValue(message);
        }
    }
}
