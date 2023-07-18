class ProductManager{
    constructor(){
        this.products = []
        this.nextId = 1
    }
    addProduct(product){
        if(!this.isProductValid(product)){
            console.log("producto no es valido")
            return
        }
        if(this.isCodeDuplicate(product.code)){
            console.log("codigo del producto repetido o ya esta siendo utilizado")
            return
        }
        product.id = this.nextId++
        this.products.push(product)
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const product = this.products.find((p) => p.id === id)
        if(product){
            return product
        }else{
            console.log("Error: producto no encontrado")
        }
    }

    isProductValid(product){
        return(
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        )
    }
    isCodeDuplicate(code){
        return this.products.some((p) => p.code === code)
    }


}

const productManager = new ProductManager()

//agrego productos

productManager.addProduct({
    title: "Producto 1",
    description: "Descripcion del producto 1",
    price:500,
    thumbnail:"https://www.oxfordstore.cl/media/catalog/product/cache/e2b750e3a1f8d67cf5cdd4eb0e9445ad/l/a/lava_dome_opt_3.jpg",
    code: "p001",
    stock: 5
})

productManager.addProduct({
    title: "Producto 2",
    description: "Descripcion del producto 2",
    price:999,
    thumbnail:"https://www.oxfordstore.cl/media/catalog/product/cache/e2b750e3a1f8d67cf5cdd4eb0e9445ad/h/o/honzo_3.jpg",
    code: "p002",
    stock: 3
})
productManager.addProduct({
    title: "Producto 2",
    description: "Descripcion del producto 2",
    price:999,
    thumbnail:"https://www.oxfordstore.cl/media/catalog/product/cache/e2b750e3a1f8d67cf5cdd4eb0e9445ad/h/o/honzo_3.jpg",
    code: "p002",
    stock: 3
})

//obtener los productos

const productos = productManager.getProducts()
//console.log(productos)

//por id

const productosId = productManager.getProductById(5)
console.log(productosId)
