function calculateNetPrice(price, discount) {
    const priceAfterDiscount = price - discount;
    const netPrice = priceAfterDiscount * 1.07; 
    return Math.round(netPrice);
}

const customer1Net = calculateNetPrice (1000,100);
console.log(`ลูกค้าคนที่ 1 ต้องจ่ายเงินสุทธิ : ${customer1Net} บาท`);

const customer2Net = calculateNetPrice (2500,300);
console.log(`ลูกค้าคนที่ 2 ต้องจ่ายเงินสุทธิ : ${customer2Net} บาท`);

const customer3Net = calculateNetPrice (500,0);
console.log(`ลูกค้าคนที่ 3 ต้องจ่ายเงินสุทธิ : ${customer3Net} บาท`);