export const detalleQueries = {
  create: "INSERT INTO detalle (id_pedido, id_producto, cantidad) VALUES (?, ?, ?)",

  totalProductosEnPedido: `
    SELECT p.id AS pedido_id, SUM(d.cantidad) AS total_productos
    FROM detalle d
    JOIN pedidos p ON d.id_pedido = p.id
    WHERE p.id = ?
    GROUP BY p.id
  `,

  detalleDePedido: `
    SELECT pro.nombre, d.cantidad, pro.precio, (d.cantidad * pro.precio) AS subtotal
    FROM detalle d
    JOIN productos pro ON d.id_producto = pro.id
    WHERE d.id_pedido = ?
  `
};
