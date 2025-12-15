## JS异步调用失败重传的多种实现方法

### 一、基础重传机制
#### 1. 简单递归重传

```javascript
function retryWithRecursion(fn, maxRetries = 3, delay = 1000) {
  let retries = 0;
  
  function attempt() {
    return fn().catch(error => {
      retries++;
      console.log(`重试 ${retries}/${maxRetries}: ${error.message}`);
      
      if (retries >= maxRetries) {
        return Promise.reject(new Error(`重试 ${maxRetries} 次后失败: ${error.message}`));
      }
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          attempt().then(resolve).catch(reject);
        }, delay);
      });
    });
  }
  
  return attempt();
}

// 使用示例
function simulateAPI(successRate = 0.3) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < successRate 
        ? resolve('API 调用成功')
        : reject(new Error('API 调用失败'));
    }, 500);
  });
}

retryWithRecursion(() => simulateAPI(0.3), 5)
  .then(result => console.log('最终结果:', result))
  .catch(error => console.error('最终失败:', error.message));
```
#### 2. async & await 实现版本

```javascript
async function retryWithAsync(fn, maxRetries = 3, delay = 1000) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.log(`重试 ${attempt}/${maxRetries}: ${error.message}`);
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error(`重试 ${maxRetries} 次后失败: ${lastError.message}`);
}

// 使用示例
async function fetchWithRetry(url, options, maxRetries = 3) {
  const fetchFn = () => fetch(url, options).then(async response => {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    return response.json();
  });
  
  return retryWithAsync(fetchFn, maxRetries);
}

// 模拟使用
fetchWithRetry('https://api.example.com/data', { method: 'GET' })
  .then(data => console.log('数据:', data))
  .catch(error => console.error('失败:', error.message));
```
### 高级重传策略
#### 3.指数退避算法
```javascript
function retryWithExponentialBackoff(fn, maxRetries = 5, baseDelay = 1000) {
  return new Promise((resolve, reject) => {
    let retries = 0;
    
    function attempt() {
      fn()
        .then(resolve)
        .catch(error => {
          retries++;
          console.log(`重试 ${retries}/${maxRetries}: ${error.message}`);
          
          if (retries >= maxRetries) {
            reject(new Error(`重试 ${maxRetries} 次后失败: ${error.message}`));
            return;
          }
          
          // 指数退避: 每次重试延迟加倍
          const delay = baseDelay * Math.pow(2, retries - 1);
          // 可选: 添加随机抖动避免同步重试风暴
          const jitter = Math.random() * 0.3 * delay; // 最多30%的抖动
          const actualDelay = delay + jitter;
          
          console.log(`等待 ${Math.round(actualDelay)}ms 后重试...`);
          
          setTimeout(attempt, actualDelay);
        });
    }
    
    attempt();
  });
}

// 使用示例
function simulateAPI(successRate = 0.3) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < successRate 
        ? resolve('API 调用成功')
        : reject(new Error('API 调用失败'));
    }, 500);
  });
}

// 使用示例
retryWithExponentialBackoff(() => simulateAPI(0.2), 5)
  .then(result => console.log('成功:', result))
  .catch(error => console.error('失败:', error.message));
```
#### 4. 可配置的重试策略

```typescript
class RetryStrategyConfig {
  maxRetries?: number;
  baseDelay?: number;
  strategy?: 'fixed' | 'exponential' | 'fibonacci';
  shouldRetry?: Function;
  onRetry?: Function;
}
class RetryStrategy {
  maxRetries: number;
  baseDelay: number;
  strategy: 'fixed' | 'exponential' | 'fibonacci';
  shouldRetry: Function;
  onRetry: Function;
  constructor(options: RetryStrategyConfig = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.baseDelay = options.baseDelay || 1000;
    this.strategy = options.strategy || 'fixed'; // fixed, exponential, fibonacci
    this.shouldRetry = options.shouldRetry || this.defaultShouldRetry;
    this.onRetry = options.onRetry || (() => {});
  }
  
  defaultShouldRetry(error) {
    // 默认重试网络错误和5xx服务器错误
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return true; // 网络错误
    }
    if (error.status && error.status >= 500) {
      return true; // 服务器错误
    }
    return false; // 客户端错误不重试
  }
  
  calculateDelay(attempt) {
    switch (this.strategy) {
      case 'exponential':
        return this.baseDelay * Math.pow(2, attempt - 1);
      case 'fibonacci':
        let a = 0, b = this.baseDelay;
        for (let i = 1; i < attempt; i++) {
          [a, b] = [b, a + b];
        }
        return b;
      case 'fixed':
      default:
        return this.baseDelay;
    }
  }
  
  async execute(fn) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        if (!this.shouldRetry(error) || attempt >= this.maxRetries) {
          break;
        }
        
        const delay = this.calculateDelay(attempt);
        this.onRetry({ attempt, delay, error });
        
        console.log(`重试 ${attempt}/${this.maxRetries}, 等待 ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw new Error(`操作失败: ${lastError.message}`);
  }
}

