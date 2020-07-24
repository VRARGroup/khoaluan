import { Injectable, EventEmitter } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { bl } from "../model/binhluan";
import { dg } from '../model/danhgia';

@Injectable({
  providedIn: "root"
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  signalReceived = new EventEmitter<bl>();
  signaldgReceived = new EventEmitter<dg>();
  constructor() {  
    this.createConnection();
    this.startConnection();  
  } 

  createConnection() {
    this.hubConnection =  new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44309/signalHub')
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  private startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection Started...");
        this.registerSignalEvents();
        this.registerSignaldgEvents();
      })
      .catch(err => {
        console.log("Error while starting connection: " + err);

        //if you get error try to start connection again after 3 seconds.
        setTimeout(function() {
          this.startConnection();
        }, 3000);
      });
  };

  private registerSignalEvents() {
    this.hubConnection.on("SignalMessageReceived", (data: bl) => {
      this.signalReceived.emit(data);
    });
  }
  private registerSignaldgEvents() {
    this.hubConnection.on("Signaldg", (data: dg) => {
      this.signaldgReceived.emit(data);
    });
  }
}
