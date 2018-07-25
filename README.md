# webpack4-simple

## 跨域

主要是将本地的域代理成远程的域，对应的后台服务在node-server

### using webpack-dev-server

将webpack-config.js注释部分放开，执行以下命令，会自动打开http://localhost:3000

```
yarn start
```

### using express + http-proxy-middleware

执行以下命令后，请求http://localhost:3000

```
yarn server
```

### using nginx

相当于将本地调用的url拦截，代理成远程服务的域名，远程服务认为这是同一个源，就不会出现跨域错误，设置完以下配置，请求http://localhost:3000

nginx 在mac上安装

```
brew install nginx
```

编辑配置文件

```
/usr/local/etc/nginx/nginx.conf
```

新增一个网址 就需要新增监听server部分

```
server {
  listen 80;
  server_name localhost;
  root /Users/<user>/Documents/path/to/your/website;
  index index.html index.htm;
}
```

反向代理部分配置，第一个 location，是拦截 / 请求，返回html页面；第二个 location，当请求 http://localhost:3000/api 时，nginx 会拦截该请求，代理成 http://localhost:3001/api
^~ 是因为 /api 时也会被第一个 / 所匹配，但是 ^~ 就是匹配成功，停止往下匹配

```
location / {
     root   /Users/smilen/Documents/Private/Code/webpack4-simple/dist;
     index  index.html;
}
location ^~ /api{
        #rewrite ^/api/(.*)$ /$1 break;
        proxy_pass http://localhost:3001;
}
```

### using cors

保留webpack.config.js注释部分，请求http://localhost:3000

### jsonp

主要是利用 <script></script> 标签的请求没有同源策略限制，将请求放到该标签中，包括回调函数名称。这里不做实验