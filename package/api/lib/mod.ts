import type { I_type_desc, I_infer } from '@ppz/unknown2'
import type {
    I_body,
    I_body_json,
    I_body_form,
    I_body_binary,
    I_body_text,
} from './body.ts'

type _string_kv = Record<string, string>
type _empty_obj = Record<PropertyKey, never>

export
interface I_HTTP_API_input {
    query?: I_type_desc<_string_kv>
    headers?: I_type_desc<_string_kv>
    body?: I_body
}

type _infer_body<desc extends I_body> =
    desc extends I_body_json | I_body_form 
        ? I_infer<desc['data_type']>
        : desc extends I_body_text
            ? string
            : desc extends I_body_binary
                ? ArrayBuffer | Blob | ReadableStream
                : never

export
type infer_input<I_input extends I_HTTP_API_input> =
    (I_input['query'] extends I_type_desc<_string_kv>
        ? { query: I_infer<I_input['query']> } : _empty_obj
    ) &
    (I_input['headers'] extends I_type_desc<_string_kv>
        ? { headers: I_infer<I_input['headers']> } : _empty_obj
    ) &
    (I_input['body'] extends I_body
        ? { body: _infer_body<I_input['body']>} : _empty_obj
    )

export
interface I_HTTP_API_output {
    /** standard http status code is fixed to 200 */
    http_status_code: 200
    dev_error?: number
    infra_error?: number
    headers?: I_type_desc<_string_kv>
    body?: I_body
}

export
type infer_output<output extends I_HTTP_API_output> = {
    error: null | (
        {
            type: 'unknown'
        }
    ) | (
        output['dev_error'] extends number
            ? {
                type: 'dev'
                code: output['dev_error']
                details: null | string
            } : never
    ) | (
        output['infra_error'] extends number
        ? {
            type: 'infra'
            code: output['infra_error']
            details: null | string
        } : never
    )
} & (
    output['headers'] extends I_type_desc<_string_kv>
        ? {
            headers: I_infer<output['headers']>
        } : _empty_obj
) & (
    output['body'] extends I_body
        ? {
            body: _infer_body<output['body']>
        } : _empty_obj
)

export
interface I_HTTP_API<
    I_input extends I_HTTP_API_input,
    I_output extends I_HTTP_API_output,
> {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    path: string
    input: I_input
    output: I_output
}
