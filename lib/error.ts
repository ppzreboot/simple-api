// 此处 error msg 的写法（尾大写）是为了明确异常的来源：凡尾大写，都来自 simple api，而不是中间的 CDN、nginx 等。

const _err = (default_msg: string, status: number) =>
	(msg = default_msg) =>
		new Response(msg, { status })

type make_err = (msg?: string) => Response

export const bad_request: make_err = _err('baD requesT', 400)

export const not_found: make_err = _err('noT founD', 404)

export const unknown_error: make_err = _err('unknowN erroR', 500)

export const not_implemented: make_err = _err('noT implementeD', 501)
