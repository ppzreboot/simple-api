import type {
    I_HTTP_API,
    infer_input,
    infer_output,
    I_HTTP_API_input,
    I_HTTP_API_output,
    I_body,
} from '@ppz-http/api'
import {
    type I_type_desc,
    type I_unknown_2,
    make_unknown_2,
} from '@ppz/unknown2'

export
function Request<
    I_input extends I_HTTP_API_input,
    I_output extends I_HTTP_API_output,
>(config: I_HTTP_API<I_input, I_output>) {
    const unknown2 = {
        input: {
            query: _make_unknown_2(config.input.query),
            headers: _make_unknown_2(config.input.headers),
            body: _make_body_unknown_2(config.input.body),
        },
        output: {
            headers: _make_unknown_2(config.output.headers),
            body: _make_body_unknown_2(config.output.body),
        }
    }
    return async function request(input: infer_input<I_input>): Promise<
        [false, infer_output<I_output>]
        | Promise<['query']>
        | Promise<['network']>
    > {
        let query_str = ''
        if (unknown2.input.query !== undefined) {
            const u2 = unknown2.input.query(input.query)
            if (u2.yes)
                query_str = new URLSearchParams(u2.data as Record<string, string>)
                    .toString()
            else {
                console.error('error on http request, checking query', u2.keys)
                return ['query']
            }
        }

        const response = await fetch(config.path + query_str, {
            method: config.method,
        })

        if (response.status !== 200) {
            console.error('error on http request, network error')
            console.error(response)
            return ['network']
        }

        const error_type = response.headers.get('error_type')
        if (error_type)

        return [false, { error: null }]
    }
}

function make_url(path: string, query: Record<string, string>) {
    return path + '?' + new URLSearchParams(query).toString()
}

function _make_unknown_2<T extends object>(desc?: I_type_desc<T>) {
    if (desc)
        return make_unknown_2(desc)
}

function _make_body_unknown_2(body?: I_body) {
    if (!body || body.body_type === 'binary') return

    if (body.body_type === 'text')
        return body.body_type
    return make_unknown_2(body.data_type)
}

function Get_error<
    I_dev extends number | null,
    I_infra extends number | null,
>(dev: I_dev, infra: I_infra)
    : [false, I_infer<]
{
    const type = headers.get('error_type')
    if (type === null)
        return null
    switch(type )
}
