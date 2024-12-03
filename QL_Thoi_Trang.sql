use management_clothing;
drop database management_clothing;
select * from customer;
insert into customer(full_name, phone_number, address, user_name, password, role)
values ('Nguyễn Thành Công', '0901234567', 'Châu Đốc, An Giang', 'thanhcong', 'cong123', 'USER');
insert into customer(full_name, phone_number, address, user_name, password, role)
values ('Trương Tân Thành', '0912345678', 'Cai Lậy, Tiền Giang', 'tanthanh', 'thanh01', 'USER');
insert into customer(full_name, phone_number, address, user_name, password, role)
values ('Thái Bảo Trân', '0938765432', 'Quận 5, Thành Phố Hồ Chí Minh', 'baotran', 'tran13', 'USER');
insert into customer(full_name, phone_number, address, user_name, password, role)
values ('Đặng Thành An', '0987654321', 'Ninh Kiều, Cần Thơ', 'thanhan', 'annnn', 'USER');
insert into customer(full_name, phone_number, address, user_name, password, role)
values ('Cao Quốc Đạt', '0891122334', 'Bình Thủy, Cần Thơ', 'quocdat', 'dat875', 'USER');

select * from admin;
insert into admin(full_name, phone_number, address, gender, user_name, password, role)
values('Nguyễn Văn Hùng', '0905123456', 'An Giang', 'Nam', 'vanhung','hung56', 'ADMIN');
insert into admin(full_name, phone_number, address, gender, user_name, password, role)
values('Lê Thị Mai', '0987345678', 'An Giang', 'Nữ', 'thimai', 'mai678', 'ADMIN');
insert into admin(full_name, phone_number, address, gender, user_name, password, role)
values('Phạm Quang Duy', '0912765432', 'An Giang', 'Nam', 'quangduy', 'duy432', 'ADMIN');
insert into admin(full_name, phone_number, address, gender, user_name, password, role)
values('Trần Thùy Trang', '0931987654', 'An Giang', 'Nữ', 'thuytrang','trang54', 'ADMIN');
insert into admin(full_name, phone_number, address, gender, user_name, password, role)
values('Hoàng Minh Tuấn', '0886452310', 'An Giang', 'Nam', 'minhtuan', 'tuan10', 'ADMIN');

select * from product_category;
delete from product_category;
insert into product_category(name)
values('Áo sơ mi');
insert into product_category(name)
values('Quần thun');
insert into product_category(name)
values('Đồ bộ');
insert into product_category(name)
values('Áo thun');
insert into product_category(name)
values('Áo khoác');
insert into product_category(name)
values('Mũ');

select * from invoice;
delete from invoice;
insert into invoice(customer_id, total_amount, order_date, status)
values(1, 200000, '2024-12-25', "Đã hoàn thành");
insert into invoice(customer_id, total_amount, order_date, status)
values(2, 450000, '2024-12-25', "Đã hoàn thành");
insert into invoice(customer_id, total_amount, order_date, status)
values(3, 200000, '2024-12-25', "Đã hoàn thành");
insert into invoice(customer_id, total_amount, order_date, status)
values(4, 500000, '2024-12-25', "Đã hoàn thành");
insert into invoice(customer_id, total_amount, order_date, status)
values(5, 600000, '2024-12-25', "Đã hoàn thành");
insert into invoice(customer_id, total_amount, order_date, status)
values(1, 200000, '2024-12-26', "Đã hoàn thành");


select * from product;
delete from product w;
DELETE FROM product WHERE name IS NULL;

