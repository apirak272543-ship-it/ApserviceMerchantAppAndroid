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
