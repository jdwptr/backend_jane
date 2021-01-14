-- SELECT DISTINCT = membuat data yg duplikat menjadi satu jenis
select * from employees;
select lastName from employees;
select distinct lastName from employees;

-- SELECT DISTINCT UNUTK 2 COLUMN
select * from customers;
select distinct state, city from customers where state is not null;

-- GROUP BY => grouping data (ada temennya si group by ini, biasanya si AGGREGATE FUNCTION)
select * from customers;
select customerName, country, count(*) as totalCustomersPerCountry from customers
group by country
order by country;

select * from orders;
select status, count(*) as totalPerStatus from orders
group by status
order by status;

select * from orderdetails;
select orderNumber, sum(quantityOrdered) as totalQuantity from orderdetails
group by orderNumber
order by orderNumber;

-- LATIHAN => get total data user, berdsrkan salesRepEmployeeNumber, dan count total customers
select * from customers;
select salesRepEmployeeNumber, count(*) as totalCustomers from customers
group by salesRepEmployeeNumber
order by salesRepEmployeeNumber;

-- LATIHAN => hitung totalpembelanjaan tiap orderNumber
select * from orderdetails;
select orderNumber,  sum(quantityOrdered) as totalQuantity, sum(priceEach*quantityOrdered) as totalBelanja from orderdetails
group by orderNumber
order by orderNumber;

-- HAVING => conditional search, biasanya digunakan setelah group by, kalo gada group by, dia dianggap where biasa
select * from orderdetails;
select orderNumber, sum(quantityOrdered) as totalQuantity, sum(priceEach*quantityOrdered) as totalBelanja from orderdetails
group by orderNumber
having totalQuantity > 200 or totalBelanja > 1000;

select * from customers;
select salesRepEmployeeNumber, count(*) as totalCustomers from customers where salesRepEmployeeNumber is not null
group by salesRepEmployeeNumber
having totalCustomers > 6
order by salesRepEmployeeNumber;

-- hitung total customer tiap negara & cari country yg rata rata creditLimit nya diatas 50000
select * from customers;
select country, count(*) as totalCustomerPerCountry,
avg(creditLimit) as avgPerCountry from customers
group by country
having avgPerCountry > 50000
order by country;

-- SUB QUERY => (query 1(query2 (query 3))), EXECUTION ORDER => query3, query2, query1
-- Tampilkan rata rata creditLimit tiap neg, cari country yg rata - rata credit limitnya diatas rata rata creditLimit USA

-- 1st step: cari dulu rata rata creditLimit USA
select country, avg(creditLimit) as avgUSA from customers
where country='USA';
select country, avg(creditLimit) as avgUSA from customers
where country='USA';

-- 2ndstep: stlh dapat rata rata USA, maka kita gunakan SUB QUERY
select * from customers;
select country, count(country) as totalCustomerPerCountry,
avg(creditLimit) as avgPerCountry from customers
group by country
having avgPerCountry > (
	select avg(creditLimit) as avgUSA from customers
	where country='USA'
)
order by avgperCountry;

-- Tampilkan rata rata creditLimit tiap neg, hitung ada brp country yg rata - rata credit limitnya diatas rata rata creditLimit USA
-- Steps
select count(*) as Result from (
	select country, count(country) as totalCustomerPerCountry,
	avg(creditLimit) as avgPerCountry from customers
	group by country
	having avgPerCountry > (
		select avg(creditLimit) as avgUSA from customers
		where country='USA'
	)
	order by avgperCountry
) as listCreditLimit;

-- JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN, CROSS JOIN
-- INNER JOIN
select * from employees;
select * from offices;

-- INNER JOIN WITH ON
select e.employeeNumber, concat(e.firstName, ' ', e.lastName) as name, e.email, e.officeCode, o.city, o.phone from employees e
inner join offices o
on e.officeCode = o.officeCode;

-- kalo nama kolom sama, bisa pake using
-- INNER JOIN WITH USING
select e.employeeNumber, concat(e.firstName, ' ', e.lastName) as name, e.email, e.officeCode, o.city, o.phone from employees e
inner join offices o
using (officeCode);

