import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LayoutRoutingModule } from './layout.routes';
import { MaterialModule } from '../shared/libs/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { GraphQLModule } from '../graphql.module';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleDetailComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    GraphQLModule,
    HttpClientModule,
    LayoutRoutingModule,
    MaterialModule,
    SharedModule,
    LazyLoadImageModule
  ]
})
export class LayoutModule {
}
