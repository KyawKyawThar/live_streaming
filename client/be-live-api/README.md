## 🎉 LIVE STREAM
This is a live streaming project for streamers and users to use. With some basic features of a live and video management application

## ✨ Features
- Go live with camera or schedule a live stream (video available)
- When live, there are features such as live chat (comment), expressing emotions (like, heart,...), shares, number of emotions expressed, number of views and number of shares
- After live (video), there is also a similar feature when live
- The streamer's channel contains basic information of the streamer, live and video of the streamer
- Streamer subscription list, viewed history list, reaction video list, video bookmark list
- Notify when streamer has registered live and update user status (online/offline)
- Manage basic user information and 2-step authentication (google auth)

## 🖥 Environment Support
- Go 1.22.2
- Docker
- PostgreSQL
- FFmpeg

## 📦 Installation
- Automatically update the go.mod file and create a go.sum file to lock the dependency versions.
```bash
go mod tidy
```
- Create a config.ini file from the config.example.ini file. Update mysql and redis information

## Install Mysql Server and Redis Server
- Setup Mysql Server
- Setup Redis Server

## Install third-party livego
- Download the source code `git clone https://github.com/gwuhaolin/livego.git`
- Go to the livego directory and execute `go build` or `make build`

## 🔗 Links
- http://localhost:8787/: backend link, set port 8787 in config
- http://localhost:8787/api/file/: link images, videos (files)
- rtmp://localhost:1935/{appname}/movie: RTMP link
- http://127.0.0.1:7001/{appname}/movie.flv: FLV link
- http://127.0.0.1:7002/{appname}/movie.m3u8: HLS link

## ⌨️ Development
- Build binary file
```bash
CGO_ENABLED=0 GOOS=linux go build -o be-live-api.linux .
```
- Run project
```bash
./livego && ./be-live-api.linux
```

## 🔨 Features that need to be developed in the future
- Chat: private chat and group chat
- Streamer can view their own detailed statistics