import { Component, Input, OnInit } from '@angular/core';
import { ln4A2MatComponent } from 'src/ln4/mat/ln4.A2Mat.component';
import { ln4Manager } from 'src/ln4/ln4.Manager';
import { ln4Map } from 'src/ln4/ln4.Map';
import { MatDialog } from '@angular/material';
import { MTreeNode } from 'src/tree/tree';

@Component({
  selector: 'app-single-row-line-ln4',
  templateUrl: './forumSingleRowLine.component.html',
  styleUrls: ['./forumSingleRowLine.component.css']
})
export class ForumSingleRowLineComponent extends ln4A2MatComponent implements OnInit {
  public step = 1;

  @Input('itm') public itm: any;
  @Input('lst') public lst: any;
  // @Input('mtree') public mtree: MTreeNode<Object>;

  constructor(dialog: MatDialog) {
    super(true, true, dialog);
  }

  ngOnInit() {
    console.log('ForumSingleRowLineComponent itm: ', this.itm);
  }

  protected toTimestamp(strDate: string): number {
    const datum = Date.parse(strDate);

    return datum / 1000;
  }

  public itemHasLevel(): boolean {
    if (this.itm != null) {
      if ('lvl' in this.itm) {
        // console.log('this.itm HasLevel');

        return true;
      }
    }

    // console.log('this.itm Has NOT Level');
    return false;
  }

  /**
   * Removetags forum row line component
   * @param [value]
   * @returns removetag
   */
  public removetag(value?: string): string {
    let valres = '';
    if (value != null) {
      const valin = '' + value;
      let i = 0;
      for (let v of valin.split('')) {
        if (i > 1) {
          valres = valres + v;
        }
        i++;
      }
    }
    return valres;
  }
    /**
   * removesec forum row line component
   * @param [value]
   * @returns removetag
   */
  public removesec(value?: string): string {
    let valres = '';
    if (value != null) {
      const valin = '' + value;
      valres = valin.split(' ')[0];
    }
    return valres;
  }
  /**
   * Removedate forum row line component
   * @param [value]
   * @returns removetag
   */
  public removedate(value?: string): string {
    let valres = '';
    if (value != null) {
      const valin = '' + value;
      valres = valin.split(' ')[1];
    }
    return valres;
  }

  public jsonToString(obj: object): string {
    const jsonStr = JSON.stringify(obj);

    console.log('jsonStr Obj: ', obj);

    return jsonStr;
  }

  public Reply() {
    this.authdialog('ForumEditorComponent', {
      Action: 'replay',
      forumList: this.lst,
      forumData: this.itm
    });
  }
  public New() {
    this.authdialog('ForumEditorComponent', {
      Action: 'new',
      forumList: this.lst,
      forumData: this.itm
    });
  }
  public Add() {
    this.authdialog('ForumEditorComponent', {
      Action: 'add',
      forumList: this.lst,
      forumData: this.itm
    });
  }
  public Change() {
    this.authdialog('ForumEditorComponent', {
      Action: 'edit',
      forumList: this.lst,
      forumData: this.itm
    });
  }
  public Delete() {
    this.authdialog('ForumEditorComponent', {
      Action: 'canc',
      forumList: this.lst,
      forumData: this.itm
    });
  }
  public EditProfile() {
    this.authdialog('EditProfileComponent', {
      Action: 'edit',
      User: 'supermario',
      Name: 'Mario',
      Surname: 'calogero'
    });
  }
  public Share() {
    console.log('Share not implemented');
  }
}
