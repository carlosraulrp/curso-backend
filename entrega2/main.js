const fs = require('fs')

class contenedor {
    constructor(file){
        this.file = file
    }

    //metodos
    async save(obj){
        try {
            const objects = await this.getAllObjects()
            const lastId = objects.length > 0 ? objects[objects.length -1].id : 0
            const nuevoId = lastId + 1
            const newObj = {id: nuevoId, ...obj}
            objects.push(newObj)
            await this.saveOjects(objects)
            return nuevoId
        } catch (error) {
            throw new Error('error al guardar el objeto')
        }
    }

    async getById(id){
        try {
            const objects = await this.getAllObjects()
            const obj = objects.find((o) => o.id === id)
            return obj || null
        } catch (error) {
            throw new Error ('Error al obter id')
        }
    }

    async getAll(){
        try {
            const objects = await this.getAllObjects()
            return objects
        } catch (error) {
            throw new Error ('Error al obtener los objetos')
        }
    }

    async deleteById(id){
        try {
            let objects = await this.getAllObjects()
            objects = objects.filter((o) => o.id !== id)
            await this.saveOjects(objects)
        } catch (error) {
            throw new Error ('Error al elimiar el objeto')
        }
    }

    async deleteAll(){
        try {
            await this.saveOjects([])
        } catch (error) {
            throw new Error ('Error al eliminar los objetos')
        }
    }

    async getAllObjects(){
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return data ? JSON.parse(data) : []
        } catch (error) {
            return []
        }
    }

    async saveOjects(objects){
        try {
            await fs.promises.writeFile(this.file, JSON.stringify(objects, null, 2))
        } catch (error) {
            throw new Error ('Error al guardar objetos')
        }
    }

}

const main = async () =>{
    const productos = new contenedor ('productos.txt')

   /*  const id = await productos.save(
        {
            title: "producto 3",
            price: 100
        }
    )

    console.log("objeto guardado con ID:", id) */

    //obtener todos los objetos 
    const getAllObjects = await productos.getAll()
    console.log("objetos guardados", getAllObjects)
    
    //eliminar un objeto
    await productos.deleteById(1)

}

main().catch((error) => console.error(error))



