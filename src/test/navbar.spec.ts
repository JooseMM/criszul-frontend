import { expect } from "chai";
import { onClickWhileMenuOpen } from "../scripts/navbarMenuBehavior";

const mobileNav = document.getElementById("popUpMenu")!;
const menuBtn = document.getElementById("navBtn")!;

document.onclick = onClickWhileMenuOpen;

describe("Testing Mobile Navbar Interaction", () => {
  it("should have a display styles of flex", () => {
    menuBtn.click();
    expect(mobileNav.style.display).to.be.equal("flex");
  });
  it("should have a display styles of flex", () => {
    (mobileNav.children[0] as HTMLElement).click();
    mobileNav.click();
    expect(mobileNav.style.display).to.be.equal("flex");
  });
  it("should have a display styles of none", () => {
    (mobileNav.children[0].children[0] as HTMLElement).click();
    expect(mobileNav.style.display).to.be.equal("none");
  });
  it("should have a display styles of none", () => {
    menuBtn.click();
    document.body.click();
    expect(mobileNav.style.display).to.be.equal("none");
  });
});
