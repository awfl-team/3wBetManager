.PHONY: help \
		infra-clean infra-shell-node infra-stop infra-up \
		app-build app-install-front app-start
		
default: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?##.*$$' $(MAKEFILE_LIST) | sort | awk '{split($$0, a, ":"); printf "\033[36m%-30s\033[0m %-30s %s\n", a[1], a[2], a[3]}'

PROJECT_DIR = /var/www/react-master

########################################
#              INFRA                   #
########################################
infra-clean: ## to stop and remove containers, networks, images
	docker-compose down --rmi all

infra-shell-node: ## to open a shell session in the node container
	docker-compose exec node /bin/sh

infra-stop: ## to stop all the containers
	docker-compose stop

infra-up: ## to create and start all the containers
	docker-compose up --build -d

########################################
#                APP                   #
########################################

app-build: ## to build the app for production
	docker-compose exec --user root node /bin/sh -c "cd $(PROJECT_DIR) && npm run build";

app-install-front: ## to install Front dependencies
	docker-compose exec --user root node /bin/sh -c "cd $(PROJECT_DIR) && npm install";

app-start: ## to compile and start the app
	docker-compose exec --user root node /bin/sh -c "cd $(PROJECT_DIR) && npm start";
