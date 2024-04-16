//Modelo de la reserva
export class Reserva{
    constructor(
        public _id: string,
        public nombreCliente: string,
        public numeroContacto: string,
        public correoElectronico: string,
        public fechaInicio: Date,
        public fechaFin: Date,
        public precioTotal: number,
        public habitaciones: Habitaciones[],
        public pagos: Pago[],
        public reembolsos: Reembolso[],
    ){}
}

//Modelo de pago
export class Pago{
    constructor(
        public captureId: string,
        public monto: number,
        public fecha: Date,
    ){}
}

//Modelo de reembolso
export class Reembolso{
    constructor(
        public captureId: string,
        public monto: number,
        public fecha: Date,
    ){}
}

//Modelo de habitaciones seleccionadas
export class Habitaciones{
    constructor(
        public habitacionId: string,
        public adultos: number,
        public ninos: number,
    ){}
}