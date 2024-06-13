USE productsDB;
GO

IF OBJECT_ID('getProducts', 'P') IS NOT NULL
    DROP PROCEDURE getProducts;
GO

CREATE PROCEDURE getProducts
AS
BEGIN
    SELECT * FROM Products;
END;
GO
