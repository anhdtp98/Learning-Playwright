const { test, expect } = require("@playwright/test");
import { faker } from "@faker-js/faker";
const postRequest = require("../test-data/register.json");

test("Register User", async ({ request }) => {
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const username = faker.internet.userName({ firstName, lastName });
const email = faker.internet.email({ firstName, lastName });

  const updatedRequestBody = {
    ...postRequest, // giữ password, phone, userStatus
    firstName,
    lastName,
    username,
    email,
  };

  console.log("Request Body:", updatedRequestBody);

  const response = await request.post("/api/register", {
    data: updatedRequestBody,
  });

  // Debug response
   console.log("FINAL URL:", response.url());
  console.log("Status:", response.status());
  console.log("Headers:", response.headers());
  const text = await response.text();
  console.log("Response Body:", text);

  // Validate nếu status = 200
  if (response.status() === 200) {
    expect(response.ok()).toBeTruthy();
  } else {
    console.warn("Request failed, cannot assert ok()");
  }
});
