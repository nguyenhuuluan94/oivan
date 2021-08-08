import { QueryEntity } from '@datorama/akita';
import { ArticleState, ArticleStore } from './article.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ArticleQuery extends QueryEntity<ArticleState> {
  constructor(protected store: ArticleStore) {
    super(store);
  }
}
