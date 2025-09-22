const productoQueries = {
    getAll: "SELECT * FROM productos",
    create: "INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)",
    update: "UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?",
    delete: "DELETE FROM productos WHERE id = ?"
};

module.exports = productoQueries;