import { expect } from "chai";
import { updateErrorState } from "../scripts/formBehavior.ts";

describe("HTML Input Validation", function () {
  let submitButton: HTMLButtonElement;
  type InputNames = "fullname" | "email" | "message";
  let errorList: Map<InputNames, string>;

  beforeEach(() => {
    submitButton = document.getElementById(
      "submitButton",
    )! as HTMLButtonElement;
    errorList = new Map<InputNames, string>();
  });

  describe("Fullname", () => {
    let input: HTMLInputElement;

    this.beforeEach(() => {
      input = document.getElementById("formName") as HTMLInputElement;
    });

    it("it should add an error to the list", () => {
      input.value = "Hello! <script>hehe hacker</script>";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(1);
    });

    it("it should not add an error to the list", () => {
      input.value = "José Moreno";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(0);
    });
  });
  describe("Email", () => {
    let input: HTMLInputElement;

    this.beforeEach(() => {
      input = document.getElementById("formEmail") as HTMLInputElement;
    });

    it("it should add an error to the list, not a email ", () => {
      input.value = "notunemail";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(1);
    });
    it("it should add an error to the list, empty string", () => {
      input.value = "";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(1);
    });
    it("it should not add an error to the list", () => {
      input.value = "jamm.webdev@gmail.com";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(0);
    });
  });

  describe("Message", () => {
    let input: HTMLInputElement;

    this.beforeEach(() => {
      input = document.getElementById("formMessage") as HTMLInputElement;
    });

    it("it should add an error to the list, script", () => {
      input.value = "Hola! <scrip>alert('Hello, there!')</scrip>";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(1);
    });

    it("it should add an error to the list, empty string", () => {
      input.value = "";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(1);
    });

    it("it should not add an error to the list", () => {
      input.value = "Hola! Quiero empezar a realizar envios con ustedes.";
      input.checkValidity();
      updateErrorState(input, errorList);
      expect(errorList.size).to.be.equal(0);
    });
  });
});
