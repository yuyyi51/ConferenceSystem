# 学术会议管理平台
## 项目文件说明
lib文件夹下是自行开发的引用库

public文件夹下是各类静态资源，包括样式表、图片和客户端脚本

routes文件夹下用于管理网站路由

views文件夹下是网页ejs模板

server.js是服务器主程序

lib下的mongo.js用于进行数据库操作

package.json用于管理依赖库，如果新增依赖库需要在该文件中添加
## 数据库参考
由于使用的数据库是mongodb，因此没有固定的数据库表的概念，可自由添加新数据项，以下仅供参考。
### 用户
```
{
    "_id" : ObjectId("5b3739954768d440bc02dedc"),
    "username" : "123123",
    "password" : "123123"
}
```
### 会议信息
```
{
    "_id" : ObjectId("5b3838570aec855474e3a5a1"),
    "title" : "title",
    "description" : "description",
    "paper_info" : "info",
    "important_dates" : {
        "paper_deadline" : "2018-7-12 08:00:00",
        "dtba" : "2018-7-13 08:00:00",
        "regis_date" : "2018-7-15 08:00:00",
        "conference_date" : "2018-7-19 08:00:00"
    },
    "arrangement" : [
        {
            "start" : "2018-7-19 08:00:00",
            "end" : "2018-7-19 12:00:00",
            "description" : "上午会议"
        },
        {
            "start" : "2018-7-19 12:00:00",
            "end" : "2018-7-19 13:30:00",
            "description" : "午餐"
        },
        {
            "start" : "2018-7-19 14:00:00",
            "end" : "2018-7-19 18:00:00",
            "description" : "下午会议"
        }
    ],
    "org" : "org",
    "template" : "templateid",
    "price" : 10,
    "acc_traffic" : "traffic",
    "contact" : "123123123123"
}
```
