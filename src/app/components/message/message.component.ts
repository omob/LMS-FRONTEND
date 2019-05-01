import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0}),
        animate(1000)
      ])
    ])
  ]
})
export class MessageComponent implements OnInit {

  messages: any[];
  onlineusers: User[];
  isTyping: boolean = false;
  typing: string = "";
  timeout: any;
  currentChatUser: User;


  constructor(public authService: AuthService) { 
    this.onlineusers = [
      { 
        userId: "001", 
        username: "James Divine", 
        matricNo: '1092827678',
        messages: [
          {
            from: "Nelson Flitch",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel nisl fermentum, cursus augue eget, dapLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel nisl fermentum, cursus augue eget, dapLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel nisl fermentum, cursus augue eget, dapLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel nisl fermentum, cursus augue eget, dapLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel nisl fermentum, cursus augue eget, dapLorem ipsum dolor sit amet, consectetur adipiscing elit.",
            time: new Date()
          },
          {
            from: "James Williams",
            content: "Proin tempor arcu velit, ac fringilla enim pretium eu. ",
            time: new Date()
          },
          {
            from: "James Williams",
            content: "Hello",
            time: new Date()
          },
        ]  
      },
      { 
        userId: "002", 
        username: "Nelson Flitch", 
        matricNo: '1092827678',
        messages: [] 
      },
      { 
        userId: "003", 
        username: "Rebecca Williams ", 
        matricNo: '1092827678',
        messages: []
      },
      { 
        userId: "004", 
        username: "Jeremy Mandals ", 
        matricNo: '1092827678',
        messages: [] 
      },
      { 
        userId: "005", 
        username: "Tunde Taiwo ", 
        matricNo: '1092827678',
        messages: []
      }
    ]
  }
  
  ngOnInit() {
  }
  
  ngAfterContentInit() : void{ 
    let message = document.getElementById('messageDiv');
    console.log(message);
  }

  sendMessage(message: HTMLInputElement, messageDiv: HTMLElement): void{

    //send message to server to user
    this.currentChatUser.messages.splice(0, 0, {
      from: this.authService.loggedInUser().name,
      content: `${ message.value }`,
      time: new Date()
    });
    message.value = "";
    messageDiv.scrollTop += messageDiv.scrollHeight + 200;
  }

  onChange(event: KeyboardEvent): void {
    // if(event.key !== 'Enter'){
      
    //   if(this.timeout ){
    //     this.typing = 'typing ...';
    //     this.timeout = setTimeout( ()=> {
    //       this.typing = '';
    //     },2000);

    //   }else{
    //     this.timeout = 0
    //   }
    // }
  }

  //when i click on a user, load interactions between for the user
  loadUser(user: User){
    this.fetchUserChat(user);
  }

  fetchUserChat(user: User) {
    //fetch user from database
    this.currentChatUser = user;
  }

  fetchOnlineUsers(){
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.onlineusers);
       }, 1000);
      });
  }

}

interface User{
  userId: string;
  username: string;
  matricNo: string;
  messages: any;
}