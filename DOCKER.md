# Docker 部署指南

## 快速启动

### 方法一：使用 docker-compose（推荐）

1. **构建应用**
```bash
# 安装依赖
npm install

# 构建示例应用
npm run build:example
```

2. **启动服务**
```bash
# 启动 nginx 服务
docker-compose up -d

# 查看日志
docker-compose logs -f nginx

# 停止服务
docker-compose down
```

3. **访问应用**
- 打开浏览器访问：`http://localhost`

### 方法二：使用 Dockerfile 构建镜像

1. **构建镜像**
```bash
docker build -t ngx-puzzle:latest .
```

2. **运行容器**
```bash
docker run -d \
  --name ngx-puzzle-web \
  -p 80:80 \
  ngx-puzzle:latest
```

## 配置说明

### docker-compose.yaml

```yaml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    container_name: ngx-puzzle-web
    ports:
      - "80:80"      # HTTP 端口
      - "443:443"    # HTTPS 端口（预留）
    volumes:
      - ./dist/example:/usr/share/nginx/html    # 应用文件
      - ./nginx.conf:/etc/nginx/nginx.conf:ro   # nginx 配置
    restart: unless-stopped
    environment:
      - TZ=Asia/Shanghai    # 时区设置
```

### nginx.conf 特性

- ✅ **Angular 路由支持** - 支持前端路由刷新
- ✅ **Gzip 压缩** - 减少传输体积
- ✅ **静态资源缓存** - 优化加载性能
- ✅ **安全头** - 基本安全防护
- ✅ **健康检查** - `/health` 端点
- ✅ **错误处理** - 自定义错误页面

## 自定义配置

### 修改端口

编辑 `docker-compose.yaml`：
```yaml
ports:
  - "8080:80"  # 修改为 8080 端口
```

### HTTPS 配置

1. 添加 SSL 证书到项目目录
2. 修改 `nginx.conf` 添加 SSL 配置：

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    # 其他配置...
}
```

3. 更新 `docker-compose.yaml` 挂载证书：
```yaml
volumes:
  - ./ssl:/etc/nginx/ssl:ro
```

### 添加 API 代理

取消注释 `nginx.conf` 中的 API 代理配置：
```nginx
location /api/ {
    proxy_pass http://backend:3000/;
    # 其他代理配置...
}
```

## 常用命令

```bash
# 查看容器状态
docker-compose ps

# 重启服务
docker-compose restart nginx

# 查看实时日志
docker-compose logs -f nginx

# 进入容器
docker-compose exec nginx sh

# 更新配置后重新加载
docker-compose exec nginx nginx -s reload

# 清理资源
docker-compose down --volumes --rmi all
```

## 性能优化

1. **启用 Gzip 压缩** ✅ 已配置
2. **设置缓存策略** ✅ 已配置
3. **使用 CDN** - 可配置外部 CDN
4. **资源预加载** - 可在 `index.html` 中配置

## 监控和日志

### 查看访问日志
```bash
docker-compose exec nginx tail -f /var/log/nginx/access.log
```

### 查看错误日志
```bash
docker-compose exec nginx tail -f /var/log/nginx/error.log
```

### 健康检查
```bash
curl http://localhost/health
```

## 故障排除

### 常见问题

1. **端口占用**
```bash
# 检查端口占用
lsof -i :80

# 修改端口映射
ports:
  - "8080:80"
```

2. **权限问题**
```bash
# 确保文件权限正确
chmod 644 nginx.conf
chmod -R 755 dist/example
```

3. **路由 404**
- 确认 nginx.conf 中的 `try_files` 配置正确
- 检查 Angular 应用的 base href 设置

## 部署到生产环境

1. **使用环境变量**
2. **配置 HTTPS**
3. **设置防火墙规则**
4. **配置日志轮转**
5. **设置监控告警**