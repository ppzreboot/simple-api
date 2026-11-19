import type { HttpMethod, HttpHandler, HttpRoute } from './type.ts'

/**
 * 创建一个 HTTP 路由。
 * 弥补“不支持 middleware”的缺陷。
 * 
 * @example 全局 middleware
 * ```ts
 * const unified_route = (method: HttpMethod, path: string, handler: HttpHandler) =>
 *   http_route(method, '/api' + path, async ctx => {
 *     // before
 *     const response = await handler(ctx)
 *     // after
 *     return response
 *   })
 * ```
 * 
 * @example auth
 * ```ts
 * const auth_route = (method: HttpMethod, path: string, handler: HttpHandler) =>
 *   unified_route(method, path, async ctx => {
 *     const token = ctx.req.headers.get('Authorization')
 *     await check_session_token(token)
 *     return await handler(ctx)
 *   })
 * ```
 * 
 * @example route group
 * ```ts
 * const user_route = (method: HttpMethod, path: string, handler: HttpHandler) =>
 *   auth_route(method, '/user' + path, handler)
 * ```
 */
export
const http_route = (method: HttpMethod, path: string, handler: HttpHandler): HttpRoute =>
	[method, path, handler]
