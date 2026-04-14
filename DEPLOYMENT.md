# Deployment Guide

English | [中文文档](DEPLOYMENT.zh-CN.md)

## One-command deployment

### Prerequisites

1. Configure SSH key-based login.
2. Initialize the target server once:

```bash
ssh user@your-server.com 'bash -s' < server-setup.sh your-domain.com /path/to/app
```

## Deployment modes

### Full deployment (recommended for first time)

```bash
./deploy.sh user@hostname [domain] [remote_path]
```

Examples:

```bash
./deploy.sh root@example.com puzzle.example.com /opt/ngx-puzzle
./deploy.sh ubuntu@192.168.1.100 localhost /home/ubuntu/app
```

### Quick deployment (daily update)

```bash
./quick-deploy.sh user@hostname [domain] [remote_path]
```

## Script overview

- `deploy.sh`: environment checks, dependency install, build, upload, docker deploy, validation.
- `quick-deploy.sh`: fast build/sync/restart pipeline.
- `server-setup.sh`: system bootstrap (Docker, firewall, base folders).

## Access and operations

- Main URL: `https://your-domain.com`
- Health check: `http://your-domain.com/health`

Common remote operations:

```bash
ssh user@hostname 'cd /path/to/app && docker-compose ps'
ssh user@hostname 'cd /path/to/app && docker-compose logs -f'
ssh user@hostname 'cd /path/to/app && docker-compose restart'
ssh user@hostname 'cd /path/to/app && docker-compose down'
```

## Troubleshooting checklist

- SSH issue: `ssh -v user@hostname`
- Build issue: reinstall deps then run `npm run build:example`
- Service issue: inspect ports and container logs
- Domain issue: verify DNS and firewall settings

## Security and maintenance

- Enable HTTPS (Let's Encrypt recommended)
- Restrict firewall and SSH source ranges
- Set up backup and log rotation
