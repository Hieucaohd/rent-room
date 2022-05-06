import HomeComment from '../../models/HomeComment';
import { BaseService } from './base.service';

export class HomeCommentService extends BaseService {
    /** @type {import('../../common/types/common-types').MetaBaseService} */
    static meta = {
        model: HomeComment,
    };
}
