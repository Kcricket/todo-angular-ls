import { Component } from '@angular/core';
import { ListaItemsService } from './lista-items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
        // title = 'todo-angular-ls';
        string= "Yea"
        nuevonombre=""
        searchInput=""
        check= false
        check1=""
        items : ListaItemsService;
        counter= 0
        empty= true

  // Constructor
  constructor(datos: ListaItemsService){
    this.items = datos;
  }


  //All methods
lsUpdate(){
    // localStorage.removeItem("items")
    // localStorage.setItem("items", JSON.stringify(this.items.xitems))
    localStorage['items'] = JSON.stringify(this.items.xitems);

  }
incrementa(){
    this.insertName();
}
insertName(){
    if(this.nuevonombre ===""){
        alert("Vacio bro")
    }else{
        this.items.xitems.push(
            {
                book: this.nuevonombre,
                completed: this.check, 
                date: Date.now(), 
                priority: this.check1,
                visible: true,
                animationOut: false,
                animationIn :false,
              })
              //Meterlos en localStore
        this.nuevonombre = "" 
        this.counter = this.items.xitems.length; 
    }
      //this.items.xitems.sort((a, b) => a.priority.localeCompare(b.priority))

}
checkPrio(){
    //this.items.xitems = JSON.parse(localStorage["items"]);
      this.items.xitems.forEach(element => {
          if(element.priority== "low"){
              element.prioNum = 3
          }else if(element.priority =="mid"){
              element.prioNum = 2
          }else if(element.priority == "high"){
              element.prioNum = 1
          }
      });
}
persistStorage(){
  this.insertName()
  this.checkPrio()
  localStorage.setItem("items", JSON.stringify(this.items.xitems));
  //this.lsUpdate()
  this.items.xitems.sort((a,b)=> { return a.prioNum-b.prioNum})
  //this.items.xitems.sort((a, b) => { return a.prioNum.localeCompare(b.prioNum)})

  console.log("inserted in LS")
}
filterNotes(){
    let key= this.searchInput
    var result=[]
    this.items.xitems.forEach(element => {
        element.visible = true
        if(element.book.includes(key)){
            result.push(element)
        }else{
            element.visible = false
        }
    });
}

getReadedBooks(){
  var readedBooks = 0
  var unread= 0
  console.log(this.items.xitems)
  this.items.xitems.forEach(element => {
      if(element.completed == true){
          readedBooks++
      }else{
          unread++
      }
  });
  return {readedBooks, unread}
}

}
//Falta copiar los metodos y el css
