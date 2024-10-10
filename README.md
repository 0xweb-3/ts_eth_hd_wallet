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

## 助记词的生成流程
**AES的密钥：用户自己设置的密码**

生成助记词-->助记词编码-> AES 加密->存储到DB
生成助记词-->助记词 seed ---> masterKey----> n 个 child private Key --> child pubkey ---> address
child private Key --> AES 加密,

## 助记词的校验
1. **检查单词数量**
   助记词的单词数量通常为 12、15、18、21 或 24 个单词。如果给定的助记词的单词数量不在这些范围内，则助记词无效。
2. **检查单词是否在词汇表中**
   每个助记词单词必须存在于 BIP-39 标准的 2048 个单词的词汇表中。如果有任何一个单词不在词汇表中，则助记词无效。
3. **将助记词转化成位串**
   将每个助记词单词转换为它在词汇表中的索引。每个索引表示一个 11 位的二进制数。将所有的二进制数连接起来形成一个位串。
4. **提取种子和校验和**
   位串的长度应该是助记词单词数乘以 11。例如，12 个单词的助记词对应的位串长度为 132 位。位串的前 128 位是种子，后 4 位是校验和。
5. **计算校验和**
   将种子通过 SHA-256 哈希函数计算出一个哈希值，然后取哈希值的前 4 位作为计算得到的校验和。
6. **验证校验和**
  比较提取的校验和和计算得到的校验和。如果两者匹配，则助记词有效，否则无效。


## 助记词/ 私钥的存储与导出
对助记词进行编码之后得到 code，用 AES 加密 code 之后存储到 DB
导出助记词: code --> AES 解密-----> decode 出助记词
导出私钥：从数据库里面取出加密的 privatkey --> AES 解密 --> 导出给用户
导入私钥： child private Key --> child pubkey ---> address

## bip44协议
- BIP44: `m/44'/coin_type'/account'/change/address_index`，包含多币种、多账户和多地址类型。
- BIP86: `m/86'/coin_type'/account'/change/address_index`，专注于单密钥 Taproot 地址生成。
```
Coin_Type: 定义特定加密货币的类型，如 0' 表示比特币。60表示eth
Account: 账户索引，允许钱包管理多个独立账户。
Change: 0 表示外部链（收款地址），1 表示内部链（找零地址）。
Address_Index: 用于生成具体地址的索引。
```
[bip44协议对照表](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)


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




