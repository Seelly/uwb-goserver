package global

import (
	"fence_server/models"
	"gorm.io/gorm"
	"time"
)

var (
	PGSQL        *gorm.DB
	DATACHAN     chan []byte
	Border       models.Border
	Period       int64 = 1
	LastSentTime int64
	NextSentTime int64
	TIMEZONE     *time.Location
)
