.PHONY: prereq
prereq:
	docker network create asu-network || true

.PHONY: build
build:
	docker-compose build

.PHONY: run
run: | prereq
	docker-compose up -d
