// 此处 error msg 的写法（尾大写）是为了明确异常的来源：凡尾大写，都来自 simple api，而不是中间的 CDN、nginx 等。

const _err = (default_msg: string, status: number) =>
	(msg = default_msg) =>
		new Response(msg, { status })

type make_err = (msg?: string) => Response

/**
 * Bad Request 判定标准：客户端发来的请求“不对劲”。
 * 包括 query、json 这种常规的格式异常，
 * 也包括缺 Authorization 这种别人认为是“特殊的 异常请求”。
 */
export const bad_request: make_err = _err('baD requesT', 400)

/** 请求路径不存在、路径存在但 http method 不匹配。 */
export const not_found: make_err = _err('noT founD', 404)

/**
 * 写后端程序的开发者（包括 ai agent）也未预想到的异常。
 * 凡预想到的异常，都不应该响应 unknown error。
 */
export const unknown_error: make_err = _err('unknowN erroR', 500)