-- PINDAH DATABASE --
CREATE TABLE members (
    member_id INT AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY (member_id)
);

CREATE TABLE committees (
    committee_id INT AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY (committee_id)
);

INSERT INTO members(name)
VALUES('John'),('Jane'),('Mary'),('David'),('Amelia');

INSERT INTO committees(name)
VALUES('John'),('Mary'),('Amelia'),('Joe');

select * from committees;
select * from members;

-- INNER JOIN WITH ON
select * from members m
inner join committees c
on m.name = c.name;

-- INNER JOIN WITH USING
select * from members m
inner join committees c
using (name);

-- LEFT JOIN = kalau ada data yg tdk sama, datatdk dibuang, tapi data di nullkan
-- LEFT JOIN = TABLE UTAMA DI KIRI
select * from members m
left join committees c
on m.name = c.name;

-- RIGHT JOIN = sama spt left join, hanya TABEL UTAMA DI KANAN (Kebalikan left join)
select * from members m
right join committees c
on m.name = c.name;

-- CROSS JOIN = tdk membutuhkan condition, tiap item dr table kiri, akan dipasangkan dengan tiap item di tabel sebelah
select * from members m
cross join committees c;

-- tampilkan data customers yang ada di negara USA yang mempunyai credit limit diatas rata2 credit limit customers di Germany
select * from customers;
select country, avg(creditLimit) as avgGermany from customers where country='Germany';

select customerName, creditLimit from customers where country='USA'
group by creditLimit
having creditLimit > (
	select avg(creditLimit) as avgGermany from customers where country='Germany'
) 
order by creditLimit;

-- Join tabel customers sama customers employee
select cu.salesRepEmployeeNumber, cu.customerName, concat(em.firstName, ' ', em.lastName) as sales_name from customers cu
join employees em
on em.employeeNumber = cu.salesRepEmployeeNumber;

-- tampilkan data orderdetails, hit total quantity dan total price per order number
-- dengan ketentuan total price diatas rata2 semua total price per order number dan
-- total quantity diatas ratarata semua total quantity per number
-- , sum(priceEach*quantityOrdered) as totalPrice 

select * from orderdetails;
select orderNumber, sum(quantityOrdered) as totalQuantity from orderdetails
group by orderNumber;
-- MASUKKAN KEBAWAH

select avg(totalQuantity) as avgTotalQty from (
	select sum(quantityOrdered) as totalQuantity from orderdetails
	group by orderNumber
) listTotalQty;

select * from orderdetails;
select orderNumber, sum(priceEach*quantityOrdered) as totalPrice from orderdetails
group by orderNumber;
-- MASUKKAN KEBAWAH

select avg(totalPrice) from (
	select sum(priceEach*quantityOrdered) as totalPrice from orderdetails
	group by orderNumber
) listTotalPrice;

-- avg qty 323, avg price 29460
select orderNumber, sum(quantityOrdered) as totalQuantity, sum(priceEach*quantityOrdered) as totalPrice from orderdetails
group by orderNumber
having totalQuantity >= (
	select avg(totalQuantity) as avgTotalQty from (
		select sum(quantityOrdered) as totalQuantity from orderdetails
		group by orderNumber
	) listTotalQty
) and totalPrice >= (
	select avg(totalPrice) from (
		select sum(priceEach*quantityOrdered) as totalPrice from orderdetails
		group by orderNumber
	) listTotalPrice
);

select count(*) as listTotal from (
	select orderNumber, sum(quantityOrdered) as totalQuantity, sum(priceEach*quantityOrdered) as totalPrice from orderdetails
	group by orderNumber
	having totalQuantity >= (
		select avg(totalQuantity) as avgTotalQty from (
			select sum(quantityOrdered) as totalQuantity from orderdetails
			group by orderNumber
		) listTotalQty
	) and totalPrice >= (
		select avg(totalPrice) from (
			select sum(priceEach*quantityOrdered) as totalPrice from orderdetails
			group by orderNumber
		) listTotalPrice
	)
) listTotal;