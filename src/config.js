const baseUrl = 'http://localhost:3030';
const config = {
  locale: 'zh-CN', // en-US, zh-CN
  url: baseUrl,
  ajaxUploadUrl: `${baseUrl}/admin/api/upload`,
  debug: {
    mock: false, // enable mock
    http: false, // http request log
  },
  api: `${baseUrl}`,
  // locale: 'en', //en
  // api: 'http://192.168.1.108:3333/admin/api'
};

global.config = config;

export default config;
