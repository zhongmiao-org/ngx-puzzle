#!/bin/bash

# 服务器初始化脚本
# 用途: 在远程服务器上安装必要的环境和配置
# 使用方法: ssh user@hostname 'bash -s' < server-setup.sh [domain] [remote_path]

# 解析参数（通过环境变量传递）
DOMAIN="${1:-localhost}"
REMOTE_PATH="${2:-/opt/ngx-puzzle}"

echo "🔧 初始化服务器环境..."

# 更新系统
echo "📦 更新系统包..."
apt update && apt upgrade -y

# 安装必要工具
echo "🛠️ 安装基础工具..."
apt install -y curl wget git vim htop

# 安装 Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 安装 Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl start docker
    systemctl enable docker
    rm get-docker.sh
else
    echo "✅ Docker 已安装"
fi

# 安装 Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "🐳 安装 Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
else
    echo "✅ Docker Compose 已安装"
fi

# 配置防火墙
echo "🔥 配置防火墙..."
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw --force enable

# 创建项目目录
echo "📁 创建项目目录..."
mkdir -p ${REMOTE_PATH}
cd ${REMOTE_PATH}

# 配置 Nginx 反向代理（可选，用于多域名）
echo "⚙️ 配置域名..."
cat > /etc/hosts.append << EOF
# NGX-PUZZLE 域名配置
127.0.0.1 ${DOMAIN}
EOF

# 显示完成信息
echo ""
echo "✅ 服务器初始化完成！"
echo ""
echo "📋 已安装组件："
echo "   - Docker: $(docker --version)"
echo "   - Docker Compose: $(docker-compose --version)"
echo ""
echo "🔧 配置信息："
echo "   - 项目目录: ${REMOTE_PATH}"
echo "   - 域名: ${DOMAIN}"
echo "   - 开放端口: 22, 80, 443"
echo ""
echo "🚀 现在可以运行部署脚本了！"