import { assertEquals, assertStrictEquals } from '@std/assert'
import { make_unknown_2 } from '../lib/unknown2.ts'
import { is_array, is_integer, nonempty_string, nullable } from '../lib/guards.ts'
import type { I_infer } from '../lib/infer.ts'

const school_desc = {
    name: nonempty_string(),
    year: is_integer(val => val > 0),
    grades: is_array(
        make_unknown_2({
            index: is_integer(val => val > 0),
            students: nullable(is_array(
                make_unknown_2({
                    name: nonempty_string(name =>
                        Array.from(name).every(c =>
                            (c >= 'A' && c <= 'Z')
                            || (c >= 'a' && c <= 'z')
                            || (c === ' ')
                        )
                    ),
                    year: is_integer(val => val > 0),
                })
            ))
        })
    )
}
const unknown_2_school = make_unknown_2(school_desc)

type I_school = I_infer<typeof school_desc>

Deno.test('guard complex', () => {
    const maybe_school: unknown = {
    // const maybe_school: I_school = {
        name: '123',
        year: 2,
        grades: [
            {
                index: 1,
                students: null,
            },
            {
                index: 2,
                students: [],
            },
            {
                index: 3,
                students: [{
                    name: 'ppz',
                    year: 1,
                }],
            },
            {
                index: 4,
                students: [{
                    name: 'ppz',
                    year: 2,
                }, {
                    name: 'ccz',
                    year: 3,
                }],
            }
        ]
    }

    const u2_school = unknown_2_school(maybe_school)
    assertStrictEquals(u2_school.yes, true)
    assertEquals(u2_school.data.grades[0].index, 1)
    assertEquals(u2_school.data.grades[1].students, [])
})

Deno.test('guard complex - negative year', () => {
    const maybe_school: I_school = {
        name: '123',
        year: -1,
        grades: [],
    }
    const u2_school = unknown_2_school(maybe_school)
    assertStrictEquals(u2_school.yes, false)
    assertEquals(u2_school.keys, ['year'])
})

Deno.test('guard complex - null stu', () => {
    const school: unknown = {
        name: '123',
        year: 2,
        grades: [{
            index: 1,
            students: [
                { name: 'ppz', year: 1 },
                null,
            ],
        }],
    }
    const u2_school = unknown_2_school(school)
    assertStrictEquals(u2_school.yes, false)
    assertEquals(u2_school.keys, ['grades', 0, 'students', 1])
})
