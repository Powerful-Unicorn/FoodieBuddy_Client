const mainNavigations = {
  CHAT: 'Chat',
  BOOKMARKS: 'Bookmarks',
  SETTINGS: 'Settings',
} as const;

const authNavigations = {
  ONBOARDING: 'Onboarding',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const drNavigations = {
  DRFIRST: 'DrFirst',
  DRSECOND: 'DrSecond',
} as const;

export {mainNavigations, authNavigations, drNavigations};
