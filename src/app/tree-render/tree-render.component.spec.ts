import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeRenderComponent } from './tree-render.component';

describe('TreeRenderComponent', () => {
  let component: TreeRenderComponent;
  let fixture: ComponentFixture<TreeRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
