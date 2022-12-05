import 'package:movi/models/user_model.dart';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user-model';

export abstract class IAuthService {
    abstract signIn() : Observable<User>;
    abstract isLogined() : boolean;
}