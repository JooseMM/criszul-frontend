import { expect } from "chai";
import type { InputNames } from "../models/InputNames";
import { addOrUpdateErrorElement } from "../scripts/formBehavior";

const invalidClassName = "contact__input--invalid";

describe("Valid Input Value Case", () => {
  let errorList: Map<InputNames, string>;
  let input: HTMLInputElement;

  beforeEach(() => {
    errorList = new Map<InputNames, string>();
    input = document.getElementById("formEmail") as HTMLInputElement;
  });

  it("should not add contact__input--invalid class to input element", () => {
    addOrUpdateErrorElement(input, errorList);
    expect(input.classList.contains(invalidClassName)).to.be.equal(false);
  });

  it("should not add an error span element", () => {
    const parent = input.parentElement;
    expect(parent!.contains(parent!.querySelector("span"))).to.be.equal(false);
  });
});

describe("Invalid input Value Case", () => {
  let errorList: Map<InputNames, string>;
  let input: HTMLInputElement;

  beforeEach(() => {
    errorList = new Map<InputNames, string>();
    input = document.getElementById("formEmail") as HTMLInputElement;
    errorList.set("email", "error mock");
  });

  it("should add contact__input--invalid class to input element", () => {
    addOrUpdateErrorElement(input, errorList);
    expect(input.classList.contains(invalidClassName)).to.be.equal(true);
  });

  it("should add an error span element", () => {
    const parent = input.parentElement;
    expect(parent!.contains(parent!.querySelector("span"))).to.be.equal(true);
  });
});
