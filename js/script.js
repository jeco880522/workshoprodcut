const $d = document;
const $table = $d.querySelector(".crud-table");
const $form = $d.querySelector(".crud-form");
const $title = $d.querySelector(".crud-title");
const $template = $d.getElementById("crud-template").content;
const $fragement = $d.createDocumentFragment();

const getAll = async () => {
    try {
        let res = await axios.get("http://localhost:3000/productos/")
        let json = await res.data;
        json.forEach(el => {
            $template.querySelector(".name").textContent = el.nombre;
            $template.querySelector(".proveed").textContent = el.proveedor;
            $template.querySelector(".categori").textContent = el.categoria;
            $template.querySelector(".valor").textContent = el.precio;
            $template.querySelector(".edit").dataset.id = el.id;
            $template.querySelector(".edit").dataset.name = el.nombre;
            $template.querySelector(".edit").dataset.proveed = el.proveedor;
            $template.querySelector(".edit").dataset.categori = el.categoria;
            $template.querySelector(".edit").dataset.valor = el.precio;
            $template.querySelector(".delete").dataset.id = el.id;

            let $clone = $d.importNode($template, true);

            $fragement.appendChild($clone);
        });

        $table.querySelector("tbody").appendChild($fragement);
    } catch (error) {
        let message = error.statusText || "Ocurrió un error";
        $table.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
    }
}

$d.addEventListener("DOMContentLoaded", getAll);


$d.addEventListener("submit", async e => {
    if (e.target === $form) {

        e.preventDefault();

        if (!e.target.id.value) {
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify({
                        nombre: e.target.nombre.value,
                        proveedor: e.target.proveedor.value,
                        categoria: e.target.categoria.value,
                        precio: e.target.precio.value
                    })
                };

                let res = await axios("http://localhost:3000/productos/", options)
                let json = await res.data;

                location.reload();
            } catch (error) {
                
                let message = error.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
            }
        } else {
            try {
                let options = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify({
                        nombre: e.target.nombre.value,
                        proveedor: e.target.proveedor.value,
                        categoria: e.target.categoria.value,
                        precio: e.target.precio.value
                    })
                };

                let res = await axios(`http://localhost:3000/productos/${e.target.id.value}`, options)
                let json = await res.data;

                location.reload();
            } catch (error) {

                let message = error.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
                
            }
        }
    }
})

$d.addEventListener("click", async e => {
    if (e.target.matches(".edit")) {
        $title.textContent = "EDITAR PRODUCTO";
        $form.nombre.value = e.target.dataset.name;
        $form.proveedor.value = e.target.dataset.proveed;
        $form.categoria.value = e.target.dataset.categori;
        $form.precio.value = e.target.dataset.valor;
        $form.id.value = e.target.dataset.id;
    }

    if (e.target.matches(".delete")){
        let confirmacion = confirm("¿Estás seguro que deseas eliminar el elemnto seleccionado?")
        
        if (confirmacion) {
            try {
                
                let options = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    }
                };

                let res = await axios(`http://localhost:3000/productos/${e.target.dataset.id}`, options)
                let json = await res.data;

                location.reload();
            } catch (error) {
                
                let message = error.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
            }
        }
    }
})