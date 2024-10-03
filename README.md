# ts_eth_hd_wallet
使用typescript实现的以太坊HD钱包
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

