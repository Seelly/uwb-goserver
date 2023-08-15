package initialize

import (
	"context"
	"encoding/csv"
	"fmt"
	"github.com/influxdata/influxdb-client-go/v2"
	"github.com/influxdata/influxdb-client-go/v2/api/write"
	"github.com/spf13/viper"
	"os"
	"time"
)

type Influx struct {
}

func (i Influx) GetInflux() influxdb2.Client {
	token := viper.GetString("influxdb.token")
	url := viper.GetString("influxdb.url")
	client := influxdb2.NewClient(url, token)
	return client
}

func (i Influx) Write(client influxdb2.Client, p *write.Point) error {
	bucket := viper.GetString("influxdb.bucket")
	org := viper.GetString("influxdb.org")
	writeAPI := client.WriteAPIBlocking(org, bucket)
	err := writeAPI.WritePoint(context.Background(), p)
	if err != nil {
		return err
	}
	return nil
}

func (i Influx) Query(client influxdb2.Client, timeRange string) error {
	org := viper.GetString("influxdb.org")
	//bucket := viper.GetString("influxdb.bucket")
	queryAPI := client.QueryAPI(org)
	// 构造查询语句
	//query := fmt.Sprintf(`SELECT * FROM "position" WHERE time = %d`, 1624127300)
	query := `from(bucket: "hiw") |> range(start: %s) |> filter(fn: (r) => r["_measurement"] == "position") |> filter(fn: (r) => r["_field"] == "x" or r["_field"] == "y") |> aggregateWindow(every: 1us, fn: mean, createEmpty: false) |> yield(name: "mean")`
	// 执行查询语句
	query = fmt.Sprintf(query, timeRange)
	result, err := queryAPI.Query(context.Background(), query)

	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return err
	}

	// 创建 CSV 文件
	file, err := os.Create("result.csv")
	if err != nil {
		return err
	}
	defer file.Close()

	// 创建 CSV writer
	writer := csv.NewWriter(file)
	defer writer.Flush()
	//写入表头
	header := []string{"开始时间", "结束时间", "时间", "字段", "值"} // 设置表头内容
	err = writer.Write(header)
	// 处理查询结果
	for result.Next() {
		// Notice when group key has changed
		if result.TableChanged() {
			fmt.Printf("table: %s\n", result.TableMetadata().String())
		}
		// Access data
		fmt.Printf("time:%v\t,field:%v\t,value: %v\n", result.Record().Time(), result.Record().Field(), result.Record().Value())
		record := []string{
			result.Record().Start().Format(time.RFC3339), // 开始时间
			result.Record().Stop().Format(time.RFC3339),  // 结束时间
			result.Record().Time().Format(time.RFC3339),  // 时间
			result.Record().Field(),                      // 字段
			fmt.Sprintf("%v", result.Record().Value()),   // 值
		}
		err := writer.Write(record)
		if err != nil {
			return err
		}
	}
	// check for an error
	if result.Err() != nil {
		fmt.Printf("query parsing error: %\n", result.Err().Error())
	}

	return nil
}
