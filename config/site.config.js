/**
 * This file contains the configuration used for customising the website, such as the folder to share,
 * the title, used Google fonts, site icons, contact info, etc.
 */
module.exports = {
  // This is what we use to identify who you are when you are initialising the website for the first time.
  // Make sure this is exactly the same as the email address you use to sign into your Microsoft account.
  // You can also put this in your Vercel's environment variable 'NEXT_PUBLIC_USER_PRINCIPLE_NAME' if you worry about
  // your email being exposed in public.
  userPrincipalName: process.env.NEXT_PUBLIC_USER_PRINCIPLE_NAME || '',

  // [OPTIONAL] This is the website icon to the left of the title inside the navigation bar. It should be placed under the
  // /public directory of your GitHub project (not your OneDrive folder!), and referenced here by its relative path to /public.
  icon: '/icons/128.png',

  // Prefix for KV Storage
  kvPrefix: process.env.KV_PREFIX || '',

  // The name of your website. Present alongside your icon.
  title: "LabHub",

  // Used for the title of the website, and the title of the page when you share the link.
  siteTitle: "LabHub",
  // Used for the description of the website, and the description of the page when you share the link.
  siteDescription: "A repository of network emulator images for testing and simulation.",
  // Used for the image of the website, and the image of the page when you share the link.
  siteImage: "/icons/512.png",
  // Used for the URL of the website, and the URL of the page when you share the link.
  siteUrl: "https://labhub.eu.org",
  // Used for the language of the website, and the language of the page when you share the link.
  siteLocale: "en_US",
  // Used for the author of the website, and the author of the page when you share the link.
  siteAuthor: "LabHub",
  // Used for the keywords of the website, and the keywords of the page when you share the link.
  keywords: "LabHub",
  // Used for the type of the website, and the site type of the page when you share the link.
  siteType: "website",

  // The folder that you are to share publicly with onedrive-vercel-index. Use '/' if you want to share your root folder.
  baseDirectory: '/Pkg_sexn/',

  // Allow downloading folders
  allowFolderDownload: false,

  // [OPTIONAL] This represents the maximum number of items that one directory lists, pagination supported.
  // Do note that this is limited up to 200 items by the upstream OneDrive API.
  maxItems: 100,

  // [OPTIONAL] We use Google Fonts natively for font customisations.
  // You can check and generate the required links and names at https://fonts.google.com.
  // googleFontSans - the sans serif font used in onedrive-vercel-index.
  googleFontSans: 'Inter',
  // googleFontMono - the monospace font used in onedrive-vercel-index.
  googleFontMono: 'Fira Mono',
  // googleFontLinks -  an array of links for referencing the google font assets.
  googleFontLinks: ['https://fonts.googleapis.com/css2?family=Fira+Mono&family=Inter:wght@400;500;700&display=swap'],

  // [OPTIONAL] The footer component of your website. You can write HTML here, but you need to escape double
  // quotes - changing " to \". You can write anything here, and if you like badges, generate some with https://shields.io
  footer:
    `<span><a href="https://t.me/NetLabHub" target="_blank" rel="noopener noreferrer">LabHub</a> &copy 2021 - ${new Date().getFullYear()}</span>`,

  // [OPTIONAL] This is where you specify the folders that are password protected. It is an array of paths pointing to all
  // the directories in which you have .password set. Check the documentation for details.
  // protectedRoutes: [''],
  protectedRoutes: ['/UNRELEASED-EXPERIMENTAL', '/🥟 Some test files/Protected route'],

  // [OPTIONAL] Use "" here if you want to remove this email address from the nav bar.
  email: 'mailto:contact@labhub.eu.org',

  // [OPTIONAL] This is an array of names and links for setting your social information and links.
  // In the latest update, all brand icons inside font awesome is supported and the icon to render is based on the name
  // you provide. See the documentation for details.
  links: [
    {
      name: 'GitHub',
      link: 'https://github.com/ishare2-org',
    },
    {
      name: 'Telegram',
      link: 'https://t.me/NetLabHub',
    },
  ],

  // [OPTIONAL] This is an array of names and links for setting your donation information and links.
  // Currently, we support PayPal, Buy Me A Coffee, and Ko-fi. You can add more by providing the icon name and link in TopBanner.tsx
  donationSettings: {
    show: true,
    // Set the message to show in the donation banner in the file components/TopBanner.tsx, add translations if needed in the locale files /public/locales
    donationLinks: [
      {
        name: 'PayPal',
        link: 'https://paypal.me/sudoalex',
      },
      {
        name: 'buymeacoffee',
        link: 'https://www.buymeacoffee.com/sudoalex',
      },
      {
        name: 'ko-fi',
        link: 'https://ko-fi.com/sudoalex',
      }
    ],
  },

  // [OPTIONAL] Show a notification at the bottom right of the screen on the main page.
  // This is useful for showing announcements or messages to users.
  notification: {
    show: true,
    // Set the message to show in the notification in the file components/Notification.tsx, add translations if needed in the locale files /public/locales
  },


  // This is a day.js-style datetime format string to format datetimes in the app. Ref to
  // https://day.js.org/docs/en/display/format for detailed specification. The default value is ISO 8601 full datetime
  // without timezone and replacing T with space.
  datetimeFormat: 'YYYY-MM-DD HH:mm:ss',
}
