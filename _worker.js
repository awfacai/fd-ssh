export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    url.host = 'rich-belita-iaw-88965125.koyeb.app'; 
    return fetch(new Request(url, request))
  }
}
