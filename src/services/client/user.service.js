import ApiService from '../api.services';

export default new class UserService extends ApiService {
  constructor() {
    super('/users', 'users');
  }
};