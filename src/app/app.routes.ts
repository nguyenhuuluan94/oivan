import { Route } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';

export const AppRoutes: Route[] = [
  {
    path: '',
    component: ArticlesComponent
  },
  {
    path: ':id',
    component: ArticleDetailComponent
  }
]

