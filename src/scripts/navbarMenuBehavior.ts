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

/* set initial display state */
mobileNav.style.display = "none";
/* adding behavior to the navbar menu button */
menuBtn.onclick = toggleNavigationMenu;

/* when anything else but the menu is click close it */
document.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as Node;
  if (
    mobileNav === target || // if menu container press
    mobileNav.children[0] === target || // if the anchor list container press
    menuBtn === target || // if the mobile menu button is press
    menuBtn.contains(target) // if the button image is press
  ) {
    return; // Ignore clicks on the menu or menu button
  }
  mobileNav.style.display = "none"; // Close the menu otherwise
});

console.log("compiled!");
