import { assertStrictEquals, assertEquals } from '@std/assert'
import {
    type I_infer,
    make_unknown_2,
    is_string,
    nonempty_string,
    is_number,
    nullable,
} from '../lib/mod.ts'
import { is_array } from "../lib/guards.ts";

// describe the user type
const user_description = {
    id: is_string(),
    stu_name: is_string(n =>
        n.length > 2
    ),
    friends: nullable(is_array(is_string(name =>
        name.charAt(0) === name.charAt(0).toUpperCase()
    ))),
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

Deno.test('guard test', () => {
    const user_unknown: unknown = {
        id: '1',
        stu_name: 'ppz',
        friends: null,
        classroom: {
            id: '1',
            name: '101',
            index: 1,
        },
    }
    
    // const _: I_user = user // Type 'unknown' is not assignable to...

    const u2_user = unknown_2_user(user_unknown)
    assertStrictEquals(u2_user.yes, true)
    const user: I_user = u2_user.data
    assertStrictEquals(user.id, '1')
    assertStrictEquals(user.stu_name, 'ppz')
})

Deno.test('guard test - error keys', () => {
    const user_unknown: unknown = {
        id: '1',
        stu_name: 'pzz',
        friends: null,
        classroom: {
            id: '1',
            name: '101',
            index: 1.1, // not integer
        },
    }
    
    const u2_user = unknown_2_user(user_unknown)
    assertStrictEquals(u2_user.yes, false)
    assertStrictEquals(u2_user.keys.length, 2)
    assertEquals(u2_user.keys, ['classroom', 'index'])
})

Deno.test('guard test - array', () => {
    const user_unknown: unknown = {
        id: '1',
        stu_name: 'pzz',
        friends: [],
        classroom: {
            id: '1',
            name: '101',
            index: 1,
        },
    }

    const u2_user = unknown_2_user(user_unknown)

    assertStrictEquals(u2_user.yes, true)
})

Deno.test('guard test - array error', () => {
    const user_unknown: unknown = {
        id: '1',
        stu_name: 'pzz',
        friends: ['JK', 'jjz'], // not upper case
        classroom: {
            id: '1',
            name: '101',
            index: 1,
        },
    }

    const u2_user = unknown_2_user(user_unknown)

    assertStrictEquals(u2_user.yes, false)
    assertStrictEquals(u2_user.keys.length, 2)
    assertEquals(u2_user.keys, ['friends', 1])
})
