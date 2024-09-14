export const navArray = [
  { to: "/", text: "Home", authRequired: false },
  {
    to: "/app",
    text: "App",
    authRequired: true,
    // subMenu: [
    //   { to: "app/cities", text: "Cities" },
    //   { to: "app/countries", text: "Countries" },
    // ],
  },
  { text: "Posts", to: "/posts", authRequired: true },
  // { text: "About", to: "/about", authRequired: false },
  { text: "Contact Us", to: "/contact-us", authRequired: false },
];
