CREATE DATABASE ProductManagementDB;

USE ProductManagementDB;


CREATE TABLE Products
(
    ProductId INT IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_Products PRIMARY KEY,
    ProductName NVARCHAR(100) NOT NULL,
    Category VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT NOT NULL,
);
GO

INSERT INTO dbo.Products (ProductName, Category, Price, StockQuantity)
VALUES
    ('Laptop',   'Electronics', 55000.00, 10),
    ('Keyboard', 'Electronics',  1500.00,  3),
    ('Rice Bag', 'Grocery',       900.00, 20),
    ('T-Shirt',  'Clothing',      799.00,  7),
    ('Notebook', 'Other',          75.00,  2);
GO

SELECT * FROM products;

DELETE FROM Products
WHERE ProductId = 4;









SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE';

EXEC sp_help 'spt_fallback_db';