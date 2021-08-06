import { Injectable } from '@angular/core';
import { AllArticlesGQL } from '../query/articles.query';
import { SingleArticlesGQL } from '../query/article.query';
import { ArticleStore } from './article.store';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Article } from './article.model';

@Injectable({providedIn: 'root'})
export class ArticleService {
  private id = 0;

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
          return data.articles.map(item => {
            this.id++;
            return {
              ...item,
              meta: item.description,
              id: this.id
            }
          })
        }),
        tap(articles => {
          this.store.upsertMany(articles);
        })
      )
  }

  getArticleByURL(url: string, item?: Article) {
    return this.singleArticlesGQL.watch({
      url: url
    })
      .valueChanges
      .pipe(
        map(({data}) => data.article),
        tap(article => {
          if (item && item.id) {
            this.store.upsert(item.id, article);
          }
        }),
        catchError(err => of(err))
      )
  }
}
