import { Component, OnInit } from '@angular/core';
import { ListaItemsService } from '../lista-items.service';

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent implements OnInit {
  items: ListaItemsService;
  counter= 0;
  
  constructor(datos: ListaItemsService){
    this.items = datos;
  }
  //Methods
  lsUpdate(){
    //localStorage['items'] = JSON.stringify(this.items.xitems);
    localStorage.setItem("items", JSON.stringify(this.items.xitems))
  }
  deleteItem(index: number){
    let items = this.items.xitems 
    items.splice(index, 1)
    //localStorage.getItem("items") = JSON.stringify(items.xitems);
    this.lsUpdate()
    items[index].animationOut =true
    window.setTimeout(function(){
    items[index].animationOut = false
     }, 3000);
    console.log("inserted in LS")
}
clearCompleted(){
  let items = this.items.xitems 
  for(var i=0; i<items.length; i++){
    if(items[i].completed == true){
      items.splice(i, 1)
      i--
      //localStorage.items = JSON.stringify(items);
      this.lsUpdate()
      console.log("inserted in LS")
    }
  }
}
timeDifference(previous: number) {
  let current= Date.now();
  console.log(previous)
  console.log(current)

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    
    var elapsed = current - previous;
    
    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' seconds ago';   
    }
    
    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    
    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }
    
    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    
    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
getPrio(item:{priority: String}){
  var prio = ""
  if(item.priority=="low"){
    prio= "#FFA1C9"
  }else if(item.priority=="mid"){
    prio= "#F94892"
  }else if(item.priority=="high"){
    prio= "#E60965"
  }
  return prio
}
changePrio(item:{priority: String}, prio:number){
  switch (prio) {
    case 1: item.priority = "low"
    break;
    case 2: item.priority = "mid"
    break;
    case 3: item.priority = "high"
    break;
  
    default:
      break;
  }
  //localStorage.items = JSON.stringify(items);
  this.lsUpdate()
  console.log("inserted in LS")
}
changeCompleted(item:{priority: String; completed:Boolean}){
  item.completed = !item.completed
  //localStorage.items = JSON.stringify(items);
  this.lsUpdate()
  console.log("inserted in LS")
}
//Enseña solo completados/ incompletados
ordenaOculta(num: number){
  let items = this.items.xitems
  var uncomplete = new Array()
  var complete = new Array()
  items.forEach(element => {
    element.visible= true
    if(element.completed == true){
      uncomplete.push(element)
    }else{
      complete.push(element)
    }
  });
  if(num == 1){
    uncomplete.forEach(element => {
      element.visible = false
    });
  }else if(num ==2){
    complete.forEach(element => {
      element.visible = false

    });
  }
  else if(num == 3){
    // items.forEach(element => {
    //   var low, mid, high, concat;
    //   if(element.priority == "low"){
    //     low.push(element)
    //   }else if(element.priority == "mid"){
    //     mid.push(element)
    //   }else{
    //     high.push(element)
    //   }
    // });
    // return concat.concat(low, mid, high)
  }
  
}
//////////////////////////////////////////////
  ngOnInit(): void {
    if (localStorage["items"]) {
      //Esta linea hace que todo se actualice con el localhost cada vez que recargas
      //Hace que no se pierda la info 
      //this.checkPrio()
      console.log(localStorage.getItem("items"))
      let ls = JSON.parse(localStorage["items"])
      this.items.xitems = ls
      //this.items.xitems.sort(function(a,b){return a.prioNum-b.prioNum})
      this.counter = this.items.xitems.length
      this.items.xitems.sort((a,b)=> {return a.prioNum-b.prioNum})


  }else{
      //this.items.xitems.sort((a, b) => a.priority.localeCompare(b.priority))
      this.lsUpdate()      
      this.items.xitems.sort((a,b)=> {return a.prioNum-b.prioNum})

  }
  }

}
