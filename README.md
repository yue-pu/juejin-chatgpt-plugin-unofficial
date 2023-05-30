# https://juejin.cn/post/7238153003282645029
ChatGPT插件开发教程（二）：开发一个掘金的Chatgpt插件

cloudflare有个chatgpt的仓库模板
利用这个模板跟随教程 修根就变成这个仓库
这个仓库是在掘金的官方检索API上套个壳子变一个chatgpt plugin

然后把这个plugin传到服务器 用的是cloudflare免费服务
这是我自己的cloudflare账号创建的
https://juejin-chatgpt-plugin-unofficial.puyuetest.workers.dev/
然后这个就是域名,导入到chatgpt
成功

* 这个项目不是python是typeJS的

## 文中有几个错误  
# 1 部署:
```npm install -g @cloudflare/wrangler //废弃```
先卸载
```npm uninstall -g @cloudflare/wrangler```
再重新安装
```npm install -g wrangler```
# 2 代码发送到云端
```wrangler publish //废弃```
应该用
```wrangler deploy```
# 3 有一个报错
> ✘ [ERROR] Could not resolve "@cloudflare/itty-router-openapi"
>
>    src/index.ts:1:30:
>      1 │ import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
>        ╵                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
>
>  You can mark the path "@cloudflare/itty-router-openapi" as external to exclude it from the bundle, which will remove this error.
解法是
```npm i @cloudflare/itty-router-openapi --save```
之后在执行一次 ``wrangler deploy``
终端显示:
> ⛅️ wrangler 3.0.1
> ------------------
> Total Upload: 20.00 KiB / gzip: 6.40 KiB
> ▲ [WARNING] You need to register a workers.dev subdomain before publishing to workers.dev
>
> ✔ Would you like to register a workers.dev subdomain now? … yes//是否注册yes
> ✔ What would you like your workers.dev subdomain to be? It will be accessible at https://<subdomain>.workers.dev … puyuetest//此处问我要不要加一个单词(subdomain)进入域名里面 我加了[puyuetest]
> ✔ Creating a workers.dev subdomain for your account at https://puyuetest.workers.dev. Ok to proceed? … yes//同意
> Success! It may take a few minutes for DNS records to update.
> Visit https://dash.cloudflare.com/a2620ad1f50511fb47933ce7345d4c0a/workers/subdomain to edit your workers.dev subdomain//要更新subdomain名称时候访问这个url
> Uploaded juejin-chatgpt-plugin-unofficial (0.82 sec)
> Published juejin-chatgpt-plugin-unofficial (51.50 sec)
>  https://juejin-chatgpt-plugin-unofficial.puyuetest.workers.dev //这个就是我的域名 导入到chatgpt pluigin
> Current Deployment ID: ee17b6db-1ebe-4037-aedc-840ab8db5f55
