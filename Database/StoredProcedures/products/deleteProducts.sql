USE productsDB;
GO

IF OBJECT_ID('deleteProduct', 'P') IS NOT NULL
    DROP PROCEDURE deleteProduct;
GO

CREATE PROCEDURE deleteProduct
    @ProductID VARCHAR(255)
AS
BEGIN
    DELETE FROM Products WHERE ProductID = @ProductID;
END;
GO
