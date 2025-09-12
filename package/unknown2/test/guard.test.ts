import { assertEquals } from '@std/assert/equals'
import {
    type I_infer,
    make_unknown_2,
    is_string,
    not_empty_string,
    is_number,
    nullable,
} from '../src/mod.ts'

// describe the user type
const user_description = {
    id: is_string(),
    stu_name: is_string(n =>
        n.length > 2
    ),
    classroom: make_unknown_2({
        id: not_empty_string,
        name: nullable(not_empty_string),
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

    const is_user = unknown_2_user(user_unknown)
    assertEquals(is_user, true)
    if (is_user) {
        const user: I_user = user_unknown
        assertEquals(user.id, '1')
        assertEquals(user.stu_name, 'ppz')
    }
})

Deno.test('guard test - real 2', () => {
    const user_unknown: unknown = {
        id: '1',
        stu_name: 'pz', // too short
        classroom: {
            id: '1',
            name: '101',
            index: 1,
        },
    }
    
    const is_user = unknown_2_user(user_unknown)
    assertEquals(is_user, false)
})
