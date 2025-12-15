### JavaScript 函数柯里化的多种实现方式
#### 一、柯里化的基本概念
什么是柯里化？
柯里化（Currying）是将一个多参数函数转换为一连串单参数函数的技术。
简单示例:
```javascript
// 普通函数
function add(a, b, c) {
  return a + b + c;
}

// 柯里化版本
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(add(1, 2, 3));       // 6
console.log(curriedAdd(1)(2)(3)); // 6
```
#### 二、柯里化的多种实现方式
##### 1. 基础柯里化实现
```javascript
// 基础柯里化：固定参数数量
function curryBasic(fn) {
  const arity = fn.length; // 获取函数参数数量
  
  return function curried(...args) {
    // 如果传入参数数量足够，则直接执行
    if (args.length >= arity) {
      return fn.apply(this, args);
    } 
    // 否则返回新函数，继续收集参数
    else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// 使用示例
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curryBasic(multiply);
console.log(curriedMultiply(2)(3)(4));      // 24
console.log(curriedMultiply(2, 3)(4));      // 24
console.log(curriedMultiply(2, 3, 4));      // 24

// 部分应用
const double = curriedMultiply(2);
const triple = double(3);
console.log(triple(4));  // 24
console.log(triple(5));  // 30
```
##### 2. 支持占位符的柯里化
```javascript
// 支持占位符的柯里化
function curryWithPlaceholder(fn) {
  const arity = fn.length;
  const _ = curryWithPlaceholder.placeholder || '_'; // 占位符
  
  return function curried(...args) {
    // 提取实际传入的参数（过滤占位符）
    const actualArgs = args.slice(0, arity);
    const hasPlaceholder = actualArgs.some(arg => arg === _);
    
    // 参数足够且没有占位符，直接执行
    if (actualArgs.length >= arity && !hasPlaceholder) {
      return fn.apply(this, actualArgs);
    }
    
    // 否则返回新函数
    return function(...nextArgs) {
      // 用下一个函数的参数替换占位符
      const mergedArgs = [];
      let argIndex = 0;
      
      for (let arg of actualArgs) {
        if (arg === _ && argIndex < nextArgs.length) {
          mergedArgs.push(nextArgs[argIndex++]);
        } else {
          mergedArgs.push(arg);
        }
      }
      
      // 添加剩余的参数
      while (argIndex < nextArgs.length) {
        mergedArgs.push(nextArgs[argIndex++]);
      }
      
      return curried.apply(this, mergedArgs);
    };
  };
}

// 设置占位符
curryWithPlaceholder.placeholder = '_';

// 使用示例
function concat(a, b, c, d) {
  return `${a}-${b}-${c}-${d}`;
}

const curriedConcat = curryWithPlaceholder(concat);
const _ = curryWithPlaceholder.placeholder;

console.log(curriedConcat('a', 'b', 'c', 'd'));  // "a-b-c-d"
console.log(curriedConcat('a', 'b')('c', 'd'));  // "a-b-c-d"
console.log(curriedConcat('a', _, 'c')('b', 'd')); // "a-b-c-d"
console.log(curriedConcat('a', _, _, 'd')(_, 'c')('b')); // "a-b-c-d"

// 部分应用
const addPrefix = curriedConcat('prefix');
console.log(addPrefix('middle', 'suffix', 'end')); // "prefix-middle-suffix-end"
```

##### 3. 无限参数柯里化

```javascript
// 支持无限参数的柯里化
function curryInfinite(fn) {
  return function curried(...args) {
    // 如果没有参数传入，则执行函数
    if (args.length === 0) {
      return fn.apply(this, args);
    }
    
    // 否则返回新函数，继续收集参数
    return function(...nextArgs) {
      // 如果下一个函数没有参数，则执行计算
      if (nextArgs.length === 0) {
        return fn.apply(this, args);
      }
      
      // 否则继续收集参数
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// 使用示例
function sum(...numbers) {
  return numbers.reduce((acc, val) => acc + val, 0);
}

const curriedSum = curryInfinite(sum);

console.log(curriedSum(1)(2)(3)(4)());  // 10
console.log(curriedSum(1, 2)(3, 4)());  // 10
console.log(curriedSum(1)(2, 3, 4)());  // 10

// 部分应用
const addOne = curriedSum(1);
const addOneAndTwo = addOne(2);
console.log(addOneAndTwo(3, 4)());  // 10
```

##### 4. 自动柯里化
```javascript
// 自动柯里化：自动检测是否所有参数都已提供
function autoCurry(fn, arity = fn.length) {
  return function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// 使用示例
const greet = autoCurry(function(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
});

const hello = greet('Hello');
const helloJohn = hello('John');
console.log(helloJohn('!'));  // "Hello, John!"
console.log(greet('Hi')('Jane')('?'));  // "Hi, Jane?"
```

