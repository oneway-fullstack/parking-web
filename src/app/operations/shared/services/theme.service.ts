import { Injectable, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import  { getQueryParam } from '../helpers/url.helper';

export interface ITheme {
  name: string,
  baseColor?: string,
  isActive?: boolean
}

@Injectable()
export class ThemeService {
  public egretThemes :ITheme[]  = [{
    "name": "egret-dark-purple",
    "baseColor": "#9c27b0",
    "isActive": false
  }, {
    "name": "egret-dark-pink",
    "baseColor": "#e91e63",
    "isActive": false
  }, {
    "name": "egret-blue",
    "baseColor": "#03a9f4",
    "isActive": false
  }, {
    "name": "egret-navy",
    "baseColor": "#10174c",
    "isActive": false 
  }, {
    "name": "egret-mawgif",
    "baseColor": "#03a9f4",
    "isActive": true
  }];
  public activatedTheme: ITheme;
  private renderer: Renderer2;
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  // Invoked in AppComponent and apply 'activatedTheme' on startup
  applyMatTheme(r: Renderer2, themeName: string) {
    this.renderer = r;

    /*
    ****** (SET YOUR DEFAULT THEME HERE) *******
    * Assign new Theme to activatedTheme
    */
    this.activatedTheme = this.egretThemes[4];

    // *********** ONLY FOR DEMO **********
    this.setThemeFromQuery();
    // ************************************

    // this.changeTheme(themeName);
    this.renderer.addClass(this.document.body, themeName);

  }

  changeTheme(prevTheme, themeName: string) {
    this.renderer.removeClass(this.document.body, prevTheme);
    this.renderer.addClass(this.document.body, themeName);
    this.flipActiveFlag(themeName);
  }
  flipActiveFlag(themeName:string) {
    this.egretThemes.forEach((t) => {
      t.isActive = false;
      if(t.name === themeName) {
        t.isActive = true;
        this.activatedTheme = t;
      }
    });
  }

  // *********** ONLY FOR DEMO **********
  setThemeFromQuery() {
    let themeStr = getQueryParam('theme');
    try {
      this.activatedTheme = JSON.parse(themeStr);
      this.flipActiveFlag(this.activatedTheme.name);
    } catch(e) {}
  }
}
