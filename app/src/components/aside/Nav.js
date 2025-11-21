import { AsideMenuNav, AsideOtherNav } from "./Index.js";

const Nav = {
  render() {
    return `
      <nav class="flex flex-col justify-between h-full w-full">
        ${AsideMenuNav.render()}
        ${AsideOtherNav.render()}
      </nav>
    `;
  }
};

export default Nav;