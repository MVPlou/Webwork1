const settings = {
  name: "chakra-react",
  state: {
    frontity: {
      url: "https://test.frontity.org",
      title: "Deltias Template",
      description: "WordPress installation for Frontity development"
    }
  },
  packages: [
    {
      name: "frontity-chakra-theme",
      state: {
        theme: {
          menu: [
            ["Home", "/"],
            ["Guides", "/category/guides/"],
            ["Builds", "/category/builds/"],
            ["Destiny 2", "/tag/destiny-2/"],
            ["Contact", "/contact-deltia/"]
          ],
          socialLinks: [
            ["youtube", "https://www.pinterest.com/frontity/"],
            ["twitch", "https://www.pinterest.com/frontity/"],
            ["twitter", "https://www.twitter.com/frontity/"],
            ["instagram", "https://www.twitter.com/frontity/"]
          ],
          featured: {
            showOnArchive: true,
            showOnPost: true
          }
        }
      }
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://deltiasgaming.com/"
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
