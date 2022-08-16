import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule  } from '@angular/material/button';
import { CardComponentComponent } from './card-component/card-component.component';
import { MsalModule } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
import { HomePageComponent } from './home-page/home-page.component';
import { MusicPageComponent } from './music-page/music-page.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
      CardComponentComponent,
      HomePageComponent,
      MusicPageComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: '46b2788a-0799-48cb-aad5-89e3ddf6f6f6', // Application (client) ID from the app registration
        authority: 'https://login.microsoftonline.com/consumers/', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
        redirectUri: 'https://roy.tools/' // This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }), null!, null!)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
