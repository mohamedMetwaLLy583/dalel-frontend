#!/bin/bash
# ============================================
# Dalel Docker - Useful Commands
# ============================================
# Usage: ./docker/commands.sh [command]
# ============================================

case "$1" in
  start)
    echo "Starting all containers..."
    docker compose up -d
    ;;
  stop)
    echo "Stopping all containers..."
    docker compose down
    ;;
  restart)
    echo "Restarting all containers..."
    docker compose restart
    ;;
  build)
    echo "Rebuilding all containers..."
    docker compose up -d --build
    ;;
  logs)
    echo "Showing logs (Ctrl+C to exit)..."
    docker compose logs -f ${2:-}
    ;;
  migrate)
    echo "Running database migrations..."
    docker exec dalel-backend php artisan migrate --force
    ;;
  seed)
    echo "Running database seeder..."
    docker exec dalel-backend php artisan db:seed --force
    ;;
  fresh)
    echo "Fresh migration + seed..."
    docker exec dalel-backend php artisan migrate:fresh --seed --force
    ;;
  shell-backend)
    echo "Opening backend shell..."
    docker exec -it dalel-backend bash
    ;;
  shell-frontend)
    echo "Opening frontend shell..."
    docker exec -it dalel-frontend sh
    ;;
  shell-dashboard)
    echo "Opening dashboard shell..."
    docker exec -it dalel-dashboard sh
    ;;
  mysql)
    echo "Opening MySQL shell..."
    docker exec -it dalel-mysql mysql -u dalel_user -p dalel_db
    ;;
  status)
    echo "Container status:"
    docker compose ps
    ;;
  clean)
    echo "Stopping and removing all containers, volumes..."
    docker compose down -v
    docker system prune -f
    ;;
  *)
    echo "============================================"
    echo "  Dalel Docker Commands"
    echo "============================================"
    echo ""
    echo "Usage: ./docker/commands.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start          - Start all containers"
    echo "  stop           - Stop all containers"
    echo "  restart        - Restart all containers"
    echo "  build          - Rebuild and start containers"
    echo "  logs [service] - Show logs (e.g., logs backend)"
    echo "  migrate        - Run database migrations"
    echo "  seed           - Run database seeder"
    echo "  fresh          - Fresh migrate + seed"
    echo "  shell-backend  - Open backend bash shell"
    echo "  shell-frontend - Open frontend shell"
    echo "  shell-dashboard- Open dashboard shell"
    echo "  mysql          - Open MySQL shell"
    echo "  status         - Show container status"
    echo "  clean          - Remove everything (WARNING)"
    echo ""
    ;;
esac
