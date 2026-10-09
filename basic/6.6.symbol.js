// ========== 6.6 Symbol 符号详解 ==========

/*
  Symbol 是 ES6 引入的原始类型，核心使命只有一个：
  「保证唯一」—— 每个 Symbol 值都是全宇宙独一无二的，
  主要用途是作为对象属性键，避免属性名冲突。

  可以把它理解成：一个不会撞名的"隐形门牌号"。
*/


// ----------------------------------------
// 1. 创建 Symbol
// ----------------------------------------

console.log("=== 1. 创建 ===");

// 方式：调用 Symbol() 函数（注意：不是构造函数！）
let sym1 = Symbol();
let sym2 = Symbol("id");   // 参数是「描述文字」，方便调试，不影响唯一性

console.log("sym1 =", sym1.toString());   // Symbol()
console.log("sym2 =", sym2.toString());   // Symbol(id)
console.log("typeof sym2 =", typeof sym2); // symbol

/*
  ⚠️ 不能用 new：
  new Symbol();  // ❌ TypeError: Symbol is not a constructor
  因为语言刻意禁止创建 Symbol 的包装对象。
*/

// 描述文字相同 ≠ Symbol 相同
let s1 = Symbol("id");
let s2 = Symbol("id");
console.log("同描述的 s1 === s2 ?", s1 === s2); // false！每个都是唯一的


// ----------------------------------------
// 2. 唯一性：解决属性名冲突
// ----------------------------------------

console.log("\n=== 2. 唯一性的价值 ===");

/*
  场景：多人协作给同一个对象加属性，字符串键可能撞名，
  Symbol 键永远不会。
*/

let user = {
  name: "张三",
  [Symbol("id")]: 1001,        // Symbol 作键必须用方括号
  [Symbol("临时标记")]: true
};
console.log("user.name =", user.name); // 普通属性照常访问

// 经典对比：字符串键会互相覆盖
let clash = {};
clash["tag"] = "A";
clash["tag"] = "B";        // 覆盖了！
console.log("字符串键 clash.tag =", clash["tag"]); // "B"（只剩一个）

// Symbol 键各存各的
let noClash = {};
let tagA = Symbol("tag");
let tagB = Symbol("tag");
noClash[tagA] = "A";
noClash[tagB] = "B";
console.log("Symbol 键:", noClash[tagA], noClash[tagB]); // A 和 B 都在


// ----------------------------------------
// 3. Symbol 作属性键的规则
// ----------------------------------------

console.log("\n=== 3. 作属性键 ===");

const COLOR = Symbol("红色");
const SIZE = Symbol("尺寸");

let item = {
  name: "苹果",
  [COLOR]: "red",     // ✅ 必须方括号
  [SIZE]: "大"
};

console.log("访问:", item[COLOR]);   // red（只能用原 Symbol 变量访问）
// console.log(item.COLOR);          // ❌ undefined！点语法会把 COLOR 当字符串名

// 遍历的"半隐藏"特性
console.log("Object.keys():", Object.keys(item));          // ["name"] —— 看不见 Symbol 键
console.log("for...in:", Object.keys(item).join(","));     // 同样遍历不到
console.log("JSON.stringify:", JSON.stringify(item));      // {"name":"苹果"} —— Symbol 键被丢弃！
console.log("getOwnPropertySymbols:", Object.getOwnPropertySymbols(item).length); // 2（专门 API 才能拿到）


// ----------------------------------------
// 4. 全局注册表 Symbol.for / Symbol.keyFor
// ----------------------------------------

console.log("\n=== 4. 全局注册表 ===");

/*
  Symbol() 每次都是全新的；
  Symbol.for(key) 按字符串 key 查全局登记簿：
  有同名就复用，没有就创建并登记 —— 这次描述文字就起作用了。
*/

let g1 = Symbol.for("shared");
let g2 = Symbol.for("shared");
console.log("Symbol.for 同 key === ?", g1 === g2); // true！（跨代码复用同一个）

let g3 = Symbol("shared");
console.log("Symbol() 与 Symbol.for() 相等 ?", g3 === g1); // false（没登记过）

// keyFor：反查注册 key（只能查到 for 注册的）
console.log("Symbol.keyFor(g1) =", Symbol.keyFor(g1));  // "shared"
console.log("Symbol.keyFor(s1) =", Symbol.keyFor(s1));  // undefined（Symbol() 创建的不在注册表）

// 用途：多个模块/库之间需要共享同一个 Symbol 时用它


// ----------------------------------------
// 5. 众所周知的 Symbol（Well-known Symbols）
// ----------------------------------------

console.log("\n=== 5. 内置 Symbol ===");

/*
  JS 引擎内部预留了一批 Symbol，作为"语言的钩子"。
  你以后学对象协议时会反复遇到它们：
*/

console.log("Symbol.iterator =", Symbol.iterator);   // 数组/Map/Set 靠它实现 for...of
console.log("Symbol.toPrimitive =", Symbol.toPrimitive); // 控制对象转数字/字符串
console.log("Symbol.toStringTag =", Symbol.toStringTag); // 定制 Object.prototype.toString 的输出

// 小演示：toStringTag 改变对象的"类型标签"
let custom = { [Symbol.toStringTag]: "MyThing" };
console.log("String(custom) =", custom.toString()); // "[object MyThing]"

