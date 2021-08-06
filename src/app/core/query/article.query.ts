import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Article } from '../api/article.model';

export interface Response {
  article: Article;
}

@Injectable({
  providedIn: 'root'
})

export class SingleArticlesGQL extends Query<Response> {
  document = gql`
  query GET_ARTICLE_BY_URL($url: String!) {
    article(url: $url) {
      title,
      description,
      content,
      coverImageUrl,
      url
    }
  }
`;
}
