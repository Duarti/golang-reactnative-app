package users

import "github.com/labstack/echo/v4"

func UserRoutes(e *echo.Group) {
	e.GET("", getUsersHandler)
	e.POST("", createUserHandler)
	e.GET("/:user_email", getUserHandler)
	e.PATCH("/:user_email", updateUserHandler)
	e.DELETE("/:user_email", deleteUserHandler)
}