/*
  常见内置 Symbol 速览（先混个脸熟）：
  Symbol.iterator    —— 定义 for...of 的遍历方式
  Symbol.toPrimitive —— 定义转原始值的规则
  Symbol.toStringTag —— 定义 toString 的标签
  Symbol.hasInstance —— 定制 instanceof 判断
*/


// ----------------------------------------
// 6. 运算限制与转换坑
// ----------------------------------------

console.log("\n=== 6. 运算限制 ===");

let tag = Symbol("tag");

/*
  ⚠️ Symbol 不能参与数学运算（包括拼接）：
  tag + "abc";   // ❌ TypeError: Cannot convert a Symbol value to a string
  tag + 1;       // ❌ TypeError
  tag < tag2;    // ❌ TypeError（不支持大小比较）
*/

// 但显式转换是允许的
console.log("String(tag) =", String(tag));   // "Symbol(tag)"
console.log("tag.toString() =", tag.toString()); // "Symbol(tag)"
console.log("模板字符串也报错吗？");
// `${tag}` 同样 TypeError！模板字符串是隐式转换
console.log("手动放描述:", tag.description);  // "tag"（ES2019，直接拿描述）

// 转布尔：Symbol 是真值
console.log("Boolean(tag) =", Boolean(tag)); // true
console.log("tag === tag ?", tag === tag);   // true（自己等于自己，和 NaN 不同）


// ----------------------------------------
// 7. 实战：私有标记与枚举
// ----------------------------------------

console.log("\n=== 7. 实战 ===");

// 用法①：模拟"私有属性"（外部拿不到 Symbol 变量就访问不了）
const _secret = Symbol("_secret");
let obj = {
  [_secret]: "内部数据",
  getSecret() { return this[_secret]; }
};
console.log("通过方法访问:", obj.getSecret()); // "内部数据"
// 外部不知道 _secret 这个变量，就"看不见"这个属性

// 用法②：安全的枚举常量（比字符串枚举更防冲突）

/*
  什么是"字符串枚举"？就是用普通字符串当状态常量的写法：

  const STATUS = { PENDING: "PENDING", OK: "OK", FAIL: "FAIL" };

  这种写法的问题：字符串 "OK" 太普通了，全世界都可以出现它——

  ┌─ 冲突场景演示 ─────────────────────────────────────────────┐
  │ 你的模块（订单状态）：                                      │
  │   order.status = "OK";        // 表示"订单成功"             │
  │                                                             │
  │ 别人的库（HTTP 响应处理）：                                  │
  │   response.status = "OK";     // 表示"请求成功"             │
  │                                                             │
  │ 某天两段代码的数据汇合到一起，比如把 HTTP 响应直接赋给订单：  │
  │   order.status = response.status;                            │
  │   if (order.status === "OK") { 发货(); }                     │
  │   // 💥 灾难：只要请求成功（"OK"）就发货了！                  │
  │   //    哪怕订单本身还是 "PENDING" 也被覆盖成 "OK"            │
  └─────────────────────────────────────────────────────────────┘

  根源：两个完全不同含义的状态，恰好用了同一个字符串值 "OK"，
  而 === 比较时它们就是相等的，JS 无法区分"是谁的 OK"。

  Symbol 如何解决？
  Symbol("OK") 每次创建都是独一无二的值，即使描述文字一模一样：
    Symbol("OK") === Symbol("OK")   // false！
  所以你的 STATUS.OK 和别的库的某个 Symbol("OK") 永远不可能 ===，
  误比较、误覆盖在语言层面就被杜绝了——这就是"防冲突"。
*/

const STATUS = {
  PENDING: Symbol("PENDING"),
  OK: Symbol("OK"),
  FAIL: Symbol("FAIL")
};
let taskStatus = STATUS.OK;
console.log("状态判断:", taskStatus === STATUS.OK); // true

// 对比：另一个"库"也定义了自己的 Symbol("OK")，两者绝不混淆
let OTHER_LIB_OK = Symbol("OK");
console.log("我的 OK === 别库的 OK ?", taskStatus === OTHER_LIB_OK); // false
// 如果用字符串枚举，这里就是 "OK" === "OK" → true，隐患就出现了

// 代价：Symbol 状态不能直接显示/序列化（JSON 会丢），
// 所以真实项目里也常用「字符串枚举 + 小心命名」，或 TypeScript 的字面量类型


// ----------------------------------------
// 8. 记忆要点
// ----------------------------------------

/*
  1. 创建用 Symbol("描述")，不能 new；每个 Symbol 绝对唯一
  2. 描述只是注释，同描述的 Symbol 也不相等
  3. 作对象键必须 [sym] 方括号；点语法访问不到
  4. Symbol 键"半隐藏"：Object.keys / for...in / JSON 都看不见它
  5. Symbol.for(key) 走全局注册表，跨模块可复用同一个
  6. 不能隐式转字符串/数字（+ 和模板字符串都会 TypeError），用 String() 
  7. 典型用途：防属性冲突、模拟私有属性、安全枚举
*/

/*
  练习建议：
  1. 创建两个同描述 Symbol，验证 === 为 false
  2. 给对象加 Symbol 键，分别用 Object.keys 和 getOwnPropertySymbols 查看
  3. 用 Symbol.for 在两个"假想模块"（两段代码）间共享同一个标记
  4. 试试 `${Symbol()}`，记住报错信息
*/
