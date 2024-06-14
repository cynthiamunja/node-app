CREATE TABLE Products (
    ProductID VARCHAR PRIMARY KEY ,
    ProductName VARCHAR(255) NOT NULL,
	ProductPrice int not null,
    CategoryID VARCHAR(255),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);