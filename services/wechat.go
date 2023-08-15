package services

import (
	"fence_server/initialize"
	"fmt"
	"github.com/fastwego/offiaccount/apis/account"
	"github.com/fastwego/offiaccount/apis/message/template"
	"github.com/fastwego/offiaccount/apis/user"
	"github.com/tidwall/gjson"
	"log"
	"net/url"
	"time"
)

func GetWechatQrcodeTicket() string {
	wechat := initialize.GetWechat()
	payload := []byte(`{"action_name": "QR_STR_SCENE", "action_info": {"scene": {"scene_str": "wlw"}}}`)
	ticket, err := account.CreateQRCode(wechat, payload)
	if err != nil {
		log.Fatal(err)
		return ""
	}
	return string(ticket)
}

func SendMessage(timestamp int64) {
	wechat := initialize.GetWechat()
	param := url.Values{}
	get, err := user.Get(wechat, param)
	if err != nil {
		return
	}
	currentTime := time.Unix(timestamp, 0)
	gjson.Get(string(get), "data.openid").ForEach(func(key, value gjson.Result) bool {
		message := fmt.Sprintf(`{
    "touser": "%s",
    "template_id": "M2gX5RrVtq5NxPS4tK_lvQfa8PmmDRK49HVrd83rfV4",
    "url": "http://clwen.top/test.html",
    "client_msg_id": "%s",
    "data": {
        "name": {
            "value": " 物联网测试 ",
        },
        "time": {
            "value": "%s",
        }
    }
}`, value, currentTime, currentTime.Format("2006-01-02 15:04:05"))
		payload := []byte(message)
		send, err := template.Send(wechat, payload)
		if err != nil {
			fmt.Printf("err: %v\n", err)
			return true
		}
		fmt.Printf("send: %v\n", string(send))
		return true
	})
}
