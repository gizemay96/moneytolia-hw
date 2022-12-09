// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { AppRoutes } from "./app/routes";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { AppModule } from './app/app.module';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

bootstrapApplication(AppComponent , {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(AppRoutes),
      BrowserAnimationsModule
    )
  ]
});