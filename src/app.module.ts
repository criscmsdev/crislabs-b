import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/config/common.module';
import { SitesModule } from './sites/sites.module';
import { PagesModule } from './pages/pages.module';
import { ArticlesModule } from './articles/articles.module';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    // ScheduleModule.forRoot(),
    CommonModule,
    SitesModule,
    PagesModule,
    ArticlesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
