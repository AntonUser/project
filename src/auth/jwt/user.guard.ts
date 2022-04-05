import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { use } from "passport";
import { defer, from, map, Observable } from "rxjs";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const params = request.params;
        const userId: number = request.user.user.user.id;
        console.log(params);
        //console.log(this.userService.getUser(user));
        console.log(userId);
        return defer(() => from(this.userService.getUser(userId)))
            .pipe(
                map((user: User) => {
                    let hasPremission = false;
                    if (user.id === Number(params.id)) {
                        hasPremission = true;
                    }

                    return user && hasPremission;
                })
            );
    }
}
