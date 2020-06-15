// 使用时去除 example 并对应填写内容

export const main: any = {
  "type": "mysql",
  "host": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "port": 3306,
  "username": "root",
  "password": "xxxxxxxxxxxxxxxxxxxxxxxx",
  "entities": [
    "dist/src/entity/db-main/**/*.entity.{ts,js}"
  ],
  "database": "ts-main",
  "synchronize": true,
  "logging": false
};

export const test: any = {
  "name": "test",
  "type": "mysql",
  "host": "xxxxxxxxxxxxxxxxxxxxxxxx",
  "port": 3306,
  "username": "root",
  "password": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "entities": [
    "dist/src/entity/db-test/**/*.entity.{ts,js}"
  ],
  "database": "ts-test",
  "synchronize": true,
  "logging": false
}