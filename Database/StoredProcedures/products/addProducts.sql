USE productsDB;
GO

IF OBJECT_ID('addProduct', 'P') IS NOT NULL
    DROP PROCEDURE addProduct;
GO

CREATE PROCEDURE addProduct
    @ProductID VARCHAR(255),
    @ProductName VARCHAR(255),
    @ProductPrice INT,
    @CategoryID VARCHAR(255)
AS
BEGIN
    INSERT INTO Products (ProductID,ProductName, CategoryID, ProductPrice)
    VALUES (@ProductID, @ProductName, @CategoryID,@ProductPrice);
END;
GO
