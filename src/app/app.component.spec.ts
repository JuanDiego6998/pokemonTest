import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Listado de Pokemon'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Listado de Pokemon');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Listado de Pokemon');
  });

  it('should invoke onCreateNew on button click', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    spyOn(fixture.componentInstance, 'onCreateNew');
    const button = compiled.querySelector('button');
    button?.click();
    tick();
    expect(fixture.componentInstance.onCreateNew).toHaveBeenCalled();
  }));

  it('should set showForm to true when onCreateNew is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.onCreateNew();
    expect(fixture.componentInstance.showForm).toBeTrue();
  });

  it('should render form when showForm', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.showForm = true;
    fixture.detectChanges();
    expect(compiled.querySelector('app-pokemon-form')).toBeTruthy();
  });
});