// 使用示例
const strategy = new RetryStrategy({
  maxRetries: 4,
  baseDelay: 1000,
  strategy: 'fibonacci',
  shouldRetry: (error) => {
    // 只重试特定类型的错误
    const retriableErrors = ['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED'];
    return retriableErrors.some(code => error.code === code);
  },
  onRetry: ({ attempt, delay, error }) => {
    console.log(`第 ${attempt} 次重试, 错误: ${error.code}`);
  }
});

// 模拟具有错误码的API
function simulateAPIWithCode(successRate = 0.3) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < successRate) {
        resolve('成功');
      } else {
        const errors = [
          { code: 'ECONNRESET', message: '连接重置' },
          { code: 'ETIMEDOUT', message: '连接超时' },
          { code: 'ENOTFOUND', message: '未找到主机' }
        ];
        const error = errors[Math.floor(Math.random() * errors.length)];
        reject(error);
      }
    }, 500);
  });
}

strategy.execute(() => simulateAPIWithCode(0.2))
  .then(console.log)
  .catch(console.error);
```

#### 5. 并发限制的重试队列
```typescript
class RetryQueue {
    queue: any[];
    active: number;
    maxConcurrent:number;
    retryConfig: any;

  constructor(maxConcurrent = 3, retryConfig = { maxRetries: 3 }) {
    this.queue = [];
    this.active = 0;
    this.maxConcurrent = maxConcurrent;
    this.retryConfig = retryConfig;
  }
  
  async add(taskFn, taskId) {
    return new Promise((resolve, reject) => {
      this.queue.push({ taskFn, taskId, resolve, reject });
      this.process();
    });
  }
  
  async process() {
    if (this.active >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }
    
    this.active++;
    const { taskFn, taskId, resolve, reject } = this.queue.shift();
    
    try {
      const result = await this.executeWithRetry(taskFn, taskId);
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.active--;
      this.process();
    }
  }
  
  async executeWithRetry(taskFn, taskId) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        console.log(`执行任务 ${taskId}, 尝试 ${attempt}`);
        return await taskFn();
      } catch (error) {
        lastError = error;
        
        if (attempt >= this.retryConfig.maxRetries) {
          break;
        }
        
        const delay = 1000 * attempt;
        console.log(`任务 ${taskId} 失败, ${delay}ms 后重试`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
    
    throw new Error(`任务 ${taskId} 重试 ${this.retryConfig.maxRetries} 次后失败: ${lastError.message}`);
  }
}

// 使用示例
const queue = new RetryQueue(2, { maxRetries: 3 });

// 添加多个任务
const tasks = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  fn: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.7 ? resolve(`任务 ${i} 成功`) : reject(new Error(`任务 ${i} 失败`));
    }, 500);
  })
}));

// 并行执行，最多2个并发，每个任务最多重试3次
Promise.all(
  tasks.map(({ id, fn }) => 
    queue.add(fn, id)
      .then(result => ({ id, status: 'success', result }))
      .catch(error => ({ id, status: 'failed', error: error.message }))
  )
).then(results => {
  console.log('所有任务完成:');
  results.forEach(r => console.log(`任务 ${r.id}: ${r.status}`));
});
```

### 三、智能重传机制
#### 6. 基于响应状态的重传

```typescript
class SmartRetry {
  config:any;
  constructor(config = {}) {
    this.config = {
      maxRetries: 3,
      retryableStatusCodes: [408, 429, 500, 502, 503, 504],
      retryableErrorTypes: ['NetworkError', 'TimeoutError'],
      ...config
    };
  }
  
  async fetchWithSmartRetry(url, options:any = {}) {
    let lastResponse;
    let lastError;
    
    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          return response;
        }
        
        lastResponse = response;
        
