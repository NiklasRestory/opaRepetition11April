class Furniture {

    #private_variable;
    _protected_variable;

    constructor(id, designer, brand, price) {
        this.id = id;
        this.designer = designer;
        this.brand = brand;
        this.price = price;
    }
    
    printInfo() {
        console.log("Furniture{" +
        "furnitureId=" + this.id +
        ", designer='" + this.designer + '\'' +
        ", brand='" + this.brand + '\'' +
        ", price=" + this.price +
        '}');
    }

    getInfo() {
        return "Furniture{" +
        "furnitureId=" + this.id +
        ", designer='" + this.designer + '\'' +
        ", brand='" + this.brand + '\'' +
        ", price=" + this.price +
        '}';
    }
}