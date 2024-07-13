import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import provider from './admin/auth-provider.js';
import * as AdminJSTypeorm from '@adminjs/typeorm'
import AdminJS from 'adminjs'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/Banner.entity.js';
import { Category } from './entities/Category.entity.js';
import { OptionColor } from './entities/Technical.entity.js';
import { OptionInterator } from './entities/OptionInterator.entity.js';
import { OptionWheel } from './entities/OptionWheel.entity.js';
import { Order } from './entities/Order.entity.js';
import { Product } from './entities/Product.entity.js';
import { ProductBasicParam } from './entities/ProductBasicParam.entity.js';
import { ProductBasicSize } from './entities/ProductBasicSize.entity.js';
import { ProductBasicEngine } from './entities/ProductBasicEngine.entity.js';
import { ColorGroup } from './entities/ColorGroup.entity.js';
import { CustomerDemand } from './entities/CustomerDemand.entity.js';
import { Image } from './entities/ProductImage.entity.js';
import componentLoader from './admin/component-loader.js';
import uploadFeature from '@adminjs/upload';
import { awscredentials } from './aws/index.js';
import banerResourceOptions from './resources/banner.resource.js';
import CategoryResourceOptions from './resources/category.resource.js';
import ColorResourceOptions from './resources/optionColor.resource.js';
import InteratorResourceOptions from './resources/optionInterator.resource.js';
import wheelResourceOptions from './resources/optionWheel.resource.js';
import productResourceOptions from './resources/product.resource.js';
import imageResourceOptions from './resources/image.resource.js';
import orderResourceOptions from './resources/order.resource.js';
import { RegistryDriven } from './entities/BookTestDrive.entity.js';

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
})

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT') || 3306,
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [
          Banner,
          Category,
          OptionColor,
          OptionInterator,
          OptionWheel,
          Order,
          Product,
          ProductBasicParam,
          ProductBasicSize,
          ProductBasicEngine,
          ColorGroup,
          Image,
          CustomerDemand,
          RegistryDriven,
        ],
        synchronize: true,
      })
    }),
    AdminModule.createAdminAsync({
      useFactory: async () => {
        return {
          adminJsOptions: {
            componentLoader,
            rootPath: '/admin',
            resources: [
              {
                resource: Banner,
                options: banerResourceOptions,
                features: [
                  uploadFeature({
                    componentLoader,
                    provider: { aws: awscredentials },
                    validation: { mimeTypes: [] },
                    properties: { file: 'file', key: 's3Key', bucket: 'bucket', mimeType: 'mime' },
                  } as any),
                ],
              },
              {
                resource: Category,
                options: CategoryResourceOptions,
              },
              {
                resource: OptionColor,
                options: ColorResourceOptions,
                features: [
                  uploadFeature({
                    componentLoader,
                    provider: { aws: awscredentials },
                    validation: { mimeTypes: [] },
                    properties: { file: 'file', key: 's3Key', bucket: 'bucket', mimeType: 'mime' },
                  } as any),
                ],
              },
              {
                resource: OptionInterator,
                options: InteratorResourceOptions,
                features: [
                  uploadFeature({
                    componentLoader,
                    provider: { aws: awscredentials },
                    validation: { mimeTypes: [] },
                    properties: { file: 'file', key: 's3Key', bucket: 'bucket', mimeType: 'mime' },
                  } as any),
                ],
              },
              {
                resource: OptionWheel,
                options: wheelResourceOptions,
                features: [
                  uploadFeature({
                    componentLoader,
                    provider: { aws: awscredentials },
                    validation: { mimeTypes: [] },
                    properties: { file: 'file', key: 's3Key', bucket: 'bucket', mimeType: 'mime' },
                  } as any),
                ],
              },
              {
                resource: Order,
                options: orderResourceOptions,
              },
              {
                resource: Product,
                options: productResourceOptions,
                features: [
                  uploadFeature({
                    componentLoader,
                    provider: { aws: awscredentials },
                    validation: { mimeTypes: [] },
                    properties: { file: 'file', key: 's3Key', bucket: 'bucket', mimeType: 'mime' },
                  } as any),
                ],
              },
              {
                resource: Image,
                options: imageResourceOptions,
                features: [
                  uploadFeature({
                    componentLoader,
                    provider: { aws: awscredentials },
                    validation: { mimeTypes: [] },
                    properties: { file: 'file', key: 's3Key', bucket: 'bucket', mimeType: 'mime' },
                  } as any),
                ],
              },
              ProductBasicParam,
              ProductBasicSize,
              ProductBasicEngine,
              ColorGroup,
              CustomerDemand,
              RegistryDriven,
            ],
            branding: {
              companyName: 'Super Car Admin',
              logo: '',
            },
          },
          auth: {
            provider,
            cookiePassword: process.env.COOKIE_SECRET,
            cookieName: 'adminjs',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: process.env.COOKIE_SECRET,
          }
        };
      },
    }),
  ],
})
export class AppModule { }
