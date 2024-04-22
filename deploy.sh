docker build . -t gbsw-school-camping-frontend
docker rm -f gbsw-school-camping-frontend
docker run --name=gbsw-school-camping-frontend --restart=always --network=my-network -d gbsw-school-camping-frontend