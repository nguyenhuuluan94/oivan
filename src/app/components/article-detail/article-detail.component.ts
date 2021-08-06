import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Article } from '../../core/api/article.model';
import { ArticleQuery } from '../../core/api/article.query';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../core/api/article.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  article: Article;

  constructor(
    private articleQuery: ArticleQuery,
    private route: ActivatedRoute,
    private articleService: ArticleService) {
  }

  ngOnInit() {
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(untilDestroyed(this))
      .subscribe(([params, queryParams]) => {
        if (params && params['id'] && queryParams && queryParams['url']) {
          const id = params['id'];
          this.articleQuery.selectEntity(id)
            .pipe(untilDestroyed(this))
            .subscribe(
              article => {
                if (article) {
                  this.article = article;
                } else {
                  // there is no article in the store
                  this.articleService.getArticleByURL(queryParams['url'])
                    .pipe(untilDestroyed(this))
                    .subscribe(article => this.article = article)
                }
              })
        }
      })
  }

  ngOnDestroy() {
  }

}
