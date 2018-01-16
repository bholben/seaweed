import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ClipboardModule } from 'ngx-clipboard';

import { MyApp } from './app.component';
import { CryptoService } from '../services/crypto.service';
import { HomePage } from '../pages/home/home';
import { PhraseInfoPopover } from '../pages/phrase-info-popover/phrase-info-popover';

@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ClipboardModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CryptoService,
  ],
  declarations: [
    MyApp,
    HomePage,
    PhraseInfoPopover,
  ],
  entryComponents: [
    MyApp,
    HomePage,
    PhraseInfoPopover,
  ],
  bootstrap: [IonicApp],
})
export class AppModule {}
