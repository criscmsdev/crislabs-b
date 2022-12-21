import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'foodDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL_FOOD'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'marketingDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL_MARKETING'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'wearDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL_WEAR'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'hardwareStoreDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL_HARDWARE_STORE'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'sitesWearDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_SITE_WEAR'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'sitesFoodDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_SITE_FOOD'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),

    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'pagesWearDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_PAGE_WEAR'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'pagesFoodDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_PAGE_FOOD'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'pagesMarketingDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_PAGE_MARKETING'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'usersMarketingDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_USER_MARKETING'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),

    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'wearsDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_WEARS'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),

    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'foodsDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_FOODS'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
})
export class MongoModule {}
