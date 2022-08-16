import { Component, ViewChild, HostListener, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'core';
  opened = true;
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  constructor(
    private broadcastService: MsalBroadcastService,
    private authService: MsalService
  ) {}

  ngOnInit() {
    console.log(window.innerWidth);
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }

    this.isIframe = window !== window.parent && !window.opener;
  }

  login() {
    this.authService.loginPopup().subscribe({
      next: (result) => {
        console.log(result);
        this.setLoginDisplay();
      },
      error: (error) => console.log(error),
    });

    this.broadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