##### 5. 函数式编程风格柯里化

```javascript
// ES6 箭头函数实现柯里化
const curry = fn => {
  const arity = fn.length;
  
  const curried = (...args) => 
    args.length >= arity
      ? fn(...args)
      : (...moreArgs) => curried(...args, ...moreArgs);
  
  return curried;
};

// 配合管道操作
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const add = curry((a, b) => a + b);
const multiply = curry((a, b) => a * b);
const subtract = curry((a, b) => a - b);

const calculate = pipe(
  add(5),        // x + 5
  multiply(2),   // (x + 5) * 2
  subtract(10)   // ((x + 5) * 2) - 10
);

console.log(calculate(3));  // ((3 + 5) * 2) - 10 = 6
```
##### 6. Lodash风格柯里化
ts环境中执行失败，报错
```
TSError: ⨯ Unable to compile TypeScript:
source-map-support.js:726
src/index.ts(46,23): error TS2339: Property 'placeholder' does not exist on type '(fn: any, arity?: any) => { (...args: any[]): any; placeholder: {}; }'.
```
```javascript
// 类似 Lodash 的 curry 实现
function lodashCurry(fn, arity = fn.length) {
  const placeholder = {};
  
  function curried(...args) {
    // 获取实际参数（转换占位符）
    const finalArgs = [];
    let argIndex = 0;
    
    for (let i = 0; i < arity; i++) {
      if (i < args.length && args[i] !== placeholder) {
        finalArgs[i] = args[i];
      } else {
        finalArgs[i] = placeholder;
      }
    }
    
    // 如果所有参数都已提供且没有占位符，则执行函数
    const hasPlaceholder = finalArgs.includes(placeholder);
    if (!hasPlaceholder) {
      return fn.apply(this, finalArgs);
    }
    
    // 否则返回新函数
    return function(...nextArgs) {
      const mergedArgs = finalArgs.map(arg => 
        arg === placeholder && argIndex < nextArgs.length 
          ? nextArgs[argIndex++] 
          : arg
      );
      
      // 添加剩余参数到末尾
      while (argIndex < nextArgs.length) {
        mergedArgs.push(nextArgs[argIndex++]);
      }
      
      return curried.apply(this, mergedArgs);
    };
  }
  
  curried.placeholder = placeholder;
  return curried;
}

// 使用示例
const _ = lodashCurry.placeholder;

function log(date, importance, message) {
  return `[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`;
}

const curriedLog = lodashCurry(log, 3);

// 创建今天的日志函数
const todayLog = curriedLog(new Date());
// 创建警告级别的日志函数
const todayWarn = todayLog('WARNING');
// 使用
console.log(todayWarn('System restart')); // "[14:30] [WARNING] System restart"

// 使用占位符
const debugLog = curriedLog(_, 'DEBUG');
console.log(debugLog(new Date())('Test message'));
```
##### 7. 递归实现柯里化
```javascript
// 递归方式实现柯里化
function curryRecursive(fn) {
  return function curried(...args) {
    // 如果参数足够，则调用原始函数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    
    // 否则递归返回新函数
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// 使用示例
const format = curryRecursive(function(template, name, age, city) {
  return template
    .replace('{name}', name)
    .replace('{age}', age)
    .replace('{city}', city);
});

const userTemplate = 'Name: {name}, Age: {age}, City: {city}';
const formatUser = format(userTemplate);
console.log(formatUser('Alice')(30)('New York')); // "Name: Alice, Age: 30, City: New York"
```
##### 8. 性能优化的柯里化
```javascript
// 性能优化的柯里化实现（缓存柯里化函数）
function memoizeCurry(fn) {
  const arity = fn.length;
  const cache = new Map(); // 缓存部分应用的函数
  
  function generateKey(args) {
    return JSON.stringify(args);
  }
  
  return function curried(...args) {
    const key = generateKey(args);
    
    // 如果参数足够，直接执行
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    
    // 检查缓存
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    // 创建新函数并缓存
    const newCurried = function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
    
    cache.set(key, newCurried);
    return newCurried;
  };
}

// 使用示例（适合频繁部分应用的场景）
const expensiveOperation = memoizeCurry(function(a, b, c, d) {
  console.log('执行复杂计算...');
  // 模拟复杂计算
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(a + b + c + d);
  }
  return result;
});

// 第一次调用会计算
const withFirstArg = expensiveOperation(1);
const withSecondArg = withFirstArg(2);

// 第二次相同的部分应用会从缓存获取
const withFirstArgAgain = expensiveOperation(1); // 从缓存获取
console.log(withFirstArg === withFirstArgAgain); // true（相同函数引用）
```
#### 三、柯里化应用场景
##### 1. 配置函数创建
``` javascript
// 创建可配置的HTTP请求函数
const createRequest = curry((method, baseURL, endpoint, data) => {
  return fetch(`${baseURL}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
});

