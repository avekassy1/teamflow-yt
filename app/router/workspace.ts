import { KindeOrganization, KindeUser } from '@kinde-oss/kinde-auth-nextjs';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { os } from '@orpc/server';
import z from 'zod';

export const listWorkspaces = os
    .route({
        method: 'GET',
        path: '/workspace',
        summary: "Lists all workspace",
        tags: ['workspace'],
    })
    .input(z.void())
    .output(z.object({
        workspaces: z.array(
            z.object({
                id: z.string(),
                name: z.string(),
                avatar: z.string(),
            })
        ),
        user: z.custom<KindeUser<Record<string, unknown>>>(),
        currentWorkspace: z.custom<KindeOrganization<unknown>>(),
    }))
    .handler(async ({input}) => {
        const {getUserOrganizations} = getKindeServerSession() // only runs on server side
        const organizations = await getUserOrganizations();

        const workspaces = organizations?.orgs.map((org) => ({
            id: org.code,
            name: org.name,
            avatar: org.name?.charAt(0) ?? 'W',
          })) ?? [];
        
        return {
            workspaces,
        }
        
    })