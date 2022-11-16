package products

import "github.com/labstack/echo/v4"

func ProductRoutes(e *echo.Group) {
	e.GET("", getProductsHandler)
	e.GET("/:product_id", getProductHandler)
	e.POST("", createProductHandler)
	e.PATCH("/:product_id", updateProductHandler)
	e.DELETE("/:product_id", deleteProductHandler)
}
