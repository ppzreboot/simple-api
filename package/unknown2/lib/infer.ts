import type { I_unknown_2 } from './unknown2.ts'

export
type I_infer<desc> = {
    [k in keyof desc]: desc[k] extends I_unknown_2<infer D>
        ? D
        : never
}
