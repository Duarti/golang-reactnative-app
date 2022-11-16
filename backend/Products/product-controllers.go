package products

import (
	"encoding/json"
	models "firstExerciseBack/Models"
	storage "firstExerciseBack/Storage"
	utils "firstExerciseBack/Utils"
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
)

func getProductsHandler(c echo.Context) error {
	var products [](models.Product)
	queryProducts := storage.DB.Find(&products)

	if queryProducts.Error != nil {
		panic(queryProducts.Error)
	}

	return c.JSON(http.StatusOK, products)
}

func getProductHandler(c echo.Context) error {
	product := models.Product{}
	productID := c.Param("product_id")
	queryProduct := storage.DB.Where("ID = ?", productID).First(&product)

	if queryProduct.Error != nil {
		return utils.NotFoundErrorHandler(queryProduct.Error)
	}

	return c.JSON(http.StatusOK, product)
}

func createProductHandler(c echo.Context) error {
	product := models.Product{}
	body, err := ioutil.ReadAll(c.Request().Body)

	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(body, &product)

	if err != nil {
		panic(err)
	}

	productOwner := storage.DB.Where("Email = ?", product.OwnerEmail).First(&(models.User{}))

	if productOwner.Error != nil {
		return utils.NotFoundErrorHandler(productOwner.Error)
	}

	if len(product.Title) < 3 || len(product.Description) < 3 || !utils.IsEmailValid(product.OwnerEmail) {
		panic("Wrong inputs!")
	}

	newProduct := storage.DB.Create(&product)

	if newProduct.Error != nil {

		panic(newProduct.Error)
	}

	return c.JSON(http.StatusOK, product)
}

func updateProductHandler(c echo.Context) error {
	product := models.Product{}
	productID := c.Param("product_id")

	body, err := ioutil.ReadAll(c.Request().Body)

	if err != nil {
		panic(err)
	}

	queryProduct := storage.DB.Where("ID = ?", productID).First(&product)

	if queryProduct.Error != nil {
		return utils.NotFoundErrorHandler(queryProduct.Error)
	}

	err = json.Unmarshal(body, &product)

	if len(product.Title) < 3 || len(product.Description) < 3 || !utils.IsEmailValid(product.OwnerEmail) {
		panic("Wrong inputs!")
	}

	updatedProduct := storage.DB.Model(&product).Where("ID = ?", productID).Updates(product)

	if updatedProduct.Error != nil {
		panic(updatedProduct.Error)
	}

	return c.JSON(http.StatusOK, product)
}

func deleteProductHandler(c echo.Context) error {
	product := models.Product{}
	productID := c.Param("product_id")
	queryProduct := storage.DB.Where("ID = ?", productID).First(&product)
	if queryProduct.Error != nil {
		return utils.NotFoundErrorHandler(queryProduct.Error)
	}

	deletedProduct := storage.DB.Unscoped().Delete(&product, "ID = ?", productID)
	if deletedProduct.Error != nil {
		panic(deletedProduct.Error)
	}

	return c.JSON(http.StatusOK, product)
}
