import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Article } from '../../core/api/article.model';
import { ArticleQuery } from '../../core/api/article.query';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../core/api/article.service';
import { tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  article$: Observable<Article | undefined>;

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
          this.article$ = this.articleQuery.selectEntity(id).pipe(
            tap(response => {
              if (!response) {
                // there is no article in the store
                this.articleService.getArticleByURL(queryParams['url'])
                  .pipe(untilDestroyed(this))
                  .subscribe()
              }
            })
          );
        }
      })
  }

  ngOnDestroy() {
  }

}
