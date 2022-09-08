// deno-lint-ignore-file no-explicit-any

import { Context, red } from '@deps';
import logger from '@utils/logger.ts';


/**
 * Actually this middleware is a request logger, and a error handler
 * 
 * @param param0 
 * @param next 
 * @returns 
 */
export default async function requestLogger({ request, response }: Context<Record<string, any>, Record<string, any>>, next: () => Promise<unknown>) {
    const startTime = Date.now();

    try {
        if (request.url.pathname === "/favicon.ico") {
            return await next();
        }

        logger.info(`[METHOD]: "${request.method}" [ENDPOINT]: "${request.originalRequest.url}"`);
        await next();

        const endTime = Date.now();
        const time = endTime - startTime;

        logger.success(`[TOOK]: ${time}ms [METHOD]: "${request.method}" [CODE]: "${response.status}" [ENDPOINT]: "${request.originalRequest.url}"`)
    } catch (error) {

        // Error Handler
        response.status = error.status;

        const endTime = Date.now();
        const time = endTime - startTime;
        logger.info(red(`[TOOK]: ${time}ms [METHOD]: "${request.method}" [STATUS]: "${error.status}" [ENDPOINT]: "${request.originalRequest.url}"`));

        if (error.status === 500) {
            logger.error(error.message);
            response.body = {
                data: null,
                error: "An error occured while doing your request!"
            }
            return;
        }

        response.body = {
            data: null,
            error: error.message
        }
    }

}