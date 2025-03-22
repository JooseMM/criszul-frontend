import { expect } from "chai";

/* addOrUpdateErrorElement test */

const invalidClassName = "contact__input--invalid";

type InputNames = "fullname" | "email" | "message";

const addOrUpdateErrorElement = (
  target: HTMLInputElement,
  errorList: Map<InputNames, string>,
  document: Document,
) => {
  const error = errorList.has(target.name as InputNames);
  if (!error) {
    return; // if error is not found do nothing
  } else {
    // create a new span element
    const errorElement = document.createElement("span");
    // set its message
    errorElement.innerHTML = errorList.get(target.name as InputNames)!;
    // add the input invalid border
    target.classList.add("contact__input--invalid");
    // append the element as a child
    target.parentElement?.appendChild(errorElement);
  }
};

it("should not have an invalidClassName", () => {
  // Set up a mock DOM
  let { window } = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div>
	<label>Name</label>
	<input/>
      </div>
    </body>
  </html>
`);

  const document = window.document;
  const input: HTMLInputElement = document.querySelector("input")!;

  const errorList = new Map<InputNames, string>();

  addOrUpdateErrorElement(input, errorList, document);

  expect(input.classList.contains(invalidClassName)).to.be.equal(false);
});

it("should not contain a span element", () => {
  // Set up a mock DOM
  let { window } = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div>
	<label>Name</label>
	<input/>
      </div>
    </body>
  </html>
  `);
  const document = window.document;

  const input: HTMLInputElement = document.querySelector("input")!;

  const errorList = new Map<InputNames, string>();

  addOrUpdateErrorElement(input, errorList, document);

  expect(input.parentElement?.querySelector("span")).to.be.equal(null);
});

it("should have an invalidClassName", () => {
  // Set up a mock DOM
  let { window } = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div>
	<label>Name</label>
	<input name="fullname" />
      </div>
    </body>
  </html>
  `);
  const document = window.document;

  const input: HTMLInputElement = document.querySelector("input")!;

  const errorList = new Map<InputNames, string>();
  errorList.set("fullname", "mock name error!");

  addOrUpdateErrorElement(input, errorList, document);

  expect(input.classList.contains(invalidClassName)).to.be.equal(true);
});

it("should contain a span element", () => {
  // Set up a mock DOM
  let { window } = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div>
	<label>Name</label>
	<input/>
      </div>
    </body>
  </html>
  `);
  const document = window.document;

  const input: HTMLInputElement = document.querySelector("input")!;
  input.name = "email";

  const errorList = new Map<InputNames, string>();
  errorList.set("email", "mock email error!");

  addOrUpdateErrorElement(input, errorList, document);

  expect(input.parentElement?.querySelector("span")).to.not.equal(null);
});

/* addOrUpdateErrorElement test */
