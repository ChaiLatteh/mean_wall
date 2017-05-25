import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Array<any>;
  user: any;
  constructor(
    private _messagesService: MessagesService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getMessages()
  }


  getMessages(){
    this._messagesService.getMessages()
    .then( (messages) => this.messages = messages )
    .catch( (err) => console.log(err) )
  }
  newMessage(formData){
    if (formData.value.message==""){
      alert('Please enter the message.');
    }
    else{
      this._messagesService.newMessage(formData.value)
      .then( (message) => {
        console.log(message)
        formData.reset()
        this.getMessages()
      })
      .catch( (err) => this._router.navigate(['login']) )
    }
  }
  getCurrentUser(){
    this._messagesService.getCurrentUser()
    .then( (user)=> this.user = user)
    .catch( (err) => this._router.navigate(['/login']))
  }
  deleteMessage(message){
    this._messagesService.deleteMessage(message)
    .then( () => {
      console.log("SUCCESS!!")
      this.getMessages()
    })
    .catch( (err) => console.log("NOOOO", err) )
  }


}
