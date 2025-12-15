JavaScript 数组扁平化有多种实现方法，下面我将分别介绍原生实现和 Lodash 的实现。

一、JavaScript 原生扁平化方法
1. 递归实现
javascript
function flattenDeep(arr) {
  const result = [];
  
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result.push(...flattenDeep(item));
    } else {
      result.push(item);
    }
  });
  
  return result;
}
2. 使用 Array.prototype.flat() (ES2019)
javascript
const arr = [1, [2, [3, [4]], 5]];

// 完全扁平化
arr.flat(Infinity); // [1, 2, 3, 4, 5]

// 指定深度
arr.flat(2); // [1, 2, 3, [4], 5]
3. 使用 reduce + 递归
javascript
function flattenDeep(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), 
  []);
}
4. 使用扩展运算符（仅一层）
javascript
const arr = [1, [2, [3]]];
[].concat(...arr); // [1, 2, [3]]
5. 迭代实现（使用栈）
javascript
function flattenDeep(arr) {
  const stack = [...arr];
  const result = [];
  
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }
  
  return result.reverse();
}
二、Lodash 中的扁平化方法
Lodash 提供了三个主要的扁平化方法：

1. _.flatten(array) - 扁平化一层
javascript
const _ = require('lodash');

_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
2. _.flattenDeep(array) - 完全扁平化
javascript
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]
3. _.flattenDepth(array, [depth=1]) - 指定深度扁平化
javascript
_.flattenDepth([1, [2, [3, [4]], 5]], 2);
// => [1, 2, 3, [4], 5]
三、Lodash 的实现原理
让我们看看 Lodash 源码中这些方法的实现（简化版）：

核心实现 - baseFlatten
javascript
// 核心扁平化函数
function baseFlatten(array, depth, predicate, isStrict, result) {
  predicate || (predicate = isFlattenable);
  result || (result = []);

  if (array == null) {
    return result;
  }

  for (const value of array) {
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // 递归扁平化
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        result.push(...value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

// 检查是否可扁平化（数组或arguments等）
function isFlattenable(value) {
  return Array.isArray(value) || 
         isArguments(value) || 
         !!(value && value[Symbol.isConcatSpreadable]);
}
具体方法的实现
javascript
// _.flatten
function flatten(array) {
  const length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

// _.flattenDeep
function flattenDeep(array) {
  const length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, INFINITY) : [];
}

// _.flattenDepth
function flattenDepth(array, depth) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  depth = depth === undefined ? 1 : (+depth || 0);
  return baseFlatten(array, depth);
}
四、性能比较示例
javascript
// 测试不同方法的性能
const testArray = Array.from({length: 1000}, (_, i) => 
  i % 5 === 0 ? [i, [i+1, [i+2]]] : i
);

// 方法比较
console.time('原生 flat');
testArray.flat(Infinity);
console.timeEnd('原生 flat');

console.time('Lodash flattenDeep');
_.flattenDeep(testArray);
console.timeEnd('Lodash flattenDeep');

console.time('递归实现');
flattenDeep(testArray);
console.timeEnd('递归实现');
五、实际使用建议
现代项目：优先使用原生的 flat() 方法，性能最好

深度控制：需要精确控制扁平化深度时，使用 _.flattenDepth()

兼容性考虑：如果需要支持旧浏览器，使用 Lodash 或自己实现 polyfill

大型数组：使用迭代（栈）方法避免递归栈溢出

六、扩展：扁平化对象数组
javascript
// 扁平化对象数组的特定属性
function flattenObjectArray(arr, key) {
  return arr.reduce((result, item) => {
    if (Array.isArray(item[key])) {
      return result.concat(item[key]);
    }
    return result.concat(item);
  }, []);
}

const users = [
  { name: 'Alice', hobbies: ['reading', 'swimming'] },
  { name: 'Bob', hobbies: ['gaming'] }
];

flattenObjectArray(users, 'hobbies');
// => ['reading', 'swimming', 'gaming']
Lodash 的实现考虑了很多边界情况（如稀疏数组、类数组对象等），在生产环境中使用 Lodash 通常更安全可靠。不过对于简单的数组扁平化，原生的 flat() 方法已经完全足够。