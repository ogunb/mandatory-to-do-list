import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodayComponent } from './components/today/today.component';
import { TodoNewComponent } from './components/todo-new/todo-new.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoDeleteComponent } from './components/todo-delete/todo-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
    TodoNewComponent,
    TodoComponent,
    TodoDeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
