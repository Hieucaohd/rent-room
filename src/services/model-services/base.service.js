export class BaseService {
    static async getInstanceById(id, context) {
        throw new Error('This method must be implemented by subclass.');
    }

    static async getListInstances(data, context) {
        throw new Error('This method must be implemented by subclass.');
    }

    static async createInstance(data, context, session) {
        throw new Error('This method must be implemented by subclass.');
    }

    static async updateInstance(data, context, session) {
        throw new Error('This method must be implemented by subclass.');
    }

    static async deleteInstanceById(id, context, session) {
        throw new Error('This method must be implemented by subclass.');
    }
}
