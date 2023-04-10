import instance from '@/http';

export const login = (params = { username: '', password: '' }) =>
  instance.post('login', params);
