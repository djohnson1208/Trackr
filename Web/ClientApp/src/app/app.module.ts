import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { TaskAppComponent } from './components/task-app/task-app.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskAppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
