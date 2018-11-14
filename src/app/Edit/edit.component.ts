import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ln4Manager } from 'src/ln4/ln4.Manager';
import { ln4A2SimpleComp } from 'src/ln4/ln4.A2SimpleComp';
@Component({
    selector: 'editor-ln4',
    templateUrl:"edit.component.html",
})
export class EditorComponent {
    @Input("forum")forum:string;
    @Input("forumList")forumList:string;
    @Input("topic")topic:string;
    @Input("from")from:string;
    @Input("subject")subject:string;
    @Input("content")content:string;
    constructor(
        public dialogRef: MatDialogRef<EditorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
    LoginLabel() {
        return ln4Manager.GetInstance().translate("Login");
    }
}
