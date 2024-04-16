export class Habitacion{
    constructor(
        public _id: string,
        public imagenes: string[],
        public nombre: string,
        public capacidad: number,
        public camaGrande: number,
        public camaIndividual: number,
        public precio: number,
        public totalRooms: number,
        public disponibilidad: boolean,
        public disponibles: number,
        public amenidades: Amenidades,

    ){}
}

class Amenidades{
    constructor(
        public facilidadesAcceso: string[],
        public bano: string[],
        public habitacion: string[],
        public entretenimiento: string[],
        public alimentosBebidas: string[],
        public internet: string[],
        public mas: string[],
    ){

    }
}