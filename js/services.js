export async function getProducts (){
    try {
        let res = await axios.get("https://raw.githubusercontent.com/jeco880522/workshoproduct/productos")
        let json = await res.data;
        return json;
    } catch (error) {
        let message = error.statusText || "Ocurrió un error";
        $form.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
    }
}

export async function postProduct(options){
    try {
        let res = await axios("http://localhost:3000/productos/", options)
        let json = await res.data;
        return json;
    } catch (error) {
        let message = error.statusText || "Ocurrió un error";
        $form.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
    }
}

export async function putProduct(e,options){
    try {
        let res = await axios(`http://localhost:3000/productos/${e.target.id.value}`, options)
        let json = await res.data;
        return json;
    } catch (error) {
        let message = error.statusText || "Ocurrió un error";
        $form.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
        
    }
}

export async function deleteProduct(e,options){
    try {
        let res = await axios(`http://localhost:3000/productos/${e.target.dataset.id}`, options)
        let json = await res.data;
        return json;
    } catch (error) {
        let message = error.statusText || "Ocurrió un error";
        $form.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
    }
}