insert into product(name, price, category_id, add_date)
values('Áo sơ mi họa tiết nấm',100000, 1, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Áo sơ mi nhiều họa tiết', 100000, 1, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Đồ bộ họa tiết bông', 250000, 3, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Áo sơ mi họa tiết hoa', 200000, 1, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Áo thun cổ điển', 200000, 4, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Áo sơ mi basic', 100000, 1, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Áo sơ mi họa tiết lá', 100000, 1, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Quần thun họa tiết bông', 200000, 2, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Áo thun trắng hoa', 100000, 4, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Áo sơ mi hoa', 100000, 1, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Áo sơ mi trắng xanh', 200000, 1, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Áo khoác kiểu jacket', 200000, 5, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Mũ họa tiết hoa', 100000, 6, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Áo khoác hình chú sóc', 200000, 5, '2024-12-03');
insert into product(name, price, category_id, add_date)
values('Mũ tròn', 100000, 6, '2024-12-03');

select * from invoice_details;
delete from invoice_details;
insert into invoice_details(invoice_id, product_id, quantity, total_price, size_name) 
values(1, 1, 1, 100000, 'M');
insert into invoice_details(invoice_id, product_id, quantity, total_price, size_name) 
values(1, 2, 1, 100000, 'L');
insert into invoice_details(invoice_id, product_id, quantity, total_price, size_name) 
values(2, 4, 1, 200000, 'XL');
insert into invoice_details(invoice_id, product_id, quantity, total_price, size_name) 
values(2, 3, 1, 250000, 'XL');
insert into invoice_details(invoice_id, product_id, quantity, total_price, size_name) 
values(3, 6, 2, 200000, 'M');
insert into invoice_details(invoice_id, product_id, quantity, total_price, size_name) 
values(4, 13, 3, 300000, 'M');
insert into invoice_details(invoice_id, product_id, quantity, total_price, size_name) 
values(4, 2, 2, 200000, 'L');
insert into invoice_details(invoice_id, product_id, quantity, total_price, size_name) 
values(5, 1, 2, 200000, 'L');
insert into invoice_details(invoice_id, product_id, quantity, total_price, size_name) 
values(5, 9, 2, 200000, 'M');
insert into invoice_details(invoice_id, product_id, quantity, total_price, size_name) 
values(6, 8, 1, 200000, 'XL');




select * from inventory;
delete from inventory;
insert into inventory(product_id, quantity, size_id)
values(1, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(1, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(1, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(2, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(2, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(2, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(3, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(3, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(3, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(4, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(4, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(4, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(5, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(5, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(5, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(6, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(6, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(6, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(7, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(7, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(7, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(8, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(8, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(8, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(9, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(9, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(9, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(10, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(10, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(10, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(11, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(11, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(11, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(12, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(12, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(12, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(13, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(13, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(13, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(14, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(14, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(14, 50, 3);
insert into inventory(product_id, quantity, size_id)
values(15, 50, 1);
insert into inventory(product_id, quantity, size_id)
values(15, 50, 2);
insert into inventory(product_id, quantity, size_id)
values(15, 50, 3);

select * from size;
insert into size(name)
values('M');
insert into size(name)
values('L');
insert into size(name)
values('XL');

select * from promotion;
insert into promotion(discount_percentage, name, start_date, end_date)
values(10, 'Giảm 10% cho đơn hàng từ 500.000 VND', '2024-12-02', '2024-12-10');
insert into promotion(discount_percentage, name, start_date, end_date)
values(20, 'Giảm 20% cho đơn hàng từ 800.000 VND', '2024-12-20', '2024-12-25');
insert into promotion(discount_percentage, name, start_date, end_date)
values(0, 'Mua một tặng một sản phẩm cùng loại', '2024-12-30', '2025-01-01');

select distinct(product.name), promotion.discount_percentage from promotion_product JOIN product ON product_id
JOIN promotion ON promotion_id;
select * from promotion_product;
insert into promotion_product(product_id, promotion_id)
values(1, 2);
insert into promotion_product(product_id, promotion_id)
values(2, 2);
insert into promotion_product(product_id, promotion_id)
values(3, 2);
insert into promotion_product(product_id, promotion_id)
values(4, 2);
insert into promotion_product(product_id, promotion_id)
values(5, 2);
insert into promotion_product(product_id, promotion_id)
values(6, 2);
insert into promotion_product(product_id, promotion_id)
values(7, 2);
insert into promotion_product(product_id, promotion_id)
values(8, 2);
insert into promotion_product(product_id, promotion_id)
values(9, 2);
insert into promotion_product(product_id, promotion_id)
values(10, 2);
insert into promotion_product(product_id, promotion_id)
values(11, 2);
insert into promotion_product(product_id, promotion_id)
values(12, 2);
insert into promotion_product(product_id, promotion_id)
values(13, 2);
insert into promotion_product(product_id, promotion_id)
values(14, 2);
insert into promotion_product(product_id, promotion_id)
values(15, 2);
insert into promotion_product(product_id, promotion_id)
values(1, 1);
insert into promotion_product(product_id, promotion_id)
values(2, 1);
insert into promotion_product(product_id, promotion_id)
values(3, 1);
insert into promotion_product(product_id, promotion_id)
values(4, 1);
insert into promotion_product(product_id, promotion_id)
values(5, 1);
insert into promotion_product(product_id, promotion_id)
values(6, 1);
insert into promotion_product(product_id, promotion_id)
values(7, 1);
insert into promotion_product(product_id, promotion_id)
values(8, 1);
insert into promotion_product(product_id, promotion_id)
values(9, 1);
insert into promotion_product(product_id, promotion_id)
values(10, 1);
insert into promotion_product(product_id, promotion_id)
values(11, 1);
insert into promotion_product(product_id, promotion_id)
values(12, 1);
insert into promotion_product(product_id, promotion_id)
values(13, 1);
insert into promotion_product(product_id, promotion_id)
values(14, 1);
insert into promotion_product(product_id, promotion_id)
values(15, 1);

insert into promotion_product(product_id, promotion_id)
values(1, 3);
insert into promotion_product(product_id, promotion_id)
values(2, 3);
insert into promotion_product(product_id, promotion_id)
values(3, 3);
insert into promotion_product(product_id, promotion_id)
values(4, 3);
insert into promotion_product(product_id, promotion_id)
values(5, 3);
insert into promotion_product(product_id, promotion_id)
values(6, 3);
insert into promotion_product(product_id, promotion_id)
values(7, 3);
insert into promotion_product(product_id, promotion_id)
values(8, 3);
insert into promotion_product(product_id, promotion_id)
values(9, 3);
insert into promotion_product(product_id, promotion_id)
values(10, 3);
insert into promotion_product(product_id, promotion_id)
values(11, 3);
insert into promotion_product(product_id, promotion_id)
values(12, 3);
insert into promotion_product(product_id, promotion_id)
values(13, 3);
insert into promotion_product(product_id, promotion_id)
values(14, 3);
insert into promotion_product(product_id, promotion_id)
values(15, 3);

select * from cart;
insert into cart(customer_id) values(1);
insert into cart(customer_id) values(1);



DELIMITER //

CREATE PROCEDURE update_inventory_on_order_completion(IN invoiceId INT)
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE productId INT;
    DECLARE sizeName VARCHAR(255);
    DECLARE quantity INT;
    DECLARE cur CURSOR FOR 
        SELECT product_id, size_name, quantity 
        FROM invoice_details 
        WHERE invoice_id = invoiceId;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO productId, sizeName, quantity;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Cập nhật số lượng trong kho
        UPDATE inventory i
        JOIN size s ON i.size_id = s.size_id
        SET i.quantity = i.quantity - quantity
        WHERE i.product_id = productId
        AND s.size_name = sizeName;
        
    END LOOP;

    CLOSE cur;
END; //

DELIMITER ;


DELIMITER //

CREATE TRIGGER trg_update_inventory_on_order_completion
AFTER UPDATE ON invoice
FOR EACH ROW
BEGIN
    IF NEW.status = 'Đã hoàn thành' THEN
        CALL update_inventory_on_order_completion(NEW.id);
    END IF;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS update_inventory_on_order_completion;
DROP TRIGGER IF EXISTS trg_update_inventory_on_order_completion;