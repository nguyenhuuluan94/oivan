import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, fromEvent, Observable, of, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from '../../../core/api/article.service';
import { ArticleQuery } from '../../../core/api/article.query';
import { Article } from '../../../core/api/article.model';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { Queue } from '../../../core/helper/queue.class';

@UntilDestroy()
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ArticlesComponent implements OnInit, OnDestroy, AfterViewInit {
  articles: Article[] = [];
  headlineArticle: Article;
  isLoading = false;

  private page = 1;
  private stop: Subject<any> = new Subject<any>();
  private isQueueOnProcessing = false;
  private queue: Queue = new Queue();

  constructor(
    private articleService: ArticleService,
    private articleQuery: ArticleQuery,
    private router: Router,
    private dialog: MatDialog,
    private changeDetectionRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.fetchList();

    this.articleQuery.selectAll()
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        this.articles = data;
        if (this.articles.length) {
          this.headlineArticle = this.articles[0];
          this.articles = this.articles.slice(1);
        }
        this.changeDetectionRef.detectChanges();
      });
  }

  private showErrorDialog() {
    this.isLoading = false;
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      position: {
        top: '20px',
        right: '10px'
      },
      panelClass: 'dialog-background-transparent',
      hasBackdrop: false,
      disableClose: false
    })

    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, 2000)
    })
  }

  ngOnDestroy() {
    // destroy takeUntil
  }

  viewDetail(item: Article) {
    this.stop.next();
    this.stop.complete();
    this.router.navigate([item.id], {
      queryParams: {
        url: item.url
      }
    });
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.stop))
      .subscribe(evt => {
        const element = evt.currentTarget as any;
        if (element.scrollY + element.innerHeight > document.body.scrollHeight - 100) {
          this.fetchList()
        }
      })
  }

  trackByFn(index: number, item: Article): number {
    return item.id;
  }

  private fetchList() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true
    this.articleService.getArticles(this.page)
      .pipe(
        untilDestroyed(this),
        tap(),
        catchError(_ => of(null))
      )
      .subscribe(
        articles => {
          if (articles?.length) {
            this.page++;
            this.isLoading = false;
            this.queue.enqueue(articles);
            if (this.isQueueOnProcessing) {
              return;
            }
            this.fetchArticleInfo();
          } else {
            this.stop.next();
            this.stop.complete();
          }
        },
        _ => this.showErrorDialog())
  }

  /**
   * API getList mostly does not return thumbnail, must get single data to render thumbnail image
   * To avoid ddos server, get info in queue
   */
  private fetchArticleInfo(): void {
    if (this.queue.isEmpty) {
      this.isQueueOnProcessing = false;
      return;
    }
    this.isQueueOnProcessing = true;
    const currentQueueItems: Article[] = this.queue.dequeue();
    const requests: Observable<Article>[] = currentQueueItems.map(item => {
      return this.articleService.getArticleByURL(item.url, item)
    })
    combineLatest(requests)
      .pipe(untilDestroyed(this))
      .subscribe(
        _ => this.fetchArticleInfo()
      )
  }
}
