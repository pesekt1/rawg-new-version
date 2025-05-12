# Common variables
BAKE=docker buildx bake -f docker-bake.hcl
UP=docker compose up -d

# Build and Start all services except the seeder, and open browser tabs for the client and API documentation
up:
	$(BAKE) && $(UP) --scale seeder=0
	$(MAKE) open-tabs

# Stop and remove all running services
down:
	docker compose down

# Build all services using bake
build:
	$(BAKE)

# Start the seeder service (default mode) after building with bake
up-seeder:
	$(BAKE) && $(UP)

# Start the seeder service in user-specific mode with parallel builds
up-seeder-user:
	$(BAKE) && SEED_MODE=user $(UP)

# Build and Start the seeder service with a specific number of game pages to seed, using parallel builds
# --force-recreate ensures the seeder is recreated even if it already exists
# Example usage: make up-seeder-pages GAME_PAGES=10
up-seeder-pages:
	$(BAKE) && GAME_PAGES=$(GAME_PAGES) $(UP) --force-recreate

# Open browser tabs for the client and API documentation
open-tabs:
	cmd.exe /C start chrome http://localhost:3000/ http://localhost:5000/redoc http://localhost:5000/docs/