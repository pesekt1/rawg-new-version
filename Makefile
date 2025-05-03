up:
	docker compose up -d --scale seeder=0
	$(MAKE) open-tabs

up-seeder:
	docker compose up -d

#Example: make up-seeder-pages GAME_PAGES=2
up-seeder-pages:
	docker compose up -d --scale seeder=1 --build --force-recreate -e GAME_PAGES=$(GAME_PAGES)

up-build:
	docker compose up -d --build --scale seeder=0

down:
	docker compose down

open-tabs:
	cmd.exe /C start chrome http://localhost:3000/ http://localhost:5000/redoc http://localhost:5000/docs/

# only run the user seeding, not the whole seeder
up-seeder-user:
	docker compose up -d --build seeder-user