import home from './home/home.resolver';
import room from './room/room.resolver';
import user from './user/user.resolver';
import search from './search/search.resolver';
import customTypes from './custom-types.resolver';
import auth from './auth/auth.resolver';

export default [home, room, user, search, customTypes, auth];
