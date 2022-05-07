import util from 'util';

export function printObject(obj) {
    return util.inspect(obj, false, null, true);
}