        // 检查是否应该重试
        if (attempt < this.config.maxRetries && 
            this.config.retryableStatusCodes.includes(response.status)) {
          
          // 检查 Retry-After 头
          const retryAfter = response.headers.get('Retry-After');
          let delay = this.calculateDelay(attempt);
          
          if (retryAfter) {
            delay = this.parseRetryAfter(retryAfter);
            console.log(`服务器要求 ${delay}ms 后重试`);
          }
          
          console.log(`HTTP ${response.status}, 等待 ${delay}ms 后重试...`);
          await this.delay(delay);
          continue;
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        
      } catch (error) {
        lastError = error;
        
        if (attempt >= this.config.maxRetries) {
          break;
        }
        
        // 检查错误类型是否应该重试
        const shouldRetry = this.config.retryableErrorTypes.some(
          type => error.name === type || error.constructor.name === type
        );
        
        if (!shouldRetry) {
          break;
        }
        
        console.log(`${error.name}, 等待后重试...`);
        await this.delay(this.calculateDelay(attempt));
      }
    }
    
    const error = lastError || new Error(`HTTP ${lastResponse?.status || 'Unknown'}`);
    throw error;
  }
  
  calculateDelay(attempt) {
    // 指数退避 + 随机抖动
    const baseDelay = 1000;
    const delay = baseDelay * Math.pow(2, attempt);
    const jitter = Math.random() * 0.3 * delay;
    return Math.min(delay + jitter, 30000); // 最大30秒
  }
  
  parseRetryAfter(retryAfter) {
    if (/^\d+$/.test(retryAfter)) {
      return parseInt(retryAfter) * 1000; // 秒转毫秒
    }
    
    // 解析日期格式
    const date = new Date(retryAfter);
    if (!isNaN(date.getTime())) {
      return Math.max(0, date.getTime() - Date.now());
    }
    
    return 5000; // 默认5秒
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 使用示例
const smartRetry = new SmartRetry({
  maxRetries: 5,
  retryableStatusCodes: [408, 429, 500, 502, 503, 504]
});

// 模拟请求
smartRetry.fetchWithSmartRetry('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log('数据:', data))
  .catch(error => console.error('最终失败:', error.message));
```
#### 7. 带熔断器的重传机制
```typescript
class CircuitBreaker {
    failureThreshold:number;
    resetTimeout:number;
    failureCount: number;
    state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
    lastFailureTime: number;
  constructor(failureThreshold = 5, resetTimeout = 60000) {
    this.failureThreshold = failureThreshold;
    this.resetTimeout = resetTimeout;
    this.failureCount = 0;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.lastFailureTime = null;
  }
  
  async call(fn) {
    if (this.state === 'OPEN') {
      // 检查是否应该进入半开状态
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = 'HALF_OPEN';
        console.log('熔断器进入半开状态');
      } else {
        throw new Error('熔断器已打开，拒绝请求');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failureCount = 0;
    if (this.state === 'HALF_OPEN') {
      this.state = 'CLOSED';
      console.log('熔断器恢复正常');
    }
  }
  
  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      console.log(`熔断器打开，${this.resetTimeout}ms 后恢复`);
      
      // 自动恢复
      setTimeout(() => {
        this.state = 'HALF_OPEN';
        console.log('熔断器进入半开状态，尝试恢复');
      }, this.resetTimeout);
    }
  }
}

// 结合重试机制
class RetryWithCircuitBreaker {
  circuitBreaker: CircuitBreaker;
  retryConfig: any;
  constructor(circuitBreakerConfig: any = {}, retryConfig = {}) {
    this.circuitBreaker = new CircuitBreaker(
      circuitBreakerConfig.failureThreshold,
      circuitBreakerConfig.resetTimeout
    );
    this.retryConfig = retryConfig;
  }
  
  async execute(fn) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        // 通过熔断器调用
        return await this.circuitBreaker.call(fn);
      } catch (error) {
        lastError = error;
        
        if (error.message.includes('熔断器已打开') || 
            attempt >= this.retryConfig.maxRetries) {
          break;
        }
        
        console.log(`重试 ${attempt}/${this.retryConfig.maxRetries}`);
        await this.delay(this.retryConfig.delay || 1000);
      }
    }
    
    throw lastError;
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 使用示例
const service = new RetryWithCircuitBreaker(
  { failureThreshold: 3, resetTimeout: 10000 }, // 熔断器配置
  { maxRetries: 3, delay: 2000 } // 重试配置
);

// 模拟不稳定的服务
let callCount = 0;
function unstableService() {
  return new Promise((resolve, reject) => {
    callCount++;
    setTimeout(() => {
      if (callCount <= 5) {
        reject(new Error('服务暂时不可用'));
      } else {
        resolve('服务恢复正常');
      }
    }, 500);
  });
}

