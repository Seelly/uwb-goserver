package models

type Position struct {
	TimeStamp int64   `json:"TimeStamp"`
	X         float64 `json:"avx"`
	Y         float64 `json:"avy"`
	Z         float64 `json:"avz"`
	ANC1      float64 `json:"anc1"`
	ANC2      float64 `json:"anc2"`
	ANC3      float64 `json:"anc3"`
}
type PositionResponse struct {
	DataType string `json:"dataType"`
	Position
}
type Distance struct {
	TimeStamp int64   `json:"TimeStamp"`
	ANC1      float64 `json:"anc1"`
	ANC2      float64 `json:"anc2"`
	ANC3      float64 `json:"anc3"`
}
type DistanceResponse struct {
	DataType string `json:"dataType"`
	Distance
}

type QtPosition struct {
	TimeStamp string `json:"T"`
	X         string `json:"avx"`
	Y         string `json:"avy"`
	Z         string `json:"avz"`
	ANC1      string `json:"anc1"`
	ANC2      string `json:"anc2"`
	ANC3      string `json:"anc3"`
}
type QtPositionRequest struct {
	DataType string `json:"dataType"`
	QtPosition
}

type Border struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
	W float64 `json:"w"`
	H float64 `json:"h"`
}
