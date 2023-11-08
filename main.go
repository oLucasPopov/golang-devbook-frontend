package main

import (
	"fmt"
	"log"
	"net/http"
	"webapp/src/router"
)

func main() {
	fmt.Println("rodando WebApp")
	r := router.Gerar()
	log.Fatal(http.ListenAndServe("localhost:3000", r))
}
