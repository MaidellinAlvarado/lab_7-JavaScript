class Usuario {
    constructor(nombre, apellido, correo, puesto, curso = [], mensaje = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.puesto = puesto;
        this.curso = curso;  
        this.mensaje = mensaje;  
    }

    addCourse(nombreCurso, nivel) {
        const CursoAgregado = { nombre: nombreCurso, nivel: nivel };
        this.curso.push(CursoAgregado);
    }

    removeCurso(nombreCurso) {
        const cursoEliminar = this.curso.findIndex(curso => curso.nombre === nombreCurso);
        if (cursoEliminar !== -1) {
            this.curso.splice(cursoEliminar, 1);
        }
    }

    editCurso(nombreCurso, nuevoNombre, nuevoNivel) {
        const cursoEditar = this.curso.find(curso => curso.nombre === nombreCurso);

        if (!cursoEditar) {
            console.log("Curso no encontrado");
            return;
        } else {
            cursoEditar.nombre = nuevoNombre || cursoEditar.nombre;
            cursoEditar.nivel = nuevoNivel || cursoEditar.nivel;
        }
    }

    enviarMensaje(from, men) {
        this.mensaje.push({ from, men, timestamp: new Date() });
        this.desdeCorreo(from, this.correo, men);
    }

    desdeCorreo(from, para, men) {
        console.log(`Este mensaje ha sido enviado por ${from} a ${para}: "${men}"`);
    }

    showMessagesHistory() {
        console.log("Historial de mensajes:");
        this.mensaje.forEach(({ from, message, timestamp }, index) => {
            console.log(`${index + 1}. De: ${from} - "${message}" - ${timestamp}`);
        });
    }
}



//LABORATORIO  III TAREA 7



class ExtendedUser {
    // Método estático para hacer la correspondencia entre el profesor y el estudiante
    static match(profesor, estudiante, nombreCurso) {
        // Si no se proporciona un nombre de curso, buscamos todas las coincidencias
        if (!nombreCurso) {
            const matches = [];

            // Comparamos cada curso que le interesa al estudiante con los que enseña el profesor
            estudiante.curso.forEach(studentCourse => {
                profesor.curso.forEach(teacherCourse => {
                    if (studentCourse.nombre === teacherCourse.nombre && studentCourse.nivel <= teacherCourse.nivel) {
                        matches.push({ course: studentCourse.nombre, level: studentCourse.nivel });
                    }
                });
            });

            return matches;
        }

        // Si se proporciona un nombre de curso, buscamos una coincidencia específica
        const courseMatch = profesor.curso.find(course => 
            course.nombre === nombreCurso && 
            estudiante.curso.some(stuCourse => 
                stuCourse.nombre === nombreCurso && stuCourse.nivel <= course.nivel));

        return courseMatch ? { course: courseMatch.nombre, level: courseMatch.nivel } : undefined;
    }
}

// Ejemplo de uso:
let estudiante1 = new Usuario({ nombre: 'Rafael', apellido: 'Noda;', correo: 'rfife@yahoo.com', puesto: 'estudiante' });
let profesor1 = new Usuario({ nombre: 'Paula', apellido: 'Aguilar', correo: 'PaulaThompkins@gmail.com', puesto: 'profesor' });

// Agregar cursos al estudiante y al profesor curso en comun y nivel en comun
estudiante1.addCourse('matematica', 2);
estudiante1.addCourse('fisica', 4);
profesor1.addCourse('matematica', 4);
profesor1.addCourse('fisica', 4);

// Buscar coincidencias sin especificar un curso
let match = ExtendedUser.match(profesor1, estudiante1);
console.log(match); // -> [{course: 'matematica', level: 2}, {course: 'fisica', level: 4}]

// Editar el nivel del curso del profesor para hacer un pequeno cambio
profesor1.editCurso('matematica', 'matematica', 1);

// Buscar coincidencias después de la edición del nivel del curso
match = ExtendedUser.match(profesor1, estudiante1);
console.log(match); // -> [{course: 'fisica', level: 4}]





