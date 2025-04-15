addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let url = new URL(request.url);

  // 将 "app.koyeb.com" 替换为您的 Koyeb 应用域名
  const targetHostname = 'rich-belita-iaw-88965125.koyeb.app'; 

  // 获取 Worker 脚本的原始主机名，例如 "your-worker.your-account.workers.dev"
  const workerHostname = request.headers.get('host');

  // 检查请求主机名是否与 Worker 主机名匹配
  if (url.hostname === workerHostname) {
    // 将主机名替换为 Koyeb 应用域名
    url.hostname = targetHostname;

    // 可选：如果您的 Koyeb 应用部署在特定路径下，例如 "/app"，则取消注释以下行
    // url.pathname = '/app' + url.pathname;

    // 使用修改后的 URL 创建新的请求对象
    let newRequest = new Request(url, request);

    // 将请求转发到 Koyeb 应用
    return fetch(newRequest);
  } else {
    // 如果请求未使用 Worker 域名，则直接返回 404 错误
    return new Response('Not Found', { status: 404 });
  }
}
