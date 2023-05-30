import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";//这是一个路由仓库 https://github.com/cloudflare/itty-router-openapi
import { GetSearch } from "./search";

// 创建一个OpenAPI路由器
export const router = OpenAPIRouter({
  schema: {
    info: {//展示在网页 https://juejin-chatgpt-plugin-unofficial.puyuetest.workers.dev/
      title: "puyue search Juejin Article API",
      description: "A plugin that allows the user to search for articles on Juejin.cn using ChatGPT",
      version: "v0.0.1"
    }
  },
  // 定义插件的接口信息
  docs_url: "/",
  aiPlugin: {//让chatGPT读取的
    name_for_human: "puyueSearchJuejin",//这里名称都不能很长,会报错
    name_for_model: "puyueModel",
    description_for_human: "puyue Juejin Article Search plugin.",
    description_for_model: "puyue Juejin Article Search plugin. You can search for articles on Juejin.cn using this plugin.",
    contact_email: "support@example.com",
    legal_info_url: "http://www.example.com/legal",//不用管
    logo_url: "https://workers.cloudflare.com/resources/logo/logo.svg"//插件图标使用了一张网图
  }
})

// 注册一个GET请求到/search路径
router.get('/search', GetSearch)

// 处理所有未定义的请求，返回404 Not Found
// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))

// 导出router.handle函数作为fetch的处理函数
export default {
  fetch: router.handle
}
