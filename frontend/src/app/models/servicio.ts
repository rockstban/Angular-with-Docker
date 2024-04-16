export class Servicio {
    nombre: string;
    descripcion: string;
    pathImagen: string;
    iconClass: string;

    constructor(
        nombre: string, 
        descripcion: string, 
        pathImagen: string, 
        iconClass: string) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.pathImagen = pathImagen;
        this.iconClass = iconClass;
    }
}
