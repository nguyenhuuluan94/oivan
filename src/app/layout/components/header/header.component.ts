import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageList } from '../../../core/constant/lang.const';
import { Language } from '../../../core/model/lang.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  languageList: Language[] = LanguageList;
  currentLanguage: 'en' | 'vn';
  selectedLanguage: Language;

  constructor(private translateService: TranslateService) {
    this.currentLanguage = localStorage.getItem('lang') === 'vn' ? 'vn' : 'en';
    this.translateService.use(this.currentLanguage);
  }

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(_ => {
      localStorage.setItem('lang', this.currentLanguage)

      const index = this.languageList.findIndex(lang => lang.key === this.currentLanguage);
      if (index > -1) {
        this.selectedLanguage = this.languageList[index];
      }
    });
  }

  changeLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'vn' : 'en';
    this.translateService.use(this.currentLanguage);
  }
}
