use classicmodels;
select * from customers;
-- filtering data
select customerNumber, customerName, creditLimit from customers;

-- order data
-- ascending
select customerNumber, customerName, creditLimit from customers order by customerName;
-- descending
select customerNumber, customerName, creditLimit from customers order by customerName desc;

-- where = filtering dengan condition
select customerNumber, customerName, country from customers where country= 'USA' order by customerName;
select customerNumber, customerName, city from customers where city= 'San Francisco' order by customerName;

-- WHERE ITU BANYAK KONDISI - AND OR BETWEEN IN LIKE
-- where + and
select customerNumber, customerName, country, salesRepEmployeeNumber from customers where country='USA' and salesRepEmployeeNumber=1166;
select * from products;
select productCode, productName, productLine, productScale from products where productLine='Vintage Cars'
and productScale='1:18' order by productName;

-- where + or
select productCode, productName, productLine, productScale from products where productLine='Vintage Cars'
or productScale='1:18';
select customerNumber, customerName, country, salesRepEmployeeNumber from customers where country='USA' or salesRepEmployeeNumber=1166;
select customerNumber, customerName, country from customers where country ='USA' or country='France';

-- where + between
select * from employees;
select * from employees where officeCode between 1 and 3;
select * from products where buyPrice between 0 and 50.00 order by buyPrice;

-- where + in
select customerNumber, customerName, country from customers where country in ('USA', 'France');
select productCode, productName, productLine from products where productLine in ('Vintage Cars', 'Classic Cars');

-- where + like
select * from employees;
select * from employees where lastName like 'b%'; -- cari yg lasname nya huruf awalnya b
select * from employees where lastName like '%pson'; -- cari yg huruf belakang nya pson
select * from employees where lastName like '%p%'; -- fullsearch (mau P di awal atau diakhir, tetep masuk)

-- where + not
-- not in
select * from products where productLine not in ('Classic Cars', 'Vintage Cars');
select * from employees where lastName not like 'bo%'; -- cari yg lastname nya huruf awalnya bo
select * from employees where officeCode not between 1 and 3;

-- isNull and notNull
select * from customers where state is null;
select * from customers where state is not null;

-- MATH OPERATOR (<, >, =, <=, >=, +, -, *, /)
select customerNumber, customerName, creditLimit from customers where creditLimit > 100000;
select customerNumber, customerName, creditLimit from customers where creditLimit < 100000;
select customerNumber, customerName, creditLimit from customers where creditLimit = 0;
-- sisa limit untuk customer ditentukan mask nya 200000
-- jd sisa limit = 200000 - amount
select *, 200000 - amount as sisa_Limit from payments;

-- misal mau ngasih credit limit tambahan 50000
select customerNumber, customerName, creditLimit, 50000 + creditLimit as final_credit_limit from customers;
select customerNumber, customerName, creditLimit, 2 * creditLimit as double_credit_limit from customers;
select customerNumber, customerName, creditLimit, creditLimit / 2 as half_credit_limit from customers;

-- LIMIT & OFFSET
select * from offices limit 5;
select * from offices limit 3 offset 2; -- cara pertama
select * from offices limit 3 ,2; -- cara kedua, digit pertama jd offset, digit kedua jd limit
select customerNumber, customerName, creditLimit from customers where country in ('USA', 'France') limit 10;

-- dapatkan data dari customers, ambil kolom city, state sm country aja, counrtynya di USA &France,order by customername
-- limit 5 dimulai dr data ke 3
select customerName ,city, state, country from customers where country in ('USA', 'France')
order by customerName limit 5 offset 3;

-- get data customer salesRepEmployee !==null, country germany, nama mengandung huruf n, urutkan berdasarkan nama
select * from customers
where salesRepEmployeeNumber is not null
and country in ('Germany')
and customerName like '%n%'
order by customerName;

-- get data customer salesRepEmployee != null, credit limit > 60000, urutkan berdasarkan credit limit
-- di kasih limit 4 data dimulai dari data ke 10
select * from customers
where salesRepEmployeeNumber is not null
and creditLimit > 60000
order by creditLimit
limit 4 offset 10;

-- AGGREGATE FUNCTION  => CONCAT, COUNT, MIN, MAX, AVG, SUM
-- CONCAT -> menyambung antara satu kolom dgn kolom yg lain
select * from customers;
select customerNumber, customerName, concat(contactLastName, ', ', contactFirstName) as fullName from customers having fullName like '%z%';

-- COUNT =  menghitung total keseluruhan data
select count(*) as total_offices from offices;

-- MIN = minimal, mencari data rendah
select * from payments;
select min(amount) as jumlahPembelianTerendah from payments;
select max(amount) as jumlahPembelianTertinggi from payments;

-- AVG = average, mencari rata - rata data
select avg(amount) as rataRata from payments;

-- SUM = mentotal semua jumlah data
select sum(amount) as totalSemuaPayment from payments;

-- EXAMPLE
-- mencari total quantity pembelian dari order details untuk order number 10100
select sum(quantityOrdered) as totalQtyOrdered10100 from orderdetails
where orderNumber=10100;

-- beteween date
select * from orders where shippedDate between CAST('2003-01-01' AS DATE) AND CAST('2003-01-31' AS DATE);

