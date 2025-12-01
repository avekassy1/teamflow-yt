import z from "zod";

export function transformChannelName(name: string) {
    return name.toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove special characters
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-|-$/g, ""); // Remove leading and trailing hyphens
}

export const ChannelNameSchema = z.object({
    name: z
    .string()
    .min(2, 'Channel name must be at least 2 characters')
    .max(40, 'Channel name must be at most 40 characters')
    .transform((name, ctx) => {
        const transformed = transformChannelName(name);
        if (transformed.length < 2) {
            ctx.addIssue({
                code: 'custom',
                message: 'Channel name must contain at least 2 alphanumeric characters after formatting',
            });

            return z.NEVER;
        }

        return transformed;
    })
})