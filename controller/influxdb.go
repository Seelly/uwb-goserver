package controller

import (
	"fence_server/initialize"
	"fmt"
	"github.com/gin-gonic/gin"
)

func Querydb(c *gin.Context) {
	//type timeRange struct {
	//	TimeRange string `json:"range"`
	//}
	//var tRange timeRange
	//c.ShouldBindJSON(&tRange)
	tRange := c.Query("range")
	if tRange == "" || tRange == "null" {
		tRange = "5"
	}
	timeRange := fmt.Sprintf("-%sm", tRange)
	fmt.Printf("timeRange: %v\n", timeRange)
	influx := new(initialize.Influx)
	client := influx.GetInflux()
	err := influx.Query(client, timeRange)
	if err != nil {
		c.JSON(200, gin.H{"err": err})
	}
	// 设置响应头
	c.Header("Content-Type", "text/csv")
	c.Header("Content-Disposition", "attachment;filename=result.csv")
	// 将 CSV 文件发送给前端
	c.File("result.csv")
	return
}
