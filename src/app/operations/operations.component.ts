import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { RoutePartsService } from './shared/services/route-parts.service';
import { ThemeService } from './shared/services/theme.service';

import { filter } from 'rxjs/operators';
import { LayoutService } from './shared/services/layout.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit, AfterViewInit {
  appTitle = 'Mawgif Cashier';
  pageTitle = '';

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private themeService: ThemeService,
    private layout: LayoutService,
    private renderer: Renderer2,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    //this.authService.autoLoadAuthData();
    this.changePageTitle();
  }
  ngAfterViewInit() {
    this.layout.applyMatTheme(this.renderer);
  }
  changePageTitle() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
      const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
      if (!routeParts.length) {
        return this.title.setTitle(this.appTitle);
      }
      // Extract title from parts;
      this.pageTitle = routeParts
                      .reverse()
                      .map((part) => part.title )
                      .reduce((partA, partI) => {return `${partA} > ${partI}`; });
      this.pageTitle += ` | ${this.appTitle}`;
      this.title.setTitle(this.pageTitle);
    });
  }

}
