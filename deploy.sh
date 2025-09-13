#!/bin/bash

# NGX-PUZZLE 一键部署脚本
# 作者: NGX-PUZZLE Team
# 用途: 自动构建并部署到远程服务器
# 使用方法: ./deploy.sh user@hostname [domain] [remote_path]

set -e  # 遇到错误立即退出

# 检查参数
if [ $# -lt 1 ]; then
    echo "使用方法: $0 user@hostname [domain] [remote_path]"
    echo "示例: $0 root@example.com puzzle.example.com /opt/ngx-puzzle"
    echo "      $0 ubuntu@192.168.1.100 localhost /home/ubuntu/app"
    exit 1
fi

# 解析命令行参数
USER_HOST="$1"
REMOTE_USER="${USER_HOST%@*}"
REMOTE_HOST="${USER_HOST#*@}"
DOMAIN="${2:-$REMOTE_HOST}"
REMOTE_PATH="${3:-/root/ngx-puzzle}"
LOCAL_DIST="dist/example"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查前置条件
check_prerequisites() {
    log_info "检查前置条件..."

    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装，请先安装 Node.js"
        exit 1
    fi

    # 检查 npm
    if ! command -v npm &> /dev/null; then
        log_error "npm 未安装，请先安装 npm"
        exit 1
    fi

    # 检查 SSH 连接
    if ! ssh -o BatchMode=yes -o ConnectTimeout=5 ${REMOTE_USER}@${REMOTE_HOST} exit &> /dev/null; then
        log_error "无法连接到远程服务器 ${REMOTE_HOST}，请检查 SSH 配置"
        exit 1
    fi

    log_success "前置条件检查完成"
}

# 安装依赖
install_dependencies() {
    log_info "安装项目依赖..."

    if [ ! -d "node_modules" ]; then
        npm install
    else
        log_info "依赖已存在，跳过安装"
    fi

    log_success "依赖安装完成"
}

# 构建项目
build_project() {
    log_info "构建项目..."

    # 清理旧的构建文件
    if [ -d "$LOCAL_DIST" ]; then
        rm -rf "$LOCAL_DIST"
        log_info "清理旧的构建文件"
    fi

    # 构建示例应用
    npm run build:docs

    if [ ! -d "$LOCAL_DIST" ]; then
        log_error "构建失败，找不到构建输出目录: $LOCAL_DIST"
        exit 1
    fi

    log_success "项目构建完成"
}

# 准备部署文件
prepare_deployment() {
    log_info "准备部署文件..."

    # 创建临时部署目录
    DEPLOY_DIR="/tmp/ngx-puzzle-deploy-$(date +%s)"
    mkdir -p "$DEPLOY_DIR"

    # 复制必要文件
#    cp -r "$LOCAL_DIST" "$DEPLOY_DIR/"
#    cp docker-compose.yaml "$DEPLOY_DIR/"
#    cp nginx.conf "$DEPLOY_DIR/"
#    cp Dockerfile "$DEPLOY_DIR/"
#    cp .dockerignore "$DEPLOY_DIR/"
#
#    # 复制 SSL 证书
#    if [ -d "zhongmiaoorg.cn_nginx" ]; then
#        mkdir -p "$DEPLOY_DIR/ssl"
#        cp zhongmiaoorg.cn_nginx/zhongmiaoorg.cn_bundle.crt "$DEPLOY_DIR/ssl/"
#        cp zhongmiaoorg.cn_nginx/zhongmiaoorg.cn.key "$DEPLOY_DIR/ssl/"
#        log_info "SSL 证书已复制"
#    else
#        log_warning "未找到 SSL 证书目录，将使用 HTTP"
#    fi

    # 更新 nginx 配置中的域名
    sed -i.bak "s/puzzle\.zhongmiaoorg\.cn/${DOMAIN}/g" "$DEPLOY_DIR/nginx.conf"

    log_success "部署文件准备完成: $DEPLOY_DIR"
}

# 上传文件到服务器
upload_files() {
    log_info "上传文件到远程服务器..."

    # 确保远程目录存在
    ssh ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_PATH}"

    # 停止现有服务
    log_info "停止现有服务..."
    ssh ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_PATH} && docker-compose down 2>/dev/null || true"

    # 上传文件
    rsync -avz --delete "$DEPLOY_DIR/" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

    # 清理临时目录
    rm -rf "$DEPLOY_DIR"

    log_success "文件上传完成"
}