// 创建特定配置的请求函数
const apiBase = 'https://api.example.com';
const post = createRequest('POST', apiBase);
const get = createRequest('GET', apiBase);

// 创建具体的API端点函数
const createUser = post('/users');
const getUser = get('/users');

// 使用
createUser({ name: 'John', email: 'john@example.com' });
getUser('123');
```
##### 2. 参数复用与函数组合
```javascript
// 使用柯里化进行函数组合
const filter = curry((predicate, array) => array.filter(predicate));
const map = curry((transform, array) => array.map(transform));
const reduce = curry((reducer, initial, array) => array.reduce(reducer, initial));

// 创建可复用的函数
const isEven = n => n % 2 === 0;
const double = n => n * 2;
const sum = (a, b) => a + b;

// 组合柯里化函数
const sumOfDoubleEvens = pipe(
  filter(isEven),
  map(double),
  reduce(sum, 0)
);

const numbers = [1, 2, 3, 4, 5, 6];
console.log(sumOfDoubleEvens(numbers)); // (2+4+6)*2 = 24
```
##### 3. 事件处理
```typescript
// 柯里化在事件处理中的应用
const handleEvent = curry((eventType, elementId, handler) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener(eventType, handler);
    return () => element.removeEventListener(eventType, handler);
  }
});

// 创建特定类型的事件处理器
const handleClick = handleEvent('click');
const handleHover = handleEvent('mouseover');

// 创建特定元素的事件处理器
const handleButtonClick = handleClick('myButton');
const handleDivHover = handleHover('myDiv');

// 使用
const removeButtonClick = handleButtonClick(() => {
  console.log('按钮被点击了');
});

// 稍后可以移除事件监听器
// removeButtonClick();
```
##### 4. 验证函数
```javascript
// 柯里化验证函数
const validate = curry((rule, value) => rule(value));

// 创建验证规则
const isRequired = validate(value => value && value.trim() !== '');
const isEmail = validate(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
const minLength = length => validate(value => value.length >= length);
const maxLength = length => validate(value => value.length <= length);

// 组合验证规则
const validateEmail = value => 
  isRequired(value) && isEmail(value);

const validatePassword = value => 
  isRequired(value) && minLength(8)(value) && maxLength(20)(value);

// 使用
console.log(validateEmail('test@example.com')); // true
console.log(validatePassword('12345678'));      // true
console.log(validatePassword('123'));           // false
```
##### 5. 依赖注入
```javascript
// 使用柯里化进行依赖注入
const createService = curry((logger, database, config) => {
  return {
    getUser: id => {
      logger.log(`获取用户 ${id}`);
      return database.query('SELECT * FROM users WHERE id = ?', [id]);
    },
    updateUser: (id, data) => {
      logger.log(`更新用户 ${id}`);
      return database.update('users', data, { id });
    }
  };
});

// 在不同的环境中使用不同的依赖
const logger = { log: console.log };
const database = { 
  query: (sql, params) => Promise.resolve({ id: 1, name: 'John' }),
  update: (table, data, where) => Promise.resolve(true)
};

// 创建特定环境的服务
const productionService = createService(logger)(database)({ env: 'production' });
const testService = createService({ log: () => {} })(mockDatabase)({ env: 'test' });
```
#### 四、柯里化的优势与注意事项
##### 优势
1. 参数复用：可以创建部分应用的函数

2. 延迟执行：可以先提供部分参数，稍后提供剩余参数

3. 函数组合：更容易进行函数组合和管道操作

4. 代码复用：提高代码的可重用性

5. 提高可读性：使代码更声明式

##### 注意事项
1. 性能考虑：柯里化会增加函数调用层级，可能影响性能

2. 调试困难：调用栈更深，调试可能更复杂

3. 过度使用：不是所有函数都需要柯里化

4. 参数顺序：柯里化对参数顺序敏感，设计时要考虑

##### 适用场景建议
1. 需要部分应用的函数

2. 函数组合和管道操作

3. 配置和工厂函数

4. 需要延迟执行的情况

5. 提高代码的复用性和可读性

柯里化是函数式编程中的重要概念，合理使用可以使代码更加模块化、可复用和易于维护。在实际项目中，可以根据具体需求选择合适的柯里化实现方式。