// 连续调用
async function testCalls() {
  for (let i = 0; i < 10; i++) {
    try {
      console.log(`调用 ${i + 1}`);
      const result = await service.execute(unstableService);
      console.log(`成功: ${result}`);
    } catch (error) {
      console.log(`失败: ${error.message}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
}

testCalls();
```

#### 8. 基于优先级的重试队列
```typescript
class PriorityRetryQueue {
    queues: any;
    active: Set<any>;
    maxConcurrent:number;
    retryConfig: any;
  constructor(config: any = {}) {
    this.queues = {
      high: [],
      normal: [],
      low: []
    };
    this.active = new Set();
    this.maxConcurrent = config.maxConcurrent || 5;
    this.retryConfig = {
      high: { maxRetries: 5, baseDelay: 1000 },
      normal: { maxRetries: 3, baseDelay: 2000 },
      low: { maxRetries: 1, baseDelay: 5000 },
      ...config.priorities
    };
  }
  
  add(taskFn, priority = 'normal', id: any = Date.now()) {
    return new Promise((resolve, reject) => {
      this.queues[priority].push({ taskFn, id, resolve, reject });
      this.process();
    });
  }
  
  async process() {
    if (this.active.size >= this.maxConcurrent) return;
    
    // 按优先级处理
    const priorities = ['high', 'normal', 'low'];
    let task;
    
    for (const priority of priorities) {
      if (this.queues[priority].length > 0) {
        task = this.queues[priority].shift();
        break;
      }
    }
    
    if (!task) return;
    
    const taskId = task.id;
    this.active.add(taskId);
    
    try {
      const result = await this.executeWithRetry(task.taskFn, taskId, taskId.priority);
      task.resolve(result);
    } catch (error) {
      task.reject(error);
    } finally {
      this.active.delete(taskId);
      this.process();
    }
  }
  
  async executeWithRetry(fn, taskId, priority = 'normal') {
    const config = this.retryConfig[priority];
    let lastError;
    
    for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
      try {
        console.log(`执行 ${priority} 优先级任务 ${taskId}, 尝试 ${attempt}`);
        return await fn();
      } catch (error) {
        lastError = error;
        
        if (attempt >= config.maxRetries) {
          break;
        }
        
        const delay = config.baseDelay * attempt;
        console.log(`任务 ${taskId} 失败, ${delay}ms 后重试`);
        await this.delay(delay);
      }
    }
    
    throw new Error(`任务 ${taskId} 重试失败: ${lastError.message}`);
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 使用示例
const priorityQueue = new PriorityRetryQueue({
  maxConcurrent: 2,
  priorities: {
    high: { maxRetries: 5, baseDelay: 500 },
    normal: { maxRetries: 3, baseDelay: 1000 },
    low: { maxRetries: 1, baseDelay: 2000 }
  }
});

// 使用示例
function simulateAPI(successRate = 0.3) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < successRate 
        ? resolve('API 调用成功')
        : reject(new Error('API 调用失败'));
    }, 500);
  });
}

// 添加不同优先级的任务
const tasks = [
  { priority: 'high', id: 'H1', fn: () => simulateAPI(0.3) },
  { priority: 'normal', id: 'N1', fn: () => simulateAPI(0.4) },
  { priority: 'low', id: 'L1', fn: () => simulateAPI(0.5) },
  { priority: 'high', id: 'H2', fn: () => simulateAPI(0.3) },
  { priority: 'normal', id: 'N2', fn: () => simulateAPI(0.4) }
];

tasks.forEach(task => {
  priorityQueue.add(task.fn, task.priority, task.id)
    .then(result => console.log(`${task.id} 完成: ${result}`))
    .catch(error => console.log(`${task.id} 失败: ${error.message}`));
});
```
### 四、实用工具函数
#### 9. 通用的重试装饰器
不过这个示例没能跑起来，报错如下，因为对ts的decoractor也不太了解，所以暂时就先贴在这里。
```
error TS1241: Unable to resolve signature of method decorator when called as an expression.
source-map-support.js:726
  The runtime will invoke the decorator with 2 arguments, but the decorator expects
```
```typescript
function retryDecorator(options: any = {}) {
  const {
    maxRetries = 3,
    delay = 1000,
    strategy = 'fixed',
    shouldRetry = () => true,
    onRetry = () => {}
  } = options;
  
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(...args) {
      let lastError;
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error;
          
          if (!shouldRetry(error) || attempt >= maxRetries) {
            break;
          }
          
          let retryDelay = delay;
          if (strategy === 'exponential') {
            retryDelay = delay * Math.pow(2, attempt - 1);
          } else if (strategy === 'fibonacci') {
            let a = 0, b = delay;
            for (let i = 1; i < attempt; i++) {
              [a, b] = [b, a + b];
            }
            retryDelay = b;
          }
          
          onRetry({ attempt, delay: retryDelay, error, args });
          
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
      
      throw lastError;
    };
    
    return descriptor;
  };
}

// 使用装饰器（需要支持装饰器的环境或使用Babel）
class APIService {
    
  @retryDecorator({
    maxRetries: 3,
    strategy: 'exponential',
    shouldRetry: (error) => error.message.includes('timeout'),
    onRetry: ({ attempt, delay }) => {
      console.log(`第 ${attempt} 次重试，等待 ${delay}ms`);
    }
  })
  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }
}

// 或者在普通函数中使用
const retryable = (fn, options) => {
  const decorator = retryDecorator(options);
  return decorator({}, 'fn', { value: fn }).value;
};

const fetchWithRetry = retryable(
  async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  },
  { maxRetries: 3, delay: 1000 }
);
```
