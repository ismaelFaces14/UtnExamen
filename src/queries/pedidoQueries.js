export const pedidoQueries = {
  getAll: `
   SELECT p.id AS pedido_id, p.fecha, u.usuario
      FROM pedidos p
      JOIN usuarios u ON p.id_usuario = u.id
      ORDER BY p.fecha DESC
  `,
  create: "INSERT INTO pedidos (fecha, id_usuario) VALUES (?, ?)",
};