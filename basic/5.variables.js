// ========== JavaScript 变量声明学习：var / let / const ==========


// ----------------------------------------
// 1. 基本用法与声明
// ----------------------------------------

// var —— 函数作用域，可重复声明，可重新赋值
var a = 1;
var a = 2;  // 重复声明不报错
a = 3;      // 重新赋值 OK
console.log("var a =", a); // 3

// let —— 块级作用域，不可重复声明，可重新赋值
let b = 1;
// let b = 2;  // ❌ SyntaxError: Identifier 'b' has already been declared
b = 2;       // 重新赋值 OK
console.log("let b =", b); // 2

// const —— 块级作用域，不可重复声明，不可重新赋值（但对象属性可改）
const c = 1;
// const c = 2; // ❌ SyntaxError
// c = 2;       // ❌ TypeError: Assignment to constant variable
console.log("const c =", c); // 1


// ----------------------------------------
// 2. 作用域区别
// ----------------------------------------

// var：函数作用域（不在函数内就是全局），会穿透 {} 块
function testVar() {
  if (true) {
    var x = "我是 var";
  }
  console.log(x); // 能访问到："我是 var"（var 没有块级作用域）
}
testVar();

// let / const：块级作用域，只在 {} 内有效
function testLet() {
  if (true) {
    let y = "我是 let";
  }
  // console.log(y); // ❌ ReferenceError: y is not defined
}
testLet();

// 典型例子：for 循环
for (var i = 0; i < 3; i++) {
  // ...
}
console.log("循环结束后 var i =", i); // 3 —— 泄露到外部了

for (let j = 0; j < 3; j++) {
  // ...
}
// console.log(j); // ❌ ReferenceError: j is not defined


// ----------------------------------------
// 3. 变量提升 (Hoisting)
// ----------------------------------------

// var：声明会提升，但赋值不会（值为 undefined）
console.log("\n=== 变量提升 ===");
console.log("hoistedVar =", hoistedVar); // undefined（不报错）
var hoistedVar = 10;

// let / const：声明不提升（实际上提升了，但处于"暂时性死区 TDZ"）
// console.log(hoistedLet); // ❌ ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = 20;


// ----------------------------------------
// 4. 暂时性死区 (Temporal Dead Zone)
// 简单来说就是：`let` /`const` 声明的变量，必须先声明（完成初始化），才能访问。
// ----------------------------------------

function tdzDemo() {
  // 从函数开头到 let/const 声明之前，都是 TDZ
  // 此时访问变量会报错
  // console.log(tdzVar); // ❌ ReferenceError

  let tdzVar = "TDZ 外才能访问";
  console.log(tdzVar); // OK
}
tdzDemo();


// ----------------------------------------
// 5. const 与对象/数组
// ----------------------------------------

// const 保证的是"绑定"不变（内存地址不变），不是值不变
console.log("\n=== const 与对象 ===");
const person = { name: "Alice", age: 20 };
person.age = 21;          // ✅ 修改属性 OK
person.gender = "female"; // ✅ 新增属性 OK
console.log("person =", person);

// 但不能重新赋值整个对象
// person = { name: "Bob" }; // ❌ TypeError

// 数组同理
const arr = [1, 2, 3];
arr.push(4); // ✅
arr[0] = 10; // ✅
console.log("arr =", arr);

// 如果想让对象真正不可变，用 Object.freeze
const frozen = Object.freeze({ name: "Alice" });
// frozen.name = "Bob"; // ❌ 严格模式报错，非严格模式静默失败


// ----------------------------------------
// 6. 全局变量挂载区别
// ----------------------------------------

// 浏览器环境下：
// var 声明的全局变量会挂载到 window 对象
// let / const 不会挂载到 window

/*
  在浏览器中运行：
  var globalVar = 1;
  let globalLet = 2;
  console.log(window.globalVar); // 1
  console.log(window.globalLet); // undefined
*/


// ----------------------------------------
// 7. 对比总结表
// ----------------------------------------

