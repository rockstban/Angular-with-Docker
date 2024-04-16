export class Galeria {
    nombre: string;
    imgSrc: string;
    alt: string;
    rating: string;
    des: string;

    constructor(nombre: string, imgSrc: string, alt: string, rating: string, des: string) {
        this.nombre = nombre;
        this.imgSrc = imgSrc;
        this.alt = alt;
        this.rating = rating;
        this.des = des;
    }
}
