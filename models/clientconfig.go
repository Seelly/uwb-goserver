package models

import "gorm.io/gorm"

type Client struct {
	gorm.Model
	PosConfig  string          `gorm:"type:jsonb" json:"data"` // 配置信息
	WarnPeriod int             `json:"period"`                 //报警频率
	Border     `json:"border"` // 范围边界
}
