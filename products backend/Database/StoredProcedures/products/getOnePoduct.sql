USE productsDB;
GO

IF OBJECT_ID('getOneProduct', 'P') IS NOT NULL
    DROP PROCEDURE getOneProduct;
GO

CREATE PROCEDURE getOneProduct
    @ProductID VARCHAR(255)
AS
BEGIN
    SELECT * FROM Products WHERE ProductID = @ProductID;
END;
GO