# 在服务器上部署
deploy_on_server() {
    log_info "在服务器上部署应用..."

    # 执行远程部署命令
    ssh ${REMOTE_USER}@${REMOTE_HOST} << EOF
        cd ${REMOTE_PATH}

        # 确保 Docker 和 Docker Compose 已安装
        if ! command -v docker &> /dev/null; then
            echo "安装 Docker..."
            curl -fsSL https://get.docker.com -o get-docker.sh
            sh get-docker.sh
            systemctl start docker
            systemctl enable docker
        fi

        if ! command -v docker-compose &> /dev/null; then
            echo "安装 Docker Compose..."
            curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
            chmod +x /usr/local/bin/docker-compose
        fi

        # 拉取最新的 nginx 镜像
        docker pull nginx:alpine

        # 启动服务
        docker-compose up -d

        # 显示服务状态
        docker-compose ps
EOF

    log_success "服务器部署完成"
}

# 验证部署
verify_deployment() {
    log_info "验证部署..."

    # 等待服务启动
    sleep 5

    # 检查服务状态
    if ssh ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_PATH} && docker-compose ps | grep -q 'Up'"; then
        log_success "服务已成功启动"
    else
        log_error "服务启动失败"
        ssh ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_PATH} && docker-compose logs"
        exit 1
    fi

    # 检查健康状态
    log_info "检查应用健康状态..."
    if ssh ${REMOTE_USER}@${REMOTE_HOST} "curl -s http://localhost/health | grep -q 'healthy'"; then
        log_success "应用健康检查通过"
    else
        log_warning "健康检查失败，但服务可能仍然可用"
    fi
}

# 显示部署信息
show_deployment_info() {
    echo ""
    echo "🎉 部署完成！"
    echo ""
    echo "📋 部署信息："
    echo "   服务器: ${REMOTE_USER}@${REMOTE_HOST}"
    echo "   部署路径: ${REMOTE_PATH}"
    echo "   访问域名: ${DOMAIN}"
    echo "   访问地址: https://${DOMAIN}"
    echo "   HTTP地址: http://${DOMAIN}"
    echo ""
    echo "🔧 管理命令："
    echo "   查看日志: ssh ${REMOTE_USER}@${REMOTE_HOST} 'cd ${REMOTE_PATH} && docker-compose logs -f'"
    echo "   重启服务: ssh ${REMOTE_USER}@${REMOTE_HOST} 'cd ${REMOTE_PATH} && docker-compose restart'"
    echo "   停止服务: ssh ${REMOTE_USER}@${REMOTE_HOST} 'cd ${REMOTE_PATH} && docker-compose down'"
    echo ""
    echo "📝 注意事项："
    echo "   1. 请确保域名 ${DOMAIN} 已正确解析到服务器 ${REMOTE_HOST}"
    echo "   2. 如需 HTTPS，请配置 SSL 证书"
    echo "   3. 建议设置防火墙规则，只开放必要端口"
    echo ""
}

# 主函数
main() {
    echo ""
    echo "🚀 NGX-PUZZLE 一键部署脚本"
    echo "=================================="
    echo ""

    # 执行部署步骤
    check_prerequisites
    install_dependencies
    build_project
    prepare_deployment
    upload_files
    deploy_on_server
    verify_deployment
    show_deployment_info

    log_success "🎉 部署完成！访问地址: https://${DOMAIN}"
}

# 处理中断信号
trap 'log_error "部署被中断"; exit 1' INT TERM

# 执行主函数
main "$@"
