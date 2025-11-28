import arcjet, { slidingWindow } from "@/lib/arcjet"
import { base } from "../base";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";

const buildStardardAj = () => 
    arcjet.withRule(
        slidingWindow({
            mode: 'LIVE',
            interval: '1m',
            max: 2,
        })
    )


 export const writeSecurityMiddleware = base.$context<{
    request: Request;
    user: KindeUser<Record<string, unknown>>; 
}>().middleware(async ({context, next, errors}) => {
    const decision = await buildStardardAj().protect(context.request, {
        userId: context.user.id,
    });

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            throw errors.FORBIDDEN({
                message: 'Too many impactful changes. Slow down papi.',
            });
        }

        throw errors.FORBIDDEN({
            message: 'Request blocked.',
        });
    }

    return next();
})