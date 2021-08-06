import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Article } from '../api/article.model';


export interface Response {
  articles: Article[];
}

@Injectable({
  providedIn: 'root'
})
export class AllArticlesGQL extends Query<Response> {
  document = gql`
   query GET_POSTS($pageNumber: Int!) {
    articles(pageNumber: $pageNumber) {
      title,
      description,
      content
      coverImageUrl,
      url,
    }
  }
`;
}
