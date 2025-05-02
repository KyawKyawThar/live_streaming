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
		&model.Role{},
		&model.User{},
		&model.AdminLog{},
		&model.BlockedList{},
		&model.Stream{},
	); err != nil {
		return nil, err
	}

	if err := db.AutoMigrate(
		&model.Category{},
		&model.View{},
		&model.ScheduleStream{},
		&model.Bookmark{},
	); err != nil {
		return nil, err
	}

	if err := db.AutoMigrate(
		&model.Like{},
		&model.Comment{},
		&model.Share{},
		&model.StreamAnalytics{},
		&model.Subscription{},
		&model.Notification{},
	); err != nil {
		return nil, err
	}

	if err := db.AutoMigrate(
		&model.TwoFA{},
		&model.StreamCategory{},
		&model.Action{},
	); err != nil {
		return nil, err
	}

	// for existed db
	if err := db.Exec("ALTER TABLE streams ALTER COLUMN stream_token DROP NOT NULL").Error; err != nil {
		return nil, err
	}


	return db, nil

}
