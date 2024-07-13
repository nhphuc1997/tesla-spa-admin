import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import provider from './admin/auth-provider.js';
import * as AdminJSTypeorm from '@adminjs/typeorm'
import AdminJS from 'adminjs'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/Banner.entity.js';
import { Category } from './entities/Category.entity.js';
import { Order } from './entities/Order.entity.js';
import { Product } from './entities/Product.entity.js';
import { ColorGroup } from './entities/ColorGroup.entity.js';
import componentLoader from './admin/component-loader.js';
import uploadFeature from '@adminjs/upload';
import { awscredentials } from './aws/index.js';
import banerResourceOptions from './resources/banner.resource.js';
import CategoryResourceOptions from './resources/category.resource.js';
import productResourceOptions from './resources/product.resource.js';
import orderResourceOptions from './resources/order.resource.js';
import { ProductImage } from './entities/ProductImage.entity.js';
import ProductImageOptions from './resources/productImage.resource.js';

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
          Order,
          Product,
          ColorGroup,
          ProductImage,
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
              ColorGroup,
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
                resource: ProductImage,
                options: ProductImageOptions,
                features: [
                  uploadFeature({
                    componentLoader,
                    provider: { aws: awscredentials },
                    validation: { mimeTypes: [] },
                    properties: { file: 'file', key: 's3Key', bucket: 'bucket', mimeType: 'mime' },
                  } as any),
                ],
              },
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
