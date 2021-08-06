import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Article } from './article.model';
import { Injectable } from '@angular/core';

export interface ArticleState extends EntityState<Article, string> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'article', idKey: 'url' })
export class ArticleStore extends EntityStore<ArticleState> {
  constructor() {
    super() ;
  }
}
