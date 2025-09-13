#!/bin/bash

# NGX-PUZZLE 快速部署脚本（简化版）
# 用途: 快速重新部署应用（跳过环境检查）
# 使用方法: ./quick-deploy.sh user@hostname [domain] [remote_path]

set -e

# 检查参数
if [ $# -lt 1 ]; then
    echo "使用方法: $0 user@hostname [domain] [remote_path]"
    echo "示例: $0 root@example.com puzzle.example.com /opt/ngx-puzzle"
    exit 1
fi

# 解析命令行参数
USER_HOST="$1"
REMOTE_USER="${USER_HOST%@*}"
REMOTE_HOST="${USER_HOST#*@}"
DOMAIN="${2:-$REMOTE_HOST}"
REMOTE_PATH="${3:-/opt/ngx-puzzle}"

echo "🚀 快速部署 NGX-PUZZLE..."

# 构建项目
echo "📦 构建项目..."
npm run build:docs

# 更新 nginx 配置域名
echo "⚙️ 更新配置..."
sed "s/puzzle\.zhongmiaoorg\.cn/${DOMAIN}/g" nginx.conf > nginx.conf.tmp
mv nginx.conf.tmp nginx.conf

# 上传并部署
echo "📤 上传文件..."
ssh ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_PATH}"

# 复制 SSL 证书到临时目录
if [ -d "zhongmiaoorg.cn_nginx" ]; then
    echo "🔐 准备 SSL 证书..."
    mkdir -p ssl
    cp zhongmiaoorg.cn_nginx/zhongmiaoorg.cn_bundle.crt ssl/
    cp zhongmiaoorg.cn_nginx/zhongmiaoorg.cn.key ssl/
fi

rsync -avz --exclude='node_modules' --exclude='.git' --exclude='zhongmiaoorg.cn_nginx' ./ ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/

# 清理临时 SSL 目录
if [ -d "ssl" ]; then
    rm -rf ssl
fi

echo "🔄 重启服务..."
ssh ${REMOTE_USER}@${REMOTE_HOST} << EOF
cd ${REMOTE_PATH}
docker-compose down 2>/dev/null || true
docker-compose up -d
docker-compose ps
EOF

echo "✅ 部署完成！"
echo "📋 部署信息："
echo "   服务器: ${REMOTE_USER}@${REMOTE_HOST}"
echo "   部署路径: ${REMOTE_PATH}"
echo "   访问域名: ${DOMAIN}"
echo "🌐 访问地址: https://${DOMAIN}"