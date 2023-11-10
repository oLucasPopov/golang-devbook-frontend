package middlewares

import (
	"log"
	"net/http"
	"webapp/src/cookies"
)

func Logger(proximaFuncao http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("\n %s %s %s", r.Method, r.RequestURI, r.Host)
		proximaFuncao(w, r)
	}
}

func Autenticar(proximaFuncao http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, erro := cookies.Ler(r)
		if erro != nil {
			http.Redirect(w, r, "/login", http.StatusPermanentRedirect)
		}
		proximaFuncao(w, r)
	}
}
