import { Component, Input, OnInit } from '@angular/core';
import { ln4A2MatComponent } from 'src/ln4/mat/ln4.A2Mat.component';
import { ln4Manager } from 'src/ln4/ln4.Manager';
import { ln4Map } from 'src/ln4/ln4.Map';
import { MatDialog } from '@angular/material';
import { MTreeNode } from 'src/tree/tree';

@Component({
  selector: 'app-forum-thread',
  templateUrl: './forum-thread.component.html',
  styleUrls: ['./forum-thread.component.css']
})

export class ForumThreadComponent implements OnInit {
  public step = 1;
  public timestamp = 0;
  public mytree: MTreeNode<Object>;
  private nodeCount: number;

  @Input('itm') public itm: any;
  @Input('lst') public lst: any;

  public get topics(): any[] {
    // return ln4Map.Load(this.itm.topics).sort('docid');
    const topics = ln4Map.Load(this.itm.topics).sort('lst').reverse();

    // console.log('Topics: ', topics);

    return topics;
  }

  public loadTopics(topics: any): any {
    return ln4Map.Load(topics);
  }

  public buildTree() {
    const _tree = this.addTopicsToTree(this.mytree, this.loadTopics(this.itm.topics).sort('lst').reverse());

    console.log('Tree: ', this.mytree);
    console.log('_tree: ', _tree);
  }

  public addTopicsToTree(_tree: MTreeNode<Object>, _topics: any): any {

    // const topics = this.loadTopics(_topics);
    // const treeNode = new MTreeNode<Object>();
    const topics = _topics;
    const length = Object.keys(topics).length;

    // console.log('adding TreeNode n.', this.nodeCount);
    console.log('addTopicsToTree, topics: ', topics);
    console.log('addTopicsToTree, topics.length: ', length);
    console.log('addTopicsToTree, typeof topics: ', typeof topics);

    this.nodeCount++;

    // There Are No More Topics

    if (length <= 0) {
      console.log('There Are NO Topics !');
      console.log('Tree is: ', _tree);
      console.log('Topics Are: ', _topics);

      console.log('Returning _tree');

      return _tree;
    }

    console.log('There Are Topics !');

    /* Foreach Topic
      * Topics is an object with every topic being an object itself
      * Like:
        topics = {
        topic1: {},
        topic2: {},
        topic3: {},
        ...
        topicN: {}
        }
    */

    Object.keys(topics).forEach(function(key) {

      console.log('typeof key, ' + key + ': ', typeof key);
      console.log('Number(' + key + '): ', Number(key));
      console.log('isNaN(Number(' + key + ')): ', isNaN(Number(key)));

      if (!isNaN(Number(key))) {

        if (Number(key) >= 0) {
          const childTreeNode = new MTreeNode<Object>(topics[key]);

          console.log('topic[' + key + ']: ', topics[key]);
          console.log('topic[' + key + '] subtopics: ', topics[key].topics);

          childTreeNode.setGravity(this.toTimestamp(topics[key].lst));

          childTreeNode.setId(topics[key].docid);
          childTreeNode.setParentId(topics[key].catid);

          console.log('Adding childTreeNode to _tree');
          _tree.addChildNode(childTreeNode);

          this.addTopicsToTree(childTreeNode, topics[key].topics);
        } else {
          console.log('key ' + key + ' <=0, skipping');
        }

      } else {
        console.log('key ' + key + ' isNaN, skipping');
      }

      // return _tree;

    }.bind(this));

    console.log('Reached end of function, returning _tree');

    return _tree;

  }

  constructor() {
    this.nodeCount = 0;
  }

  ngOnInit() {
    console.log('this.itm: ', this.itm);
    this.timestamp = this.toTimestamp(this.itm.lst);

    // Create Tree Root
    this.mytree = new MTreeNode<Object>(this.itm, true);
    this.mytree.setGravity(this.toTimestamp(this.itm.lst));

    this.buildTree();

    console.log('Total TreeNodes Added: ', this.nodeCount);
  }

  toTimestamp(strDate: string): number {
    const datum = Date.parse(strDate);

    return datum / 1000;
  }

  public itemHasLevel(itm: any): boolean {
    if (itm != null) {
      if ('lvl' in itm) {
        return true;
      }
    }
    return false;
  }

  getLst(): any {
    return this.lst;
  }

  getItm(): any {
    return this.itm;
  }

}

