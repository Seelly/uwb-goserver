package router

import (
	"fence_server/controller"
	"github.com/gin-gonic/gin"
)

func initGin() *gin.Engine {
	r := gin.Default()
	return r
}
func initRouter(r *gin.Engine) {
	r.Use(func() gin.HandlerFunc {
		return func(c *gin.Context) {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
			c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Content-Type, Authorization")
			if c.Request.Method == "OPTIONS" {
				c.AbortWithStatus(204)
				return
			}
			c.Next()
		}
	}())
	r.Static("/css", "static/css")
	r.Static("/js", "static/js")
	r.Static("/fonts", "static/fonts")
	r.LoadHTMLGlob("templates/*")
	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", nil)
		return
	})
	r.GET("/ws", controller.WsHandle)
	api := r.Group("/api")
	api.POST("/ws", controller.DataHandle)
	api.POST("/init", controller.InitConfig)
	api.GET("/query", controller.Querydb)
	api.GET("/qrcode", controller.GetQrcodeTicket)
	//return r
}
