import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../App.tsx", import.meta.url), "utf8");
const appConfig = readFileSync(new URL("../app.json", import.meta.url), "utf8");

test("Merchant shell opens only the Merchant web destination", () => {
  assert.match(appSource, /https:\/\/apirak272543-ship-it\.github\.io\/ap-store-mobile\/merchant\//);
  assert.doesNotMatch(appSource, /ap-rider-mobile\/rider|Apservicebeta\/admin|ap-retail-pos/);
});

test("Merchant shell retains foreground location support", () => {
  assert.match(appSource, /geolocationEnabled/);
  assert.match(appConfig, /ACCESS_FINE_LOCATION/);
  assert.match(appConfig, /ACCESS_COARSE_LOCATION/);
});

test("Merchant shell keeps notification support and avoids background location permission", () => {
  assert.match(appSource, /onMessage/);
  assert.match(appSource, /notification/);
  assert.match(appConfig, /expo-notifications/);
  assert.match(appConfig, /POST_NOTIFICATIONS/);
  assert.doesNotMatch(appConfig, /ACCESS_BACKGROUND_LOCATION/);
});
