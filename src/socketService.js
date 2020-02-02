import * as io from 'socket.io-client';
import {_BASE_SOCKET_SERVER_URL_} from "./environment";

class SocketService {
  socket = null;

  connectToServer(token) {
    let options = {
      query: {
        token: token
      }
    }
    this.socket = io( _BASE_SOCKET_SERVER_URL_, options);

    return new Promise((resolve, reject) => {
      this.socket.on('disconnect', _ => {
        console.log("Socket disconnected. It mey be not authorized.");  
        reject()
      });      
      this.socket.on('authorized', _ => {
        console.log("Authorized socket.");
        resolve();
      });
    });
  }

  onNotification(callback=() => {}) {
    if (!this.socket) {
      return;
    }
    
    this.socket.on("notification", (data) => callback(data));
  }

  disconnect() {
    if (!this.socket) {
      return;
    }

    this.socket.disconnect();
  }
}
const socketService = new SocketService();

export default socketService;