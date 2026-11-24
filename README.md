# BigFang Wallet

冷钱包品牌、折扣码、购买与收货安全须知与视频教学目录。纯 HTML / CSS / JavaScript，无需安装依赖。

目标仓库：https://github.com/bigfangfang/wallet

目标域名：https://wallet.bigfang.vip/

## 发布

将 index.html、style.css、wallet-data.js、app.js、favicon 与 og-image 图片、各品牌 logo、CNAME、.nojekyll 放在仓库 main 分支根目录。

GitHub 仓库 Settings → Pages → Deploy from a branch → main / (root)。Custom domain 填 wallet.bigfang.vip，保存后再添加 DNS。

在 bigfang.vip 的实际 DNS 管理服务中（如使用 GoDaddy 域名服务器，则在 GoDaddy 管理）：

| 类型 | 名称 | 值 |
| --- | --- | --- |
| CNAME | wallet | bigfangfang.github.io |

不要把仓库名 /wallet 加到 CNAME 值里。主域名与其他记录保持原样。域名验证完成、证书可用后开启 Enforce HTTPS。

配置依据：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## 内容维护

品牌数据与卡片模板在 wallet-data.js（wallets 数组顶部有字段说明）。改完后在仓库根目录运行：

    node scripts/prerender.mjs

它会把品牌卡片直接写进 index.html 的 `<!--cards:start-->` 与 `<!--cards:end-->` 之间，搜索引擎和 X / Telegram 的链接预览不用执行 JS 也能读到内容。忘了运行也不会坏，页面会在浏览器里补渲染。

- 亲自在结账页核对过某个折扣后，给该品牌加上 `verified: '2026-11'`，卡片会显示"已核对"标记。
- 限时活动用 `promo: {offer, code, note, until}`，截止时间过后页面自动恢复常规优惠（例：SafePal 黑五 SFP@BIGFANG，至 2026-12-03）。
- 短链接（bit.ly、lddy.no、amzn.to 等）确认落地网站后，加上 `dest: 'keyst.one'` 之类的字段，按钮下方会显示"跳转至 xxx"。
- 页面不再使用"原站"说法；原始数据来自 https://bigfang.vip/coldwallet/（2026-11-11 读取）。

分享预览图为 og-image.png（1200×630），网站图标为 favicon.svg、favicon-32.png 与 apple-touch-icon.png。

首页图案是 CSS 绘制的硬件钱包概念示意，不代表实际产品外观。视频封面为文字设计，并非视频原始缩略图。

本地预览：在此文件夹运行 python3 -m http.server 8765，然后打开 http://127.0.0.1:8765/。
