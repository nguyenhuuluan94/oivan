import { QueryEntity } from '@datorama/akita';
import { ArticleState, ArticleStore } from './article.store';
import { Injectable } from '@angular/core';
import { Article } from './article.model';

@Injectable({ providedIn: 'root' })
export class ArticleQuery extends QueryEntity<ArticleState> {
  constructor(protected store: ArticleStore) {
    super(store);
    console.log(this);
  }

  getHeadline(): Article {
    return this.getAll()[0];
  }
}
