package controller

import (
	"encoding/json"
	"fence_server/common/global"
	"fence_server/models"
	"fence_server/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"log"
	"time"
)

type Client struct {
	id   int64
	conn *websocket.Conn
}

func WsHandle(c *gin.Context) {
	// 建立连接
	var ws Client
	ws.conn = services.ConnectSocket(c)
	ws.id = time.Now().Unix()
	clientConfig, err := services.GteConfig()
	if err != nil {
		log.Printf("get err:%v", err)
	}
	global.Border = clientConfig.Border
	go services.SendData()
	jsonData, err := json.Marshal(clientConfig)
	global.DATACHAN <- jsonData
	return
}

func DataHandle(c *gin.Context) {
	var posreq models.QtPosition
	err := c.ShouldBindJSON(&posreq)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("posreq: %v\n", posreq)
	services.Coordinate(posreq)
}
