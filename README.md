# BigFang Wallet

冷钱包品牌、原站优惠记录与视频教学目录。纯 HTML / CSS / JavaScript，无需安装依赖。

目标仓库：https://github.com/bigfangfang/wallet

目标域名：https://wallet.bigfang.vip/

## 发布

将 index.html、style.css、app.js、CNAME、.nojekyll 放在仓库 main 分支根目录。

GitHub 仓库 Settings → Pages → Deploy from a branch → main / (root)。Custom domain 填 wallet.bigfang.vip，保存后再添加 DNS。

在 bigfang.vip 的实际 DNS 管理服务中（如使用 GoDaddy 域名服务器，则在 GoDaddy 管理）：

| 类型 | 名称 | 值 |
| --- | --- | --- |
| CNAME | wallet | bigfangfang.github.io |

不要把仓库名 /wallet 加到 CNAME 值里。主域名与其他记录保持原样。域名验证完成、证书可用后开启 Enforce HTTPS。

配置依据：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## 内容维护

品牌数据位于 app.js 的 wallets 数组。添加或更新优惠前，应验证品牌结账页；当前文字是从原站继承的记录，并非当前优惠承诺。

原始内容：https://bigfang.vip/coldwallet/，读取日期：2026-11-11。页面合并了重复品牌和 Trezor 型号；保留 Keystone 两个不同历史优惠入口。

首页图案是 CSS 绘制的硬件钱包概念示意，不代表实际产品外观。视频封面为文字设计，并非视频原始缩略图。

本地预览：在此文件夹运行 python3 -m http.server 8765，然后打开 http://127.0.0.1:8765/。
