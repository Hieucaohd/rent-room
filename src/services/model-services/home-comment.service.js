import HomeComment from '../../models/HomeComment.js';
import { BaseService } from './base.service.js';

export class HomeCommentService extends BaseService {
    /** @type {import('../../common/types/common-types').MetaBaseService} */
    static meta = {
        model: HomeComment,
    };
}
