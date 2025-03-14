const toggleNavigationMenu = (): void => {
  menu.classList.toggle("open-menu");
};

const menu = document.getElementById("menu")!;
const linkContainer = document.getElementById("linkContainer")!;
const menuBtn = document.getElementById("menuBtn")!;

/* adding behavior to the navbar menu button */
menuBtn.onclick = toggleNavigationMenu;

/* when anything else but the menu is click close it
 * if (excludedElement && event.target !== excludedElement && !excludedElement.contains(event.target as Node))
 * */
document.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as Node;
  if (
    menu === target || // if menu container press
    menu.children[0] === target || // if the anchor list container press
    menuBtn === target || // if the mobile menu button is press
    menuBtn.contains(target) // if the button image is press
  ) {
    return; // Ignore clicks on the menu or menu button
  }
  menu.classList.remove("open-menu"); // Close the menu otherwise
});
