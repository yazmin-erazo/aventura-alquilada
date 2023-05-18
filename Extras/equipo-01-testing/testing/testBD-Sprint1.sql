-- Consulta para testear la función de agregar producto:
INSERT INTO product VALUES (default, "nuevo_producto", 10, "producto1", null, "test agregar producto 1", 100.00, "smoll", "new", 1);
INSERT INTO product VALUES (default, "nuevo_producto2", 20, "producto2", null, "test agregar producto 2", 200.00, "smoll", "new", 2); 
INSERT INTO product VALUES (default, "nuevo_producto3", 30, "producto3", "male", "test agregar producto 3", 300.00, "high", "new", 3); 
INSERT INTO product VALUES (default, "nuevo_producto4", 40, "producto4", null, "test agregar producto 4", 400.00, "smoll", "used", 4); 
INSERT INTO product VALUES (default, "nuevo_producto5", 50, "producto5", null, "test agregar producto 5", 500.00, "medium", "used", 5); 
INSERT INTO product VALUES (default, "nuevo_producto6", 60, "producto6", "femme", "test agregar producto 6", 600.00, "36", "new", 6); 
INSERT INTO product VALUES (default, "nuevo_producto7", 70, "producto7", null, "test agregar producto 7", 700.50, "4 personas", "used", 7); 
 
-- Consulta para testear la función de eliminar producto:
DELETE FROM product where id=1;
DELETE FROM product where id=5;
DELETE FROM product where id=2;
DELETE FROM product where id=7;