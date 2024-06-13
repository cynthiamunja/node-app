USE productsDB;
GO

CREATE OR ALTER PROCEDURE addCategories
    @CategoryID VARCHAR(255),
    @CategoryName VARCHAR(255)
AS
BEGIN
    INSERT INTO Categories (CategoryID, CategoryName)
    VALUES (@CategoryID, @CategoryName);
END;
GO
