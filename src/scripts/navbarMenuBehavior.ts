/* here we handle the mobile navigation menu behavior  */
const mobileNav = document.getElementById("popUpMenu")!;
const menuBtn = document.getElementById("navBtn")!;

const toggleNavigationMenu = (): void => {
  if (mobileNav.style.display === "none") {
    mobileNav.style.display = "flex";
  } else {
    mobileNav.style.display = "none";
  }
};
export const onClickWhileMenuOpen = (event: MouseEvent): void => {
  const target = event.target as Node;
  const isMenuPress = mobileNav === target || mobileNav.children[0] === target;
  const isButtonPress = menuBtn === target || menuBtn.children[0] === target;
  const isMenuOpen = mobileNav.style.display === "flex";

  if (isMenuOpen && !isMenuPress && !isButtonPress) {
    toggleNavigationMenu();
  }
  if (isButtonPress) {
    toggleNavigationMenu();
  }
};
/* when anything else but the menu is click close it */
document.onclick = onClickWhileMenuOpen;
