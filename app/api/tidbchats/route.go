package tidbchats

import (
	"fmt"
	"net/http"
)

func Get(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hello from Go!</h1>")
}
