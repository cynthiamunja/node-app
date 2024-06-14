USE productsDB;
GO

IF OBJECT_ID('updateProduct', 'P') IS NOT NULL
    DROP PROCEDURE updateProduct;
GO

CREATE PROCEDURE updateProduct
    @ProductID VARCHAR(255),
    @ProductName VARCHAR(255),
    @ProductPrice INT,
    @CategoryID VARCHAR(255)
AS
BEGIN
    UPDATE Products
    SET ProductName = @ProductName,
        CategoryID = @CategoryID,
        ProductPrice=@ProductPrice
    WHERE ProductID = @ProductID;
END;
GO
