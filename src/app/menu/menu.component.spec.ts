import { TestBed, async } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
describe('MenuComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MenuComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'meteoforum'`, async(() => {
    const fixture = TestBed.createComponent(MenuComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('meteoforum');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to meteoforum!');
  }));
});
