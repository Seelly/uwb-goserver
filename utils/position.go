package utils

import "fence_server/models"

func IsOutsideArea(pos models.Position, border models.Border) bool {
	return pos.X < border.W+border.X && pos.X > border.X && pos.Y < border.H+border.Y && pos.Y > border.Y
}
