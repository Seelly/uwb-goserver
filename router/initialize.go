package router

import (
	"fence_server/common/global"
	"github.com/gin-gonic/gin"
)

var R *gin.Engine

func Init() {
	R = initGin()
	initRouter(R)
	global.DATACHAN = make(chan []byte)
}

func GetGin() *gin.Engine {
	return R
}
