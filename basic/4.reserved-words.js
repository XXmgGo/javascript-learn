// ========== JavaScript 保留字 (Reserved Words) 学习 ==========

/*
  保留字是 JavaScript 语法层面保留的标识符，
  不能用作变量名、函数名、对象属性名（点语法）等。

  注意：JS 没有内置函数直接返回保留字列表，
  因为它们是语法概念，不属于运行时数据。
*/


// ----------------------------------------
// 1. 常见保留字列表（关键字 Keywords）
// ----------------------------------------
const keywords = [
  "break", "case", "catch", "class", "const", "continue",
  "debugger", "default", "delete", "do", "else", "export",
  "extends", "finally", "for", "function", "if", "import",
  "in", "instanceof", "new", "return", "super", "switch",
  "this", "throw", "try", "typeof", "var", "void", "while",
  "with", "yield"
  // 注：await 是上下文关键字，仅在 async 函数 / 模块中保留
];

console.log("=== 1. 关键字列表 ===");
console.log(keywords);


// ----------------------------------------
// 2. 保留字不能用作变量名
// ----------------------------------------

/*
  下面的代码都会报 SyntaxError：

  let if = 123;        // Unexpected token 'if'
  let class = "test";  // Unexpected token
  function return() {} // Unexpected token 'return'
  const new = 5;       // Unexpected token 'new'
*/

// 正确做法：避开保留字，或加下划线、改拼写
let ifValue = true;
let className = "container";


// ----------------------------------------
// 3. 保留字可以用作对象属性名
// ----------------------------------------

// 方括号语法：可以用保留字
const user = {
  ["class"]: "user",
  ["for"]: "everyone"
};
console.log("user.class =", user["class"]); // user

// 点语法：不能直接用保留字
// user.class = "admin"; // 语法错误

// 但对象字面量中可以用 ES6 简写（不报错，是合法语法）
const obj = {
  class: "A",  // ES6+ 允许保留字作为属性名
  for: 3
};
console.log("obj.class =", obj.class); // A（注意：访问时要用点语法，这里是合法的）


// ----------------------------------------
// 4. 动态检测某个词是否为保留字
// ----------------------------------------

/**
 * 检测一个标识符是否为 JS 保留字
 * 原理：尝试用它声明变量，如果报错说明是保留字
 * @param {string} word - 要检测的词
 * @returns {boolean} 是否为保留字
 */
function isReserved(word) {
  try {
    // 严格模式下限制最严格
    new Function(`"use strict"; var ${word} = 1;`);
    return false; // 能成功创建函数 → 不是保留字
  } catch (e) {
    return true;  // 抛错 → 是保留字
  }
}

console.log("\n=== 4. 保留字检测 ===");
console.log("'if' 是保留字吗?", isReserved("if"));        // true
console.log("'myVar' 是保留字吗?", isReserved("myVar"));  // false
console.log("'await' 是保留字吗?", isReserved("await"));  // false（上下文关键字，普通函数中可用）
console.log("'hello' 是保留字吗?", isReserved("hello"));  // false


// ----------------------------------------
// 5. 严格模式下的额外保留字
// ----------------------------------------

/*
  严格模式下以下词也不能用作标识符：
  implements, interface, let, package, private,
  protected, public, static, yield

  非严格模式下其中部分可以用作变量名（如 let），但严格模式下不行。
*/

// let 测试（严格模式下 'let' 有特殊含义）
// let let = 5; // 严格模式报错

// 非严格模式下某些词可以用
// var let = 5; // 非严格模式下可能不报错（取决于引擎）


// ----------------------------------------
// 6. 上下文关键字（Contextual Keywords）
// ----------------------------------------

/*
  有些词只在特定语法位置是关键字，其他位置可以用作标识符：
  as, async, from, get, of, set, target, etc.
*/

let of = 10; // OK，'of' 是上下文关键字
let as = "test"; // OK
console.log("\n=== 6. 上下文关键字 ===");
console.log("of =", of);
console.log("as =", as);

// 但在特定语法中它们有特殊含义
const arr = [1, 2, 3];
for (const item of arr) {  // 'of' 在这里是关键字
  // console.log(item);
}


// ----------------------------------------
// 运行示例
// ----------------------------------------

console.log("\n=== 保留字学习完成 ===");
console.log("提示：取消注释被注释的报错代码，可观察具体错误信息");

/*
  练习建议：
  1. 取消注释第 2 节的报错代码，观察 SyntaxError
  2. 用 isReserved 函数检测你想到的标识符
  3. 对比严格模式和非严格模式下保留字的差异
  4. 查 MDN 获取最新的保留字完整列表
*/
