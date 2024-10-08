# ts_eth_hd_wallet
使用typescript实现的以太坊HD钱包

## 开发环境构建
### 安装node.js
按照[官网](https://nodejs.org/zh-cn)指引下载对应的`node.js`版本

### 构建typescript
```shell
# 创建项目目录
mkdir ts_eth_hd_wallet
cd ts_eth_hd_wallet
npm init -y

# 安装ts-node和typescript
npm install -g ts-node typescript
npm install --save-dev webpack webpack-cli ts-loader
npx tsc --init # 创建ts配置文件
```

### 测试运行环境
```shell
mkdir src
cd src
touch index.ts
```
`src/index.ts`下内容为
```typescript
const message: string = 'Hello, TypeScript!';
console.log(message);
```
运行 ts-node src/index.ts 后，输出将显示在命令行中：
```shell
Hello, TypeScript!
```
### 构建测试环境
安装
```shell
npm install ts-jest jest @types/jest --save-dev
```
修改配置文件`tsconfig.json`确保配置【一般不用修改】：
```shell
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```
配置`Jest`,在项目根目录下创建一个`jest.config.js`文件，并添加以下内容：
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```
修改`src/index.ts` 
```typescript
// src/index.ts
export const sum = (a: number, b: number): number => {
  return a + b;
};
```
创建测试文件`index.test.ts`
```typescript
// src/index.test.ts
import { sum } from './index';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
修改`package.json`:
```javascript
{
  "scripts":{
    "test": "jest"
  }
}
```
运行
```shell
npm test
```

## 包含功能
* 钱包助记词
  * 助记词生成
  * 导入导出
  * 助记词校验
  * 助记词加密（AES）
  * 助记词的存储
* ETH地址
  * 助记词bip44协议生成地址
  * 私钥的存储
  * 私钥的导入与导出
  * 使用私钥签名交易
* 链上操作
  * 发送交易到链上
  * 从链上获取钱包信息
  * 必要的RPC请求
  * NFT的转账

## 助记词的生成
**AES的密钥：用户自己设置的密码**

生成助记词-->助记词编码-> AES 加密->存储到DB
生成助记词-->助记词 seed ---> masterKey----> n 个 child private Key --> child pubkey ---> address
child private Key --> AES 加密,

## 助记词的校验




## 助记词/ 私钥的存储与导出
对助记词进行编码之后得到 code，用 AES 加密 code 之后存储到 DB
导出助记词: code --> AES 解密-----> decode 出助记词
导出私钥：从数据库里面取出加密的 privatkey --> AES 解密 --> 导出给用户
导入私钥： child private Key --> child pubkey ---> address

## 02与04公钥的区别

## 如何确认交易成功

## 手续费的计算方式

1 ETH = 10^18 wei，以下TotalFee单位为wei

### Legacy 交易类型

TotalFee=GasUsed×GasPrice

### EIP-1559 交易类型

EffectivePriorityFee = min(MaxPriorityFee, MaxFee - BaseFee)

TotalFee = GasUsed * (BaseFee + EffectivePriorityFee)

## 相关ETH链上请求

### 获取Noce

### 获取gasPrice




