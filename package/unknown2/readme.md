# unknown2.ts

``` bash
deno add @ppz/unknown2
```

[unknown](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#any-unknown-object-void-undefined-null-and-never-assignability) type -> known type

+ It is not a "backend" lib.
+ It is not a "http" util lib.
+ It is just a lib to guard unknown type.
+ It is useful in both frond and back end, whether in http or not.

## Guard Item

Other guard item can be added in the further,
released as a separate lib.

Reduce code size by treeshaking.

## 更精确的报错信息？

只提供 key 作为报错信息，仅是为了方便开发者定位错误字段。

而更精确的报错信息，比如提供“用户年龄必须是小于 200 的正整数”，是不应该提供的。
这种报错是给“用户”看的。
用户的原始输入（一般是字符串）需要更复杂的检验流程，
比如，可能首先要把字符串转成数字。

对用户输入的校验，是另一种流程，跟 api 数据校验是不同的。
