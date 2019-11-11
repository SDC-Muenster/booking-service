import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 100,
  duration: '5m',
  rps: 1000,
};
export default function () {
  const target = http.get(`http://localhost:3006/api/houses/${Math.floor(Math.random() * 1000000) + 1}`);

  check(target, {
    'is status 200': (r) => r.status === 200,
  });
}
