// Modificar

const fs = require('fs');
const path = require('path');
// Recibo por parámetro la entidad para reutilizarlo


const modelController = (name) => {
    console.log('entre al modelo de Mercado')
    console.log(name)
    console.log(path.resolve(__dirname, '../data/', `${name}.json`))
    return {
        tablePath: path.resolve(__dirname, '../data/', `${name}.json`),

        // Leo el archivo Json y lo transformo en Array de objeto literal     
        readFile: () => {
            console.log('Leo el archivo')
            let tableContents = fs.readFileSync(this.tablePath, 'utf-8');
            return JSON.parse(tableContents) || [];
        },
        // Grabo el array que recibo por parámetro y lo paso a formato Json
        writeFile: (contents) => {
            let tableContents = JSON.stringify(contents, null, ' ');
            fs.writeFileSync(this.tablePath, tableContents);
        },
        // Averiguo el próximo id
        nextId: () => {
            let rows = this.readFile();
            let lastRow = rows.pop();

            return lastRow.id ? ++lastRow.id : 1;
        },
        // Leo todos los registros del archivo
        all: () => {
            
            return this.readFile();
        },
        // Busco por id
        find: (id) => {
            let rows = this.readFile();
            console.log(" --- por el find")
            return rows.find(i => i.id == id);
        },

        // agrego un registro que paso por parámetro
        create: (row) => {
            let rows = this.readFile();
            // Averiguo el último id y lo actualizo
            row.id = this.nextId();
            // Agrego en el array
            rows.push(row);
            // grabo el array en el archivo
            this.writeFile(rows);
            //Retorno el último id generado
            return row.id;
        },
        // Actualizo el archivo
        update: (row) => {
            let rows = this.readFile();

            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            });
            // escribo el archivo
            console.log(updatedRows)
            this.writeFile(updatedRows);

            return row.id;
        },

        // Elimino el registro en el archivo según un id    
        delete: (id) => {

            console.log('Elimino :' + id)
            let rows = this.readFile();
            let updatedRows = rows.filter(row => {
                return row.id != id;
            });

            this.writeFile(updatedRows);
        },

        visited: () => {
            let rows = this.readFile();
            console.log(" --- filtro los visitados")
            
            const visitados = rows.filter(i => i.category == 'visited')
            console.log(" --- ESTOY ----------------------")
            console.log(visitados)
            return visitados 

        },

        inSale: () => {
            let rows = this.readFile();
            console.log(" --- filtro los que están para venta")
  
            const enVenta = rows.filter(i => i.category == 'in-sale')
            console.log(" --- ESTOY EN VENTA--------------------")
            console.log(enVenta)
            return enVenta

        },

        findFirstByField:(text) => {
            let rows = this.all();
    
            let elementFound = rows.find(element => element.id == text);
            return elementFound;
        },

        findAllByField:(text) => {
            let rows = this.all();
            let allElementsFound = rows.filter(element => element.estado == text);
            return allElementsFound;
        }



       



    }
}

module.exports = modelController