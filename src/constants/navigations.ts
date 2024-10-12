const mainNavigations = {
  CHAT: 'Chat',
  BOOKMARKS: 'Bookmarks',
  SETTINGS: 'Settings',
} as const;

const authNavigations = {
  ONBOARDING: 'Onboarding',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  DRFIRST: 'DrFirst',
  DRSECOND: 'DrSecond',
} as const;

export {mainNavigations, authNavigations};
