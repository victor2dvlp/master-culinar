import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {AppRoutesModule} from "../app-routes.module";
import {SharedModule} from "../shared/shared.module";
import { NotFoundComponent } from './not-found/not-found.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../shared/auth.interceptor";
import {LoggingInterceptor} from "../shared/logging.interceptor";

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutesModule,
    SharedModule
  ],
  exports: [
    AppRoutesModule,
    HeaderComponent,
    NotFoundComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ]
})
export class CoreModule {}
