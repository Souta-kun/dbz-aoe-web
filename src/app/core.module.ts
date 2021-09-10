import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { GuardInterceptor } from "./auth/guard-interceptor";

@NgModule({
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: GuardInterceptor,
        multi: true
      }
    ],
})
export class CoreModule {}