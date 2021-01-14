-- BELAJAR LG ONE TO ONE, ONE TO MANY, MANY TO MANY
-- https://stackoverflow.com/questions/7296846/how-to-implement-one-to-one-one-to-many-and-many-to-many-relationships-while-de

-- HIERARCHIAL DATABASE
-- https://www.mysqltutorial.org/mysql-adjacency-list-tree/
-- merujuk ke tabel sendiri, contih: classicmodels.employees
-- DATA BERTINGKAT, 
-- 1. ELECTRONICS (TOP NODE)
-- 2. LAPTOP PC, CAMERAS PHOTO, PHONE ACC (Children of Electronic Node)
-- 3. LAPTOP, PC, CAMERAS, SMARTPHONE, BATTERY, HEADSET, SCREEN PROTECTOR
-- 4. ANDROID, IOS, OTHER SMARTPHONE

CREATE TABLE category (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  parent_id int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (parent_id) REFERENCES category (id) 
    ON DELETE CASCADE ON UPDATE CASCADE
);

select * from category;
-- truncate category;

INSERT INTO category(title,parent_id) 
VALUES('Electronics',NULL);

INSERT INTO category(title,parent_id) 
VALUES('Laptops & PC',1);

INSERT INTO category(title,parent_id) 
VALUES('Laptops',2);
INSERT INTO category(title,parent_id) 
VALUES('PC',2);

INSERT INTO category(title,parent_id) 
VALUES('Cameras & photo',1);
INSERT INTO category(title,parent_id) 
VALUES('Camera',5);

INSERT INTO category(title,parent_id) 
VALUES('Phones & Accessories',1);
INSERT INTO category(title,parent_id) 
VALUES('Smartphones',7);

INSERT INTO category(title,parent_id) 
VALUES('Android',8);
INSERT INTO category(title,parent_id) 
VALUES('iOS',8);
INSERT INTO category(title,parent_id) 
VALUES('Other Smartphones',8);

INSERT INTO category(title,parent_id) 
VALUES('Batteries',7);
INSERT INTO category(title,parent_id) 
VALUES('Headsets',7);
INSERT INTO category(title,parent_id) 
VALUES('Screen Protectors',7);

-- FINDING ROOT NODE
select * from category;
select * from category where parent_id is null;

-- FINDING CHILDREN NODE, cari anak dr node tertentu
select * from category;
select * from category where parent_id=7;

-- FINDING LEAF NODES
select c1.id, c1.title, c1.parent_id from category c1
left join category c2
on c2.parent_id = c1.id
where c2.id is null;

-- QUERYING THE WHOLE TREE
-- kalo mau recursive, ini merupakan titik awalnya
SELECT id, title, title as path
FROM category
WHERE parent_id IS NULL;
    
-- SELECT c.id, c.title, CONCAT(cp.path, ' > ', c.title)
-- FROM category_path AS cp JOIN category AS c
-- ON cp.id = c.parent_id;

WITH RECURSIVE category_path (id, title, path) AS
(
	SELECT id, title, title as path								-- TITIK AWAL RECURSIVE
    FROM category												-- TITIK AWAL RECURSIVE
    WHERE parent_id IS NULL										-- TITIK AWAL RECURSIVE
    
	UNION ALL													-- TITIK AWAL DIGABUNG DGN RECURSIVE QUERY BERIKUTNYA
  
	SELECT c.id, c.title, CONCAT(cp.path, ' > ', c.title)		-- RECURSIVE QUERY
	FROM category_path AS cp JOIN category AS c					-- RECURSIVE QUERY
	ON cp.id = c.parent_id										-- TERMINATION CONDITION
)
SELECT * FROM category_path										-- PEMANGGILAN HASIL RECURSIVE
ORDER BY path;

-- RECURSIVE CTE 
-- https://www.mysqltutorial.org/mysql-recursive-cte/

WITH RECURSIVE cte_count (n) 
AS (
      SELECT 1					-- ANCHOR MEMBER
      
      UNION ALL
      
      SELECT n + 1 				-- RECURSIVE MEMBER
      FROM cte_count 			-- RECURSIVE MEMBER
      
      WHERE n < 3				-- TERMINATION CONDITION
    )
SELECT n 						-- PEMANGGILAN QUERY
FROM cte_count;