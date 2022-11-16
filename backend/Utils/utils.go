package utils

import (
	"net/http"
	"regexp"

	"github.com/labstack/echo/v4"
)

// CHECK IF VALID EMAIL FORMAT
func IsEmailValid(e string) bool {
	emailRegex := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`)
	return emailRegex.MatchString(e)
}

// SEND MESSAGE IF ERROR IS CAUSED BECAUSE SERVER CANT FIND SUCH ITEM
func NotFoundErrorHandler(err error) error {
	if err.Error() == "record not found" {
		return echo.NewHTTPError(http.StatusNotFound, "User with such email has not been found!")
	}
	panic(err)
}
