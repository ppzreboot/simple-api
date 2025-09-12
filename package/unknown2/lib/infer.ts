type I_extract<type_guard> =
    type_guard extends
        (val: unknown) => val is infer Type
    ? Type : never

export
type I_infer<desc> = {
    [k in keyof desc]: I_extract<desc[k]>
}
