import { getProducts, postProduct, putProduct, deleteProduct } from "../js/services.js";

const $d = document;
const $table = $d.querySelector(".crud-table");
const $form = $d.querySelector(".crud-form");
const $title = $d.querySelector(".crud-title");
const $template = $d.getElementById("crud-template").content;
const $fragement = $d.createDocumentFragment();

const getAll = async () => {
    let json  =  await getProducts();
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
}

$d.addEventListener("DOMContentLoaded", getAll);


$d.addEventListener("submit", async e => {
    if (e.target === $form) {
        e.preventDefault();
        if (!e.target.id.value) {
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
            let json = await postProduct(options);
            location.reload();
        } else {
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
            let json = await putProduct(e,options);
            location.reload();
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
            let options = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                }
            };
            let json = await deleteProduct(e,options);
            location.reload();
        }
    }
})