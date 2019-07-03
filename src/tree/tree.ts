 /*
 * Generic Tree Class
 * Author: Made by Marco Caggiano
 */

export class MTreeNode<T> {
  public children: Array<any>;
  public dataPtr: T;
  public gravity: number;
  public originalGravity: number;
  public _isRoot = false;
  public parent: MTreeNode<T>;
  public level = 0;
  public id = '';
  public parentId = '';

  constructor(data: T, _isRoot: boolean = false) {
    this.dataPtr = data;
    this._isRoot = _isRoot;
    this.children = new Array<any>();
  }

  public setParent(_parent: MTreeNode<T>) {
    if (!this._isRoot) {
      this.parent = _parent;
      this.parentId = _parent.id;
    }

    return this;
  }

  public setData(data: T) {
    this.dataPtr = data;

    return this;
  }

  public hasChildren() {
    return this.children.length > 0;
  }

  public dataHasKey(key: string): boolean {
    if (key in this.dataPtr) {
      return true;
    }

    return false;
  }

  public setGravity(s: number) {
    this.gravity = s;

    this.originalGravity = s;

    return this;
  }

  public isRoot(): boolean {
    return this._isRoot;
  }

  public setLevel(level: number) {
    this.level = level;
  }

  public setId(_id: string) {
    this.id = _id;
  }

  public setParentId(_id: string) {
    this.parentId = _id;
  }

  public addChildNode(childNode: MTreeNode<T>) {

    if (childNode.gravity >= this.gravity) {
      this.originalGravity = this.gravity;

      this.gravity = childNode.gravity;
    }

    childNode.setParent(this);
    childNode.setLevel((this.level + 1));

    this.children.push(childNode);


    // Numerically Descending Sorting
    if (this.children.length > 1) {
      this.children = this.children.sort((a, b) => (b - a));
    }

    return this;
  }

}

/*
export class MTree<T> {
  public root: MTreeNode<T>;

  constructor(data: T) {
    this.root = new MTreeNode<T>(data);
  }

}
*/
