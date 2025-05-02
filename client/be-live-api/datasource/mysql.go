package datasource

import (
	"fmt"
	"gitlab/live/be-live-api/conf"
	"gitlab/live/be-live-api/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func LoadMysqlDB() (*gorm.DB, error) {
	dbConfig := conf.GetDatabaseConfig()

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=true&loc=Local", dbConfig.User, dbConfig.Pass, dbConfig.Host, dbConfig.Port, dbConfig.Name)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	if err := db.AutoMigrate(
		&model.Action{},
		&model.Role{},
		&model.User{},
		&model.Category{},
		&model.AdminLog{},
		&model.TwoFA{},
		&model.BlockedList{},
		&model.Stream{},
		&model.Notification{},
		&model.Subscription{},
		&model.StreamAnalytics{},
		&model.Like{},
		&model.Comment{},
		&model.Share{},
		&model.StreamCategory{},
		&model.View{},
		&model.ScheduleStream{},
		&model.Bookmark{},
	); err != nil {
		return nil, err
	}

	return db, nil

}
