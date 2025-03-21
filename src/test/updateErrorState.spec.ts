import { expect } from "chai";
import { JSDOM } from "jsdom";

type InputNames = "fullname" | "email" | "message";

describe("HTML Input Validation", function () {
  let dom;
  let document: Document;
  let submitButton: HTMLButtonElement;
  let updateErrorState: (
    target: HTMLInputElement,
    errorList: Map<InputNames, string>,
  ) => void;
  let errorList: Map<InputNames, string>;

  beforeEach(() => {
    // Set up the DOM before each test
    dom = new JSDOM(`
      <html>
        <body>
	  <form>
            <div>
              <label for="fullName">Nombre</label>
              <input
                id="formName"
                type="text"
                minlength="2"
                required
                pattern="^[A-Za-zÁáÉéÍíÓóÚúÑñÜü\\s]+$"
                name="fullname"
                placeholder="Ejem: Luis Ramirez"
              />
            </div>
            <div>
              <label for="email">Correo Electronico</label>
              <input
                id="formEmail"
                type="email"
                required
                name="email"
                placeholder="Ejem: Luis Ramirez"
              />
            </div>
            <div>
              <label for="message">Mensaje</label>
              <textarea
                id="formMessage"
                rows="4"
                name="message"
                required
                placeholder="Ejem: Me encantaria realizar mis envios con ustedes!"
              ></textarea>
            </div>
            <button id="submitButton" type="submit" class="contact__button">
              Enviar
            </button>
          </form>
        </body>
      </html>
    `);
    document = dom.window.document;
    submitButton = document.getElementById(
      "submitButton",
    )! as HTMLButtonElement;

    updateErrorState = (
      target: HTMLInputElement,
      errorList: Map<InputNames, string>,
    ): void => {
      const state = target.validity;
      const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñÜü0-9¡!.,\s¿?]+$/; // for textarea only
      let error = "";

      if (state.tooShort) {
        error = "Nombre invalido, minimo dos caracteres";
      }
      if (target.name === "message" && !regex.test(target.value)) {
        error = "Solo numeros, signos de puntuacion y exclamacion";
      }
      if (state.patternMismatch) {
        error = "Solo se permiten letras y espacios";
      }
      if (state.typeMismatch) {
        error = "Email invalido";
      }
      if (state.valueMissing) {
        error = "Campo requerido";
      }

      if (!error) {
        // remove it if no error is found
        errorList.delete(target.name as InputNames);
        submitButton.disabled = errorList.size ? true : false;
        return;
      }

      // if there is a new error push the new error
      errorList.set(target.name as InputNames, error);
      submitButton.disabled = true;
    };
    errorList = new Map<InputNames, string>();
  });

  describe("fullname", () => {
    let input: HTMLInputElement;

    this.beforeEach(() => {
      input = document.getElementById("formName") as HTMLInputElement;
    });

    it("it should add an error to the list", () => {
      input.value = "Ana <script>alert('Im a hacker! hehe')</scrip>";
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
