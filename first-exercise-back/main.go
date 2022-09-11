package main

import (
	products "firstExerciseBack/Products"
	storage "firstExerciseBack/Storage"
	users "firstExerciseBack/Users"

	"github.com/labstack/echo/v4"
)

func main() {

	e := echo.New()

	storage.ConnectDB()

	productsGroup := e.Group("/api/products")
	usersGroup := e.Group("api/users")

	products.ProductRoutes(productsGroup)
	users.UserRoutes(usersGroup)

	e.Start(":8000")
}
