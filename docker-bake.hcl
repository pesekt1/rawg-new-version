group "default" {
  targets = ["seeder", "rawg-server", "rawg-client"]
}

target "seeder" {
  context = "./seeder"
  dockerfile = "Dockerfile"
}

target "rawg-server" {
  context = "./rawg-server"
  dockerfile = "Dockerfile"
}

target "rawg-client" {
  context = "./rawg-client"
  dockerfile = "Dockerfile"
}
