import serverlessMysql from "serverless-mysql";

export const conn = serverlessMysql({
  config: {
    host: "localhost",
    user: "root",
    password: "luis891210",
    port: 3306,
    database: "nextmysqlcrud",
  },
});
