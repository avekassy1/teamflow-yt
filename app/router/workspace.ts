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
    .output(z.void())
    .handler(async ({input}) => {
        console.log(input);
        
    })

// HALO continue from 3hr 29 mins