import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaItemsService {
      xitems = new Array();
    //   [
    //     {
    //         book : "",
    //         completed: true,
    //         date: Date.now(),
    //         priority: "",
    //         visible:true,
    //         animationOut: false,
    //         animationIn :false,
    //         prioNum: 2
    //     }
    // ]
  constructor() { }
}
