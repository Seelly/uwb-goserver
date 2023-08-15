package main

import (
	"fence_server/common/global"
	"fence_server/initialize"
	"fence_server/router"
	"github.com/spf13/viper"
	"log"
	"os"
	"time"
)

func main() {
	initConfig()
	initialize.Init()
	router.Init()
	r := router.GetGin()
	addr := viper.GetString("server.port")
	err := r.Run(addr)
	if err != nil {
		log.Fatal(err)
	}
}
func initConfig() {
	worDir, _ := os.Getwd()
	viper.AddConfigPath(worDir)
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	if err := viper.ReadInConfig(); err != nil {
		panic(err)
	}
	global.TIMEZONE, _ = time.LoadLocation("Asia/Shanghai")
}
