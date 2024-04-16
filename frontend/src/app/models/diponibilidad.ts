export class Disponibilidad {
    
    constructor(
        public fechaInicio: Date,
        public fechaFin: Date,
        public reservaId: string,
        public habitaciones: HabitacionParaDisponibilidad[]
    ){
    }
}


class HabitacionParaDisponibilidad {
    
    constructor(public habitacionId: string){}
}

