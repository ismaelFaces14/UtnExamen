export const usuarioQueries = {
  getAll: `
    SELECT id, usuario, rol
    FROM usuarios
  `,

  getById: `
    SELECT id, usuario, rol
    FROM usuarios
    WHERE id = ?
  `,

  create: "INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)",
  update: "UPDATE usuarios SET usuario = ?, password = ?, rol = ? WHERE id = ?",
  delete: "DELETE FROM usuarios WHERE id = ?",

  usuariosConMasPedidos: `
    SELECT u.usuario, COUNT(p.id) AS total_pedidos
    FROM usuarios u
    JOIN pedidos p ON u.id = p.id_usuario
    GROUP BY u.id
    ORDER BY total_pedidos DESC
  `
};