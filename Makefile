up:
	docker compose up -d --scale seeder=0

up-seeder:
	docker compose up -d

#Example: make up-seeder-pages GAME_PAGES=2
up-seeder-pages:
	docker compose up -d --scale seeder=1 --build --force-recreate -e GAME_PAGES=$(GAME_PAGES)

up-build:
	docker compose up -d --build --scale seeder=0

down:
	docker compose down

