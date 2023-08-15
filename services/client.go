package services

import (
	"fence_server/common/global"
	"fence_server/models"
	"gorm.io/gorm"
	"log"
)

func NewConfig(client models.Client) error {
	var clientConfig models.Client
	err := global.PGSQL.Find(&clientConfig).Where("id=1").Error
	if err != gorm.ErrRecordNotFound {
		clientConfig.PosConfig = client.PosConfig
		clientConfig.Border = client.Border
		clientConfig.WarnPeriod = client.WarnPeriod
		global.PGSQL.Save(&clientConfig)
	}
	err = global.PGSQL.Create(&client).Error
	if err != nil {
		log.Println("create fail" + err.Error())
		return err
	}
	return nil
}

func GteConfig() (client models.Client, err error) {
	err = global.PGSQL.Find(&client).Where("id=1").Error
	return
}
