import { ApiException, OpenAPIRoute, Query, ValidationError } from "@cloudflare/itty-router-openapi";

// 定义一个函数，用于发送POST请求
async function postRequest(url = "", data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

// 定义GetSearch类，用于处理搜索请求
export class GetSearch extends OpenAPIRoute {
    // 定义搜索接口的信息
  static schema = {
    tags: ["Search"],
    summary: "Search articles by a query parameter",
    parameters: {
      q: Query(String, {
        description: "The query to search for",
        default: "cloudflare workers"
      })
    },
    responses: {
      "200": {
        schema: {
          article: [
            {
              title: "CloudFlare Worker",
              description: "OpenAPI 3 schema generator and validator for Cloudflare Workers",
              author: "xxx",
              url: "https://juejin.im/post/xxx"
            }
          ]
        }
      }
    }
  }

    // 处理请求
  async handle(request: Request, env, ctx, data: Record<string, any>) {
        // 构造POST请求的URL和请求数据
    const url = `https://api.juejin.cn/search_api/v1/search`;//这里是个api 是掘金官方的
    const requestData = {
      "key_word": data.q || "",
      "id_type": 0,
      "cursor": "0",
      "limit": 1,
      "search_type": 0,
      "sort_type": 0,
      "version": 1
    };
        // 发送请求并获取响应结果
    const response:any = await postRequest(url, requestData);
       // 将响应结果转换为我们需要的格式并返回
    return { article: response.data.map((ele) => ({
      title: ele.result_model.article_info.title,
      description: ele.result_model.article_info.brief_content,
      author: ele.result_model.author_user_info.user_name,
      url: ele.result_model.article_info.link_url || `https://juejin.cn/post/${ele.result_model.article_info.article_id}`
    })) };
  }
}