console.log("\n=== var / let / const 对比 ===");
console.log("var:   函数作用域 | 可重复声明 | 可重新赋值 | 有提升(undefined)");
console.log("let:   块级作用域 | 不可重复声明 | 可重新赋值 | TDZ");
console.log("const: 块级作用域 | 不可重复声明 | 不可重新赋值 | TDZ");


// ----------------------------------------
// 8. 最佳实践建议
// ----------------------------------------

/*
  1. 优先使用 const，只有需要重新赋值时才用 let
  2. 尽量避免使用 var（容易造成作用域混乱和变量泄露）
  3. 声明变量时尽量初始化，不要先声明再赋值
  4. 循环计数器用 let，避免闭包陷阱
*/

// ----------------------------------------
// 9. 闭包陷阱（Closure Trap）：var vs let + setTimeout
// ----------------------------------------

/*
  ┌─────────────────────────────────────────────────┐
  │ setTimeout 的作用                                │
  ├─────────────────────────────────────────────────┤
  │ setTimeout(回调函数, 延迟毫秒数)                  │
  │ 作用：在指定毫秒数后，把回调函数放到任务队列，     │
  │       等当前同步代码全部执行完，再执行回调。       │
  │                                                 │
  │ 关键点：回调是「异步」的，不会阻塞后面的代码。     │
  │ 即使延迟写 0，回调也会等当前循环结束后才执行。     │
  └─────────────────────────────────────────────────┘
*/

console.log("\n=== 闭包陷阱：var vs let ===");

// ── 错误示范：var ──────────────────────────────────
// var 是函数作用域，整个 for 循环只有「一个」 k 变量。
// 3 次循环注册了 3 个 setTimeout 回调，它们都闭包捕获「同一个」 k。
// 回调执行时，循环早已结束，k 已经变成了 3。
// 所以 3 个回调打印出来全是 3。
for (var k = 0; k < 3; k++) {
  setTimeout(() => console.log("var k =", k), 0); // 输出：3 3 3
}

/*
  时间线（var 版本）：
  第1轮循环：k=0，注册回调1（引用 k）
  第2轮循环：k=1，注册回调2（引用 k）
  第3轮循环：k=2，注册回调3（引用 k）
  循环结束：k=3
  ── 此时 3 个回调才开始执行 ──
  回调1 读 k → 3
  回调2 读 k → 3
  回调3 读 k → 3
  结果：3 3 3
*/

// ── 正确示范：let ──────────────────────────────────
// let 是块级作用域，每一轮循环都会创建「一个新的」 m。
// 3 个回调分别捕获第 1、2、3 轮的 m，互不影响。
// 所以输出 0 1 2，符合直觉。
for (let m = 0; m < 3; m++) {
  setTimeout(() => console.log("let m =", m), 0); // 输出：0 1 2
}

/*
  时间线（let 版本）：
  第1轮循环：m=0 的副本，注册回调1（引用这个 m=0）
  第2轮循环：m=1 的副本，注册回调2（引用这个 m=1）
  第3轮循环：m=2 的副本，注册回调3（引用这个 m=2）
  循环结束
  ── 回调执行 ──
  回调1 读自己的 m → 0
  回调2 读自己的 m → 1
  回调3 读自己的 m → 2
  结果：0 1 2
*/

/*
  结论：
  1. 本质是「作用域」问题：var 共享一个变量，let 每轮各一份。
  2. setTimeout 让问题暴露出来：因为回调延迟执行，
     此时 var 的变量已经被循环改到了最终值。
  3. 最佳实践：循环计数器永远用 let，不要用 var。
*/

/*
  练习建议：
  1. 取消注释被注释的报错代码，观察错误信息
  2. 对比 var 和 let 在 for 循环 + setTimeout 中的输出差异
  3. 尝试用 Object.freeze 冻结一个嵌套对象，看看深层属性是否还能改
  4. 把代码中所有 var 改成 let/const，思考为什么这样更安全
*/
