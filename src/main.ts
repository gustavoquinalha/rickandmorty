import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { TranslateService } from '@ngx-translate/core';

bootstrapApplication(AppComponent, appConfig)
  .then(appRef => {
    const translateService = appRef.injector.get(TranslateService);
    translateService.setDefaultLang('en');
    translateService.use('en');
  })
  .catch((err) => console.error(err));
