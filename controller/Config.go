package controller

import (
	"fence_server/models"
	"fence_server/services"
	"github.com/gin-gonic/gin"
	"log"
)

func InitConfig(ctx *gin.Context) {
	//var clientConfig interface{}
	clientConfig := models.Client{}
	_ = ctx.ShouldBindJSON(&clientConfig)
	err := services.NewConfig(clientConfig)
	if err != nil {
		log.Printf("add config err :%v", err)
		ctx.JSON(200, gin.H{"code": 201, "errMsg": "fail"})
		return
	}
	ctx.JSON(200, gin.H{"code": 200, "errMsg": "OK"})
	return
}
