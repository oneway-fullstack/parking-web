import {
  Directive,
  Host,
  Optional,
  Renderer2,
  Self,
  ViewContainerRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Subject } from 'rxjs';
import { MatPaginator } from "@angular/material";

@Directive({
  selector: "[style-paginator]",
})
export class StylePaginatorDirective {
  private _currentPage = 1;
  private _pageGapTxt = "...";
  private _rangeStart;
  private _rangeEnd;
  private _buttons = [];
@Output()
  change = new EventEmitter();

@Input()
  set listChanged(value: any) {
    if(value > 0) {
      this.initPageRange();
    }
  }

  get showTotalPages(): number { return this._showTotalPages; }
  set showTotalPages(value: number) {
    this._showTotalPages = value % 2 == 0 ? value + 1 : value;
  }
  private _showTotalPages = 2;

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private vr: ViewContainerRef,
    private ren: Renderer2
  ) {
    //Sub to rerender buttons when next page and last page is used
    this.matPag.page.subscribe((v)=>{
      this.switchPage(v.pageIndex);
    });

  }

  private buildPageNumbers() {
    const actionContainer = this.vr.element.nativeElement.querySelector(
      "div.mat-paginator-range-actions"
    );
    const nextPageNode = this.vr.element.nativeElement.querySelector(
      "button.mat-paginator-navigation-next"
    );
    const prevButtonCount = this._buttons.length;

    // remove buttons before creating new ones
    if (this._buttons.length > 0) {
      this._buttons.forEach(button => {
        this.ren.removeChild(actionContainer, button);
      });
      //Empty state array
      this._buttons.length = 0;
    }

    let dots = false;

    for (let i = 0; i < this.matPag.getNumberOfPages(); i = i + 1) {
      if (
        (i < this._showTotalPages && this._currentPage < this._showTotalPages && i > this._rangeStart) ||
        (i >= this._rangeStart && i <= this._rangeEnd)
      ) {
        this.ren.insertBefore(
          actionContainer,
          this.createButton(i, this.matPag.pageIndex),
          nextPageNode
        );
      } else {
        if (i > this._rangeEnd && !dots) {
          this.ren.insertBefore(
            actionContainer,
            this.createButton(this._pageGapTxt, this.matPag.pageIndex),
            nextPageNode
          );
          dots = true;
        }
      }
    }
  }

  private createButton(i: any, pageIndex: number): any {
    const linkBtn = this.ren.createElement("mat-button");
    this.ren.addClass(linkBtn, "mat-mini-fab");
    this.ren.setStyle(linkBtn, "margin", "1%");

    const pagingTxt = isNaN(i) ? this._pageGapTxt : +(i + 1);
    const text = this.ren.createText(pagingTxt + "");

    this.ren.addClass(linkBtn, "mat-custom-page");
    switch (i) {
      case pageIndex:
        this.ren.setAttribute(linkBtn, "disabled", "disabled");
        break;
      case this._pageGapTxt:
        this.ren.listen(linkBtn, "click", () => {
          this.switchPage(this._currentPage + this._showTotalPages);
        });
        break;
      default:
        this.ren.listen(linkBtn, "click", () => {
          this.switchPage(i);
        });
        break;
    }

    this.ren.appendChild(linkBtn, text);
    //Add button to private array for state
    this._buttons.push(linkBtn);
    return linkBtn;
  }

  private initPageRange(): void {
    this._rangeStart = this._currentPage - this._showTotalPages / 2;
    this._rangeEnd = this._currentPage + this._showTotalPages / 2;

    this.buildPageNumbers();
  }

  private switchPage(i: number): void {
    this._currentPage = i;
    this.matPag.pageIndex = i;
    this.change.emit(i);
    this.initPageRange();
  }

  public ngAfterViewInit() {
    this.initPageRange();
  }
}
