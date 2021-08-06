import { Injectable } from '@angular/core';
import { AllArticlesGQL } from '../query/articles.query';
import { SingleArticlesGQL } from '../query/article.query';
import { ArticleStore } from './article.store';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ArticleService {
  constructor(
    private allArticlesGQL: AllArticlesGQL,
    private singleArticlesGQL: SingleArticlesGQL,
    private store: ArticleStore
  ) {
  }

  getArticles(pageNumber: number) {
    return this.allArticlesGQL.watch({
      pageNumber: pageNumber
    })
      .valueChanges
      .pipe(
        map(({data}) => {
          return data.articles.map(item => ({
            ...item,
            meta: item.description
          }))
        }),
        tap(articles => {
          this.store.upsertMany(articles);
        })
      )
  }

  getArticleByURL(url: string) {
    return this.singleArticlesGQL.watch({
      url: url
    })
      .valueChanges
      .pipe(
        map(({data}) =>  data.article),
        tap(article => {
          this.store.upsert(url, article);
        }),
        catchError(err => of(err))
      )
  }
}
