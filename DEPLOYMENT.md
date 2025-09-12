# 📦 部署指南

## 🚀 一键部署

### 准备工作

1. **确保 SSH 免密登录已配置**
```bash
# 测试连接
ssh user@your-server.com
```

2. **首次部署 - 初始化服务器**
```bash
# 在服务器上运行（仅需执行一次）
ssh user@your-server.com 'bash -s' < server-setup.sh your-domain.com /path/to/app
```

### 部署方式

#### 方式一：完整部署（推荐首次使用）
```bash
# 完整检查和部署
./deploy.sh user@hostname [domain] [remote_path]

# 示例
./deploy.sh root@example.com puzzle.example.com /opt/ngx-puzzle
./deploy.sh ubuntu@192.168.1.100 localhost /home/ubuntu/app
```

#### 方式二：快速部署（日常更新）
```bash
# 快速构建和部署
./quick-deploy.sh user@hostname [domain] [remote_path]

# 示例
./quick-deploy.sh root@example.com puzzle.example.com
```

## 📋 脚本说明

### `deploy.sh` - 完整部署脚本
- ✅ 环境检查（Node.js、npm、SSH）
- 🔧 依赖安装
- 📦 项目构建
- 📤 文件上传
- 🐳 Docker 服务部署
- ✔️ 部署验证
- 📊 状态报告

### `quick-deploy.sh` - 快速部署脚本
- 📦 项目构建
- ⚙️ 配置更新
- 📤 文件同步
- 🔄 服务重启

### `server-setup.sh` - 服务器初始化脚本
- 🔄 系统更新
- 🐳 Docker 安装
- 🔥 防火墙配置
- 📁 目录创建

## 🌐 访问信息

根据你的部署配置：
- **访问地址**: https://your-domain.com (或你配置的域名)
- **HTTP**: http://your-domain.com
- **健康检查**: http://your-domain.com/health

## 🔧 管理命令

### 本地管理
```bash
# 查看远程服务状态
ssh user@hostname 'cd /path/to/app && docker-compose ps'

# 查看远程日志
ssh user@hostname 'cd /path/to/app && docker-compose logs -f'

# 重启远程服务
ssh user@hostname 'cd /path/to/app && docker-compose restart'

# 停止远程服务
ssh user@hostname 'cd /path/to/app && docker-compose down'
```

### 服务器管理
```bash
# 进入服务器
ssh user@hostname

# 进入项目目录
cd /path/to/app

# 查看服务状态
docker-compose ps

# 查看实时日志
docker-compose logs -f nginx

# 重启服务
docker-compose restart

# 更新镜像
docker-compose pull && docker-compose up -d
```

## 🛠️ 故障排除

### 常见问题

1. **SSH 连接失败**
```bash
# 检查 SSH 配置
ssh -v user@hostname

# 重新配置密钥
ssh-copy-id user@hostname
```

2. **构建失败**
```bash
# 清理依赖重新安装
rm -rf node_modules package-lock.json
npm install

# 手动构建测试
npm run build:example
```

3. **服务启动失败**
```bash
# 检查端口占用
ss -tlnp | grep :80

# 查看详细错误日志
docker-compose logs nginx

# 重置服务
docker-compose down
docker-compose up -d
```

4. **域名访问失败**
```bash
# 检查域名解析
nslookup your-domain.com

# 检查防火墙
ufw status
```

## 🔒 安全建议

1. **配置 HTTPS**
   - 使用 Let's Encrypt 免费证书
   - 配置 SSL 重定向

2. **设置防火墙规则**
   - 仅开放必要端口
   - 限制 SSH 访问来源

3. **定期备份**
   - 备份配置文件
   - 备份应用数据

## 📈 监控和维护

1. **日志监控**
```bash
# 设置日志轮转
logrotate /etc/logrotate.d/nginx
```

2. **性能监控**
```bash
# 安装系统监控
htop
iostat
```

3. **自动更新**
```bash
# 设置定时任务
crontab -e
# 添加: 0 2 * * * /path/to/app/quick-deploy.sh user@hostname domain
```

## 📞 技术支持

如有问题，请联系技术支持或查看项目文档：
- GitHub: https://github.com/zhongmiao-org/ngx-puzzle
- 项目文档: 查看项目 README 文件