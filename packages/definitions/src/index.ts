import * as z from 'zod';

export const UserSettingsSchema = z.object({
  wordWrap: z.boolean(),
});

export type UserSettings = z.infer<typeof UserSettingsSchema>;
