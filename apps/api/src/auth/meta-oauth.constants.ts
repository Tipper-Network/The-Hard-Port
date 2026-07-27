/** Meta Login permissions — must match Meta Developer app configuration. */
export const META_OAUTH_SCOPES = [
  'email',
  'public_profile',
  'user_birthday',
  'user_gender',
  'user_hometown',
] as const

/** Graph API fields requested via passport-facebook `profileFields`. */
export const META_PROFILE_FIELDS = [
  'id',
  'emails',
  'name',
  'picture.type(large)',
  'birthday',
  'gender',
  'hometown',
] as const
