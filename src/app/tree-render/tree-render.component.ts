import { Component, OnInit, Input } from '@angular/core';
import { MTreeNode } from 'src/tree/tree';

@Component({
  selector: 'app-tree-render',
  templateUrl: './tree-render.component.html',
  styleUrls: ['./tree-render.component.css']
})
export class TreeRenderComponent implements OnInit {
  // protected itm: any;

  @Input('mtree') mtree: MTreeNode<Object>;
  @Input('lst') lst: any;

  public get children(): any[] {
    // if (this.mtree.isRoot()) {
      console.log('this.mtree, IS ROOT: ', this.mtree.isRoot());
      console.log('this.mtree, CAT: ', this.mtree.dataPtr['cat']);
      console.log('this.mtree, LVL: ', this.mtree.dataPtr['lvl']);
      console.log('this.mtree, CATID: ', this.mtree.dataPtr['catid']);
      console.log('this.mtree, DOCID: ', this.mtree.dataPtr['docid']);
      console.log('this.mtree, gravity: ', this.mtree.gravity);
      console.log('this.mtree.treeHasChildren(): ', this.treeHasChildren(this.mtree));
      console.log('this.mtree.children.length: ', this.mtree.children.length);
      console.log('this.mtree.children: ', this.mtree.children);
    // }

    return this.mtree.children;
  }

  /*public hasChildren(): boolean {
    return this.mtree.hasChildren();
  }*/

  public treeHasChildren(mt: MTreeNode<Object>): boolean {
    return mt.hasChildren();
  }

  constructor() { }

  ngOnInit() {
    if (this.mtree.isRoot()) {
      console.log('TreeRenderComponent IS ROOT');
    }
    console.log('TreeRenderComponent, mtree is: ', this.mtree);
    console.log('TreeRenderComponent, Gravity: ', this.mtree.gravity);
    console.log('TreeRenderComponent, LVL: ', this.mtree.dataPtr['lvl']);
  }

  public get getItm() {
    return this.mtree.dataPtr;
  }

  public get getLst() {
    return this.lst;
  }

}
