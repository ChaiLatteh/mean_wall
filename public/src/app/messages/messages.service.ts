import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

@Injectable()
export class MessagesService {

  constructor(private _http:Http) { }
  getMessages(){
    return this._http.get('/api/messages')
    .map( (response:Response) => response.json())
    .toPromise()
  }
  newMessage(message){
    return this._http.post('/api/messages', message)
    .map( (response: Response) => response.json())
    .toPromise();
  }
  getCurrentUser(){
    return this._http.get('/api/current')
    .map( (response:Response) => response.json())
    .toPromise()
  }
  deleteMessage(message){
    return this._http.delete('/api/messages/delete/'+message._id, message)
    .map( (response: Response) => response.json())
    .toPromise();
  }

}
