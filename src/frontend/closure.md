### JavaScript 闭包：概念与应用场景详解
#### 一、闭包的基本概念
##### 定义
闭包（Closure）是指一个函数能够记住并访问其词法作用域，即使该函数在其词法作用域之外执行。

##### 简单示例
```javascript
function outer() {
  let counter = 0;
  
  function inner() {
    counter++;
    return counter;
  }
  
  return inner;
}

const increment = outer();
console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3
```
核心特性
函数嵌套：闭包通常涉及函数嵌套

内部函数引用外部变量：内部函数引用了外部函数的变量

外部函数执行完毕：外部函数执行完后，其变量仍被内部函数引用
二、闭包的工作原理
作用域链解析
```javascript
function createCounter() {
  let count = 0; // 被闭包"捕获"的变量
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
// createCounter 执行完毕，但 count 变量仍存在
// 因为被返回的方法引用，形成了闭包
```
内存管理
```javascript
function heavyOperation() {
  const largeData = new Array(1000000).fill('data');
  
  return function process() {
    // 只使用 largeData 的一小部分
    return largeData.slice(0, 10);
  };
}

const processor = heavyOperation();
// 问题：即使只使用部分数据，整个 largeData 仍然保留在内存中
```
三、闭包的实际应用场景
1. 数据封装与私有变量
```
// 创建具有私有状态的组件
function createBankAccount(initialBalance) {
  let balance = initialBalance; // 私有变量
  
  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        return `存款成功，当前余额: ${balance}`;
      }
      return '存款金额必须大于0';
    },
    
    withdraw: function(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return `取款成功，当前余额: ${balance}`;
      }
      return '取款失败，余额不足或金额无效';
    },
    
    getBalance: function() {
      return balance;
    }
  };
}

const myAccount = createBankAccount(1000);
console.log(myAccount.getBalance()); // 1000
console.log(myAccount.deposit(500)); // 存款成功，当前余额: 1500
console.log(myAccount.withdraw(200)); // 取款成功，当前余额: 1300
// 无法直接访问 balance 变量，实现了数据封装
```
2. 函数工厂与柯里化
```
// 函数工厂：创建特定功能的函数
function createMultiplier(multiplier) {
  return function(x) {
    return x * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log(double(5)); // 10
console.log(triple(5)); // 15
console.log(quadruple(5)); // 20

// 柯里化（Currying）应用
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
const addFive = curriedAdd(5);
const addFiveAndTwo = addFive(2);

console.log(addFiveAndTwo(3)); // 10
console.log(curriedAdd(1)(2)(3)); // 6
```
3. 模块模式
```
// 立即执行函数表达式（IIFE）实现模块
const UserModule = (function() {
  // 私有变量
  let users = [];
  let nextId = 1;
  
  // 私有函数
  function validateUser(user) {
    return user && user.name && user.email;
  }
  
  // 公共 API
  return {
    addUser: function(user) {
      if (validateUser(user)) {
        user.id = nextId++;
        users.push(user);
        return true;
      }
      return false;
    },
    
    getUser: function(id) {
      return users.find(user => user.id === id);
    },
    
    getAllUsers: function() {
      return [...users]; // 返回副本，保护内部数据
    },
    
    removeUser: function(id) {
      const index = users.findIndex(user => user.id === id);
      if (index > -1) {
        return users.splice(index, 1)[0];
      }
      return null;
    },
    
    getCount: function() {
      return users.length;
    }
  };
})();

// 使用模块
UserModule.addUser({ name: 'Alice', email: 'alice@example.com' });
UserModule.addUser({ name: 'Bob', email: 'bob@example.com' });
console.log(UserModule.getAllUsers());
console.log(UserModule.getCount());
```
4.事件处理与回调
```
// 事件处理器中使用闭包
function setupButtonEvents() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach((button, index) => {
    let clickCount = 0; // 每个按钮有自己的计数器
    
    button.addEventListener('click', function() {
      clickCount++;
      console.log(`按钮 ${index} 被点击了 ${clickCount} 次`);
      this.textContent = `点击: ${clickCount}`;
    });
  });
}

// 模拟异步操作
function fetchWithRetry(url, maxRetries) {
  let retryCount = 0;
  
  return function() {
    return new Promise((resolve, reject) => {
      function attempt() {
        fetch(url)
          .then(response => {
            if (!response.ok) throw new Error('请求失败');
            return response.json();
          })
          .then(data => resolve(data))
          .catch(error => {
            retryCount++;
            if (retryCount <= maxRetries) {
              console.log(`重试 ${retryCount}/${maxRetries}`);
              setTimeout(attempt, 1000 * retryCount);
            } else {
              reject(new Error(`重试 ${maxRetries} 次后失败`));
            }
          });
      }
      
      attempt();
    });
  };
}

const fetchData = fetchWithRetry('/api/data', 3);
fetchData().then(data => console.log(data));
```
5.防抖与节流
```
// 防抖（Debounce）：在事件触发后等待一段时间执行，期间重复触发则重新计时
function debounce(fn, delay) {
  let timer = null;
  
  return function(...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// 使用防抖
const searchInput = document.getElementById('search');
const debouncedSearch = debounce(function(query) {
  console.log('搜索:', query);
  // 执行搜索API调用
}, 500);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// 节流（Throttle）：在规定时间内只执行一次
function throttle(fn, interval) {
  let lastTime = 0;
  
  return function(...args) {
    const now = Date.now();
    const context = this;
    
    if (now - lastTime >= interval) {
      fn.apply(context, args);
      lastTime = now;
    }
  };
}

// 使用节流
const throttledScroll = throttle(function() {
  console.log('滚动事件处理');
  // 处理滚动逻辑
}, 100);

window.addEventListener('scroll', throttledScroll);
```
6.记忆化
```
// 缓存函数计算结果，提高性能
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('从缓存中获取结果');
      return cache.get(key);
    }
    
    console.log('计算新结果');
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 使用记忆化
function expensiveCalculation(n) {
  console.log('执行复杂计算...');
  let result = 0;
  for (let i = 0; i < n * 1000000; i++) {
    result += Math.sqrt(i);
  }
  return result;
}

const memoizedCalculation = memoize(expensiveCalculation);

console.log(memoizedCalculation(10)); // 计算并缓存
console.log(memoizedCalculation(10)); // 从缓存获取
console.log(memoizedCalculation(20)); // 计算并缓存
console.log(memoizedCalculation(10)); // 从缓存获取
```
7.状态管理
```
// 简单的状态管理器
function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];
  
  const getState = () => state;
  
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  
  const subscribe = (listener) => {
    listeners.push(listener);
    // 返回取消订阅的函数
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };
  
  return { getState, dispatch, subscribe };
}

// Reducer 函数
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// 使用状态管理器
const store = createStore(counterReducer, 0);

const unsubscribe = store.subscribe(() => {
  console.log('状态更新:', store.getState());
});

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });

unsubscribe(); // 停止监听
```
四、闭包的常见问题与解决方案
1. 循环中的闭包问题
```
// 问题：所有函数都输出同样的值
function createFunctionsProblem() {
  const funcs = [];
  for (var i = 0; i < 3; i++) {
    funcs.push(function() {
      console.log(i); // 总是输出 3
    });
  }
  return funcs;
}

// 解决方案1：使用立即执行函数
function createFunctionsSolution1() {
  const funcs = [];
  for (var i = 0; i < 3; i++) {
    funcs.push((function(j) {
      return function() {
        console.log(j);
      };
    })(i));
  }
  return funcs;
}

// 解决方案2：使用 let（块级作用域）
function createFunctionsSolution2() {
  const funcs = [];
  for (let i = 0; i < 3; i++) {
    funcs.push(function() {
      console.log(i); // 输出 0, 1, 2
    });
  }
  return funcs;
}
```
2. 内存泄漏
```
// 问题：所有函数都输出同样的值
function createFunctionsProblem() {
  const funcs = [];
  for (var i = 0; i < 3; i++) {
    funcs.push(function() {
      console.log(i); // 总是输出 3
    });
  }
  return funcs;
}

// 解决方案1：使用立即执行函数
function createFunctionsSolution1() {
  const funcs = [];
  for (var i = 0; i < 3; i++) {
    funcs.push((function(j) {
      return function() {
        console.log(j);
      };
    })(i));
  }
  return funcs;
}

// 解决方案2：使用 let（块级作用域）
function createFunctionsSolution2() {
  const funcs = [];
  for (let i = 0; i < 3; i++) {
    funcs.push(function() {
      console.log(i); // 输出 0, 1, 2
    });
  }
  return funcs;
}
```
五、最佳实践建议
明确闭包的生命周期：确保理解闭包何时创建、何时销毁

避免不必要的闭包：不是所有嵌套函数都需要闭包

注意内存使用：闭包会延长变量的生命周期

使用块级作用域：优先使用 let 和 const 避免意外闭包

清理资源：在不需要时及时清理事件监听器和引用
六、现代JavaScript中的闭包
类和闭包
```
// 使用类实现类似闭包的功能
class Counter {
  #count = 0; // 私有字段
  
  increment() {
    this.#count++;
    return this.#count;
  }
  
  getCount() {
    return this.#count;
  }
}

// 闭包实现
function createCounterClosure() {
  let count = 0;
  
  return {
    increment: () => ++count,
    getCount: () => count
  };
}
```
2.React Hooks中的闭包
```
// React 函数组件中的闭包
function CounterComponent() {
  const [count, setCount] = useState(0);
  
  // 闭包：useEffect 回调函数捕获了 count 和 setCount
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []); // 依赖数组
  
  return <div>Count: {count}</div>;
}
```

