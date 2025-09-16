import type { I_type_desc } from '@ppz/unknown2'

/** Content-Type: application/json */
export
interface I_body_json {
    body_type: 'json'
    data_type: I_type_desc<object>
}

/** Content-Type: multipart/form-data */
export
interface I_body_form {
    body_type: 'form'
    data_type: I_type_desc<object>
}

export
interface I_body_text {
    body_type: 'text'
    data_type: (val: string) => boolean
}

export
interface I_body_binary {
    body_type: 'binary'
}

export
type I_body
    = I_body_json
    | I_body_form
    | I_body_text
    | I_body_binary
