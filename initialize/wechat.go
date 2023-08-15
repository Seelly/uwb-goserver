package initialize

import (
	"github.com/fastwego/offiaccount"
	"github.com/spf13/viper"
)

func initWechat() *offiaccount.OffiAccount {
	app := offiaccount.New(offiaccount.Config{
		Appid:  viper.GetString("wx.appid"),
		Secret: viper.GetString("wx.secret"),
	})
	return app
}
