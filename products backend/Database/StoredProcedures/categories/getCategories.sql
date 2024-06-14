USE productsDB;
GO

CREATE OR ALTER PROCEDURE getCategories
AS
BEGIN
    SELECT * FROM Categories;
END;
GO
