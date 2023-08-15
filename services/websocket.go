package services

import (
	"encoding/json"
	"fence_server/common/global"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"sync"
	"time"
)

var mutex sync.Mutex // 添加互斥锁
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}
var connection []*websocket.Conn

func ConnectSocket(c *gin.Context) *websocket.Conn {
	connection = make([]*websocket.Conn, 0)
	// 获取WebSocket连接
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		panic(err)
	}
	connection = append(connection, ws)
	//go heartbeat(ws) // 心跳检测
	return ws
}

func SendData() {
	for {
		fmt.Printf("global.DATACHAN: %v\n", global.DATACHAN)
		select {
		case data := <-global.DATACHAN:
			var v interface{}
			_ = json.Unmarshal(data, &v)
			for _, conn := range connection {
				mutex.Lock()
				err := conn.WriteJSON(v)
				if err != nil {
					panic(err)
					return
				}
				mutex.Unlock()
			}
			fmt.Print("send")
		}
	}
}

func heartbeat(conn *websocket.Conn) {
	ticker := time.NewTicker(10 * time.Second)
	defer ticker.Stop()
	for {
		select {
		case <-ticker.C:
			if err := conn.WriteMessage(websocket.TextMessage, []byte("pong")); err != nil {
				log.Println("ping error:", err)
				return
			}
		}
	}
}
