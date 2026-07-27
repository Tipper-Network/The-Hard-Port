export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    providers: () => [...queryKeys.auth.all, 'providers'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },
  applications: {
    all: ['applications'] as const,
    lists: () => [...queryKeys.applications.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.applications.all, 'detail', id] as const,
  },
  tracking: {
    all: ['tracking'] as const,
    funnel: (days: number) => [...queryKeys.tracking.all, 'funnel', days] as const,
    journey: (applicationId: string) =>
      [...queryKeys.tracking.all, 'journey', applicationId] as const,
  },
} as const
