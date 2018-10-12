import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ln4Manager } from 'src/ln4/ln4.Manager';
@Component({
    selector: 'editor-ln4',
    templateUrl:"edit.component.html",
})
export class EditorComponent {
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
