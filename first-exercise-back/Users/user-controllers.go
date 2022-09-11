package users

import (
	"encoding/json"
	models "firstExerciseBack/Models"
	storage "firstExerciseBack/Storage"
	utils "firstExerciseBack/Utils"
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
)

func getUsersHandler(c echo.Context) error {
	var users [](models.User)
	queryUsers := storage.DB.Find(&users)

	if queryUsers.Error != nil {
		panic(queryUsers.Error)
	}

	return c.JSON(http.StatusOK, users)
}

func createUserHandler(c echo.Context) error {
	user := models.User{}
	body, err := ioutil.ReadAll(c.Request().Body)

	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(body, &user)

	if err != nil {
		panic(err)
	}

	if len(user.Name) < 3 || len(user.Password) < 3 || !utils.IsEmailValid(user.Email) {
		panic("Wrong inputs!")
	}

	newUser := storage.DB.Create(&user)

	if newUser.Error != nil {
		panic(newUser.Error)
	}

	return c.JSON(http.StatusOK, user)
}

func getUserHandler(c echo.Context) error {
	user := models.User{}
	userEmail := c.Param("user_email")
	queryUser := storage.DB.Where("Email = ?", userEmail).First(&user)

	if queryUser.Error != nil {
		return utils.NotFoundErrorHandler(queryUser.Error)

	}

	return c.JSON(http.StatusOK, user)
}

func updateUserHandler(c echo.Context) error {
	user := models.User{}
	userEmail := c.Param("user_email")

	body, err := ioutil.ReadAll(c.Request().Body)

	if err != nil {
		panic(err)
	}

	queryUser := storage.DB.Where("Email = ?", userEmail).First(&user)

	if queryUser.Error != nil {
		return utils.NotFoundErrorHandler(queryUser.Error)
	}

	err = json.Unmarshal(body, &user)

	if len(user.Name) < 3 || len(user.Password) < 3 || !utils.IsEmailValid(user.Email) {
		panic("Wrong inputs!")
	}

	updatedUser := storage.DB.Model(&user).Where("Email = ?", userEmail).Updates(user)

	if updatedUser.Error != nil {
		panic(updatedUser.Error)
	}

	return c.JSON(http.StatusOK, user)
}

func deleteUserHandler(c echo.Context) error {
	user := models.User{}
	userEmail := c.Param("user_email")
	queryUser := storage.DB.Where("Email = ?", userEmail).First(&user)
	if queryUser.Error != nil {
		return utils.NotFoundErrorHandler(queryUser.Error)
	}

	deletedUser := storage.DB.Unscoped().Delete(&user, "Email = ?", userEmail)
	if deletedUser.Error != nil {
		panic(deletedUser.Error)
	}

	return c.JSON(http.StatusOK, user)
}
