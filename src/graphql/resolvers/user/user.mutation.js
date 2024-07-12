import { updateUserInDatabase, UserService } from '../../../services/model-services/user.service';
import { DeleteMutation, InstanceMutation } from '../base-resolver/base.mutation';
import { serializerUser } from '../../../services/helpers/auth.service';
import {
  PermissionDeninedError,
  UserNotAuthenticatedError,
} from '../../../common/errors/graphql-errors';

export class UserUpdate extends InstanceMutation {
  /** @type {MetaInstanceMutation} */
  static meta = {
    modelService: UserService,
    permissions: [],
    permissionsInstance: [],
    idField: 'id',
  };

  static cleanInput({ input }, context) {
    input[this.idField] = context.user._id;
    return input;
  }

  static async checkPermissions({ source, args, context, info }) {
    if (!context.isAuth) {
      throw new UserNotAuthenticatedError();
    }
  }

  static cleanInstance(instance, context) {
    return serializerUser(instance);
  }
}
