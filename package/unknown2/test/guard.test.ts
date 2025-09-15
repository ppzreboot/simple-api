import { assertStrictEquals, assertEquals } from '@std/assert'
import {
    type I_infer,
    make_unknown_2,
    is_string,
    nonempty_string,
    is_number,
    nullable,
} from '../lib/mod.ts'

// describe the user type
const user_description = {
    id: is_string(),
    stu_name: is_string(n =>
        n.length > 2
    ),
    classroom: make_unknown_2({
        id: nonempty_string(),
        name: nullable(nonempty_string()),
        index: nullable(is_number(n =>
            Number.isInteger(n)
        )),
    }),
}

const unknown_2_user = make_unknown_2(user_description)
type I_user = I_infer<typeof user_description>

Deno.test('guard test - real', () => {
    const user_unknown: unknown = {
        id: '1',
        stu_name: 'ppz',
        classroom: {
            id: '1',
            name: '101',
            index: 1,
        },
    }
    
    // const _: I_user = user // Type 'unknown' is not assignable to...

    const u2_user = unknown_2_user(user_unknown)
    assertStrictEquals(u2_user.yes, true)
    if (u2_user.yes) {
        const user: I_user = u2_user.data
        assertStrictEquals(user.id, '1')
        assertStrictEquals(user.stu_name, 'ppz')
    }
})

Deno.test('guard test - real 2', () => {
    const user_unknown: unknown = {
        id: '1',
        stu_name: 'pzz',
        classroom: {
            id: '1',
            name: '101',
            index: 1.1, // not integer
        },
    }
    
    const u2_user = unknown_2_user(user_unknown)
    assertStrictEquals(u2_user.yes, false)
    if (u2_user.yes === false) {
        assertStrictEquals(u2_user.keys.length, 2)
        assertEquals(u2_user.keys, ['classroom', 'index'])
    }
})
