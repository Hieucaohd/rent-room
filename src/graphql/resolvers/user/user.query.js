import { UserService } from '../../../services/model-services/user.service';
import '../../../common/types/typedef';
import { InstanceQuery, ListQuery } from '../base-resolver/base.query';

export class UserById extends InstanceQuery {
  /** @type {MetaInstanceQuery} */
  static meta = {
    modelService: UserService,
    permissions: [],
    permissionsInstance: [],
    idField: 'id',
  };
}
