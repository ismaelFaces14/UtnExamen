export const pedidoQueries = {
  getAll: `
    SELECT p.id AS pedido_id, p.fecha, u.usuario
    FROM pedidos p
    JOIN usuarios u ON p.id_usuario = u.id
    ORDER BY p.fecha DESC
  `,

  getById: `
    SELECT p.id AS pedido_id, p.fecha, u.usuario
    FROM pedidos p
    JOIN usuarios u ON p.id_usuario = u.id
    WHERE p.id = ?
  `,

  create: "INSERT INTO pedidos (fecha, id_usuario) VALUES (?, ?)",
  update: "UPDATE pedidos SET fecha = ?, id_usuario = ? WHERE id = ?",
  delete: "DELETE FROM pedidos WHERE id = ?"
};