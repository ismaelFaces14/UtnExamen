Hola, Este es el proyecto de examen parcial de programacion IV.

Proyecto de una API REST desarrolada con node y express, perimite gestionar recursos
de usuarios, productos y pedidos. Incluye conexion y build de base de datos MySQL con JWT,
y documentacion de endpoints

tecnologias utilizadas:
  Node.js 
  Express 
  MySQL 
  bcryptjs (para encriptar contraseñas)
  jsonwebtoken (para autenticación)
  dotenv (variables de entorno)
  wait-port (esperar que la DB esté lista)

1. Clonar repositorio
     git clone https://github.com/ismaelFaces14/UtnExamen.git
     cd UtnExamen
2. Instalar dependencias
     npm install

3. Abrir docker.
     Comandos utiles
     Desde terminal situados en carpeta de proyecto utilizar siguientes comando
         docker-compose up -d
         npm start (si hay error, esperar y volver a ejecutar npm start).
      Asi su proyecto estara levantado y preparado para recibir peticiones.

ENDPOINTS DISPONIBLES: 
  endpoints de usuarios(Solo superAdmin)
    GET /usuarios --Obtiene todos los usuarios
    GET /usuarios/:id -- obtiene usuario por id
    POST /usuarios --crear nuevo usuario(usuario,password,rol)
    PUT /usuarios/:id --Actualizar usuario
    DELETE /usuarios/:id --eliminar usuario
    GET /usuarios/reporte/mas-pedidos --devuelve los usuarios con pedidos

  Endpoints de productos(Solo superAdmin o admin)
    GET /productos --Obtiene productos
    POST /productos --crea producto
    PUT  /productos/:id --Actualiza producto
    DELETE  /delete/:id --Elimina producto

  Endpoints de pedidos(user,admin,superAdmin)
    GET /pedidos --Obtener pedidos
    GET /pedidos/:id -- Detalle de pedido por id
    POST /pedidos -- crea pedido(solo user)
    GET /pedidos/reporte/detalle/:id --devuelve el total de pedido en pedido ID

  Endpoints de auth
      POST /auth/login --Permite loguearse a usuarios
      POST /auth/register --Permite registrarse, solo como usuario

Al iniciar el proyecto se crea un superAdmin
es necesario loguearse con los siguientes datos:
  {
    "usuario": "super",
    "password": "1234"
  }
O si quiere registrarse como usuario cree el usuario en register
  {
    "usuario": "TUnombreusuario",
    "password": "TUpassusuario"
  }

    

     
