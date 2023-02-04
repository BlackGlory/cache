# Cache
一个受Redis启发的Web友好的自托管ad-hoc微服务.
提供以WebSocket为通讯协议的缓存服务.

## Quickstart
```sh
docker run \
  --detach \
  --publish 8080:8080 \
  blackglory/cache
```

## Install
### 从源代码运行
```sh
git clone https://github.com/BlackGlory/cache
cd cache
yarn install
yarn build
yarn bundle
yarn --silent start
```

### 从源代码构建
```sh
git clone https://github.com/BlackGlory/cache
cd cache
yarn install
yarn docker:build
```

### Recipes
#### docker-compose.yml
```yaml
version: '3.8'

services:
  cache:
    image: 'blackglory/cache'
    restart: always
    volumes:
      - 'cache-data:/data'
    ports:
      - '8080:8080'

volumes:
  cache-data:
```

## API
```typescript
interface IAPI {
  has(namespace: string, key: string): boolean
  get(namespace: string, key: string): string | null
  getWithMetadata(namespace: string, key: string): {
    value: string
    metadata: IMetadata
  } | null
  set(
    namespace: string
  , key: string
  , value: string
  , timeToLive: number | null /* ms */
  ): null
  del(namespace: string, key: string): null
  clear(namespace: string): null

  getAllItemKeys(namespace: string): string[]
  getAllNamespaces(): string[]
  stats(namespace: string): IStats
}

interface IStats {
  namespace: string
  items: number
}

interface IMetadata {
  updatedAt: number
  timeToLive: number | null
}
```

## 环境变量
### `CACHE_HOST`, `CACHE_PORT`
通过环境变量`CACHE_HOST`和`CACHE_PORT`决定服务器监听的地址和端口,
默认值为`localhost`和`8080`.

### `CACHE_WS_HEARTBEAT_INTERVAL`
通过环境变量`CACHE_WS_HEARTBEAT_INTERVAL`可以设置WS心跳包(ping帧)的发送间隔, 单位为毫秒.
在默认情况下, 服务不会发送心跳包,
半开连接的检测依赖于服务端和客户端的运行平台的TCP Keepalive配置.

当`CACHE_WS_HEARTBEAT_INTERVAL`大于零时,
服务会通过WS的ping帧按间隔发送心跳包.

## 信号
### SIGUSR1
发送SIGUSR1执行heapdump:
```sh
kill -SIGUSR1 {pid}
```

## 客户端
- JavaScript/TypeScript(Node.js, Browser): <https://github.com/BlackGlory/cache-js>