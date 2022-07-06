import { render, screen } from "@testing-library/react";
import { userService } from "services";
import "@testing-library/jest-dom";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig()

it("Doit obtenir id = 5", () => {
  expect.assertions(1);
  return expect(userService.getById(5)).resolves.toEqual(5);
});

test("la donnée est 5", () => {
  return userService.getById(5).then((data) => {
    expect(data.data.usr_id).toBe(5);
  });
});
