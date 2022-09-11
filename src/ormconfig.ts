export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'shop',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  synchronize: true,
  autoLoadEntities: true,
};
