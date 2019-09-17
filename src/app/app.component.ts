import { Component, OnInit } from '@angular/core';

declare var JSPM: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'JSPrintManager Angular Sample';

  public uploadedFile: any;
  public availablePrintersList: Array<any> = [];

  constructor() {

  }

  ngOnInit(): void {
    // this._getInstalledPrinters();
    // this._printSimpleFile();
  }

  public upload(event) {
    this.uploadedFile = event.target.files[0];
  }
  public print() {
    let blobFile = <Blob>this.uploadedFile;
    this._printSimpleFile(blobFile);
    this.uploadedFile = {};
  }

  private _printSimpleFile(blobFile: Blob) {
    JSPM.JSPrintManager.auto_reconnect = true;
    JSPM.JSPrintManager.start();
    JSPM.JSPrintManager.WS.onStatusChanged = () => {
      if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open) {
        var cpj = new JSPM.ClientPrintJob();
        // cpj.clientPrinter = new JSPM.DefaultPrinter();
        // cpj.clientPrinter = new JSPM.InstalledPrinter('MyLocalPrinter');
        cpj.clientPrinter = new JSPM.UserSelectedPrinter();
        var my_file1 = new JSPM.PrintFilePDF(blobFile, JSPM.FileSourceType.BLOB, 'MyFile.pdf', 1);
        // var my_file2 = new JSPM.PrintFileTXT('Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus purus vitae purus sollicitudin, nec semper tortor sodales. Sed sed urna quis tortor tempus congue nec a enim. Nunc non lectus lectus. Nam id lectus nec elit tempor congue. Donec placerat sapien ut enim blandit fermentum. Phasellus vitae efficitur purus. Morbi vitae laoreet ex, maximus cursus nulla. Donec varius mauris id facilisis scelerisque. Etiam at facilisis diam, et sagittis augue.', 'MyFile.txt', 1);
        cpj.files.push(my_file1);
        // cpj.files.push(my_file2);
        cpj.sendToClient();
      }
    };
  }
  private _getInstalledPrinters() {
    JSPM.JSPrintManager.auto_reconnect = true;
    JSPM.JSPrintManager.start();
    JSPM.JSPrintManager.WS.onStatusChanged = () => {
      if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open) {
        JSPM.JSPrintManager.getPrinters().then((e) => {

          this.availablePrintersList = e;

        });
      }
    };
  }

}
