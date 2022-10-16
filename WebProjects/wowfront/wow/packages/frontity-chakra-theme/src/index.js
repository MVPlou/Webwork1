import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import processors from "./components/styles/processors";
// import { theme } from "@chakra-ui/react";

const chakraTheme = {
  name: "frontity-chakra-theme",
  roots: {
    // In Frontity, any package can add React components to the site.
    // We use roots for that, scoped to the "theme" namespace.
    theme: Theme
  },
  state: {
    // State is where the packages store their default settings and other
    // relevant state. It is scoped to the "theme" namespace.
    theme: {
      /**
       * The logo can be a text or an image url
       * logo : "Frontity"
       * logo: "https://uploads-ssl.webflow.com/5be00771820599586e6bd032/5be0223588110a6dbcac2d05_image.svg",
       */
      logo: "https://deltiasgaming.com/wp-content/uploads/2021/04/dg-geco-logo.png",
      showBackgroundPattern: true,
      showSocialLinks: true,
      /**
       * socialLinks: [
            ["pinterest", "https://www.pinterest.com/frontity/"],
            ["facebook", "https://www.instagram.com/frontity/"],
            ["twitter", "https://www.twitter.com/frontity/"]
          ],
       */
      socialLinks: [],
      menu: [],
      featured: {
        showOnArchive: false,
        showOnPost: true
      },

      colors: {
        primary: 
        {
          50: '#f7e7ff',
          100: '#dbbdf7',
          200: '#c292ee',
          300: '#a867e5',
          400: '#8f3cdc',
          500: '#7623c3',
          600: '#5b1a99',
          700: '#41126e',
          800: '#270a44',
          900: '#10021c',
        },
        accent: 
        {
          50: '#f7e7ff',
          100: '#dbbdf7',
          200: '#c292ee',
          300: '#a867e5',
          400: '#8f3cdc',
          500: '#7623c3',
          600: '#5b1a99',
          700: '#41126e',
          800: '#270a44',
          900: '#10021c',
        }
      },
      isSearchModalOpen: false,
      isMobileMenuOpen: false,
      autoPreFetch: "all"
    }
  },
  // Actions are functions that modify the state or deal with other parts of
  // Frontity like libraries.
  actions: {
    theme: {
      openMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = true;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      openSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = true;
      },
      closeSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = false;
      }
    }
  },
  libraries: {
    html2react: {
      // Add a processor to html2react so it processes the <img> tags
      // inside the content HTML. You can add your own processors too.
      processors: [image, ...processors]
    }
  }
};

export default chakraTheme;
