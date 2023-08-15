package initialize

import (
	"fence_server/models"
	"fmt"
	"github.com/go-redis/redis"
	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func initRdb() *redis.Client {
	rHost := viper.GetString("redis.host")
	rPasswd := viper.GetString("redis.password")
	rDb := viper.GetInt("redis.db")
	//rHost := "127.0.0.1:6379"
	//rPasswd := ""
	//rDb := 0
	rdb := redis.NewClient(&redis.Options{
		Addr:     rHost,
		Password: rPasswd, // no password set
		DB:       rDb,
	})
	err := rdb.Ping().Err()
	if err != nil {
		panic("redis连接失败")
	}
	return rdb
}

func initPgsql() *gorm.DB {
	host := viper.GetString("pgsql.host")
	user := viper.GetString("pgsql.user")
	password := viper.GetString("pgsql.password")
	database := viper.GetString("pgsql.database")
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=Asia/Shanghai", host, user, password, database)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("pgsql initialize fail:" + err.Error())
	}
	db.AutoMigrate(models.Client{})
	return db
}
