USE productsDB;
GO

CREATE OR ALTER PROCEDURE deleteCategory
    @CategoryID VARCHAR(255)
AS
BEGIN
    DELETE FROM Categories WHERE CategoryID = @CategoryID;
END;
GO
