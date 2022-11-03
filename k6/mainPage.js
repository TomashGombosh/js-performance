import { parseHTML } from 'k6/html';
import http from 'k6/http';
import { check } from "k6";
import { Rate, Trend } from "k6/metrics";

const errors = new Rate("errors");
const trends = new Trend("trends");

export default function () {
  const mainPageRes = http.get('https://dev.buy-it.afj-solution.com');
  const mainPageDoc = parseHTML(mainPageRes.body);
  const loginIcon = mainPageDoc.find("[href='/login']");
  const myCartIcon = mainPageDoc.find("[href='/my/cart']");
  check(mainPageRes, { "status was 200": (r) => r.status === 200 });
  errors.add(mainPageRes.error_code);
  console.log(mainPageDoc);

  trends.add(mainPageRes.timings.sending + mainPageRes.timings.receiving);
  const loginPageRes = http.get('https://dev.buy-it.afj-solution.com/login');
  const loginPageDoc = parseHTML(loginPageRes.body);
  const usernameInput = loginPageDoc.find("#username");
  check(loginPageRes, { "status was 200": (r) => r.status === 200 });
  errors.add(loginPageRes.error_code);
  trends.add(loginPageRes.timings.sending + loginPageRes.timings.receiving);
}

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');
  return {
      "./report/report.json": JSON.stringify(data),
  }
}