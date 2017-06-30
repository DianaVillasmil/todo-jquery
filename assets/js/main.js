//SE DECLARA EL ARREGLO DE TAREAS

var tareas = [];

//

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function () {

    function limpiarListas() {
        $('#pendientes').html('');
        $('#terminadas').html('');
    }

    function refrescarListas() {
        limpiarListas();
        var pendientes = tareas.filter((tarea)=>{
            return !tarea.listo;
        });
        var terminadas = tareas.filter((tarea)=>{
            return tarea.listo;
        });

        pendientes.forEach((tarea, i)=>{
            var checked = tarea.listo ? 'checked=""' : '';
            var html = `<li class="section valign-wrapper row">
            <span class="col s9 left-align valign">
                <input type="checkbox" id="todo-` + tarea.id + `" class="todo" ` + checked + `/>
                <label for="todo-` + tarea.id + `" class="white-text">` + tarea.texto + `</label>
            </span>
            <span class="valign col s3 right-align">
                <a class="btn-floating waves-effect waves-light red hoverable delete" id="delete-` + tarea.id + `"><i class="material-icons">delete</i></a>
            </span>
            </li>`

            $('#pendientes').append(html);
        });

        terminadas.forEach((tarea, i)=>{
            var checked = tarea.listo ? 'checked=""' : '';
            var html = `<li class="section valign-wrapper row">
            <span class="col s9 left-align valign">
                <input type="checkbox" id="done-` + tarea.id + `" class="done" ` + checked + `/>
                <label for="done-` + tarea.id + `" class="white-text">` + tarea.texto + `</label>
            </span>
            <span class="valign col s3 right-align">
                <a class="btn-floating waves-effect waves-light red hoverable delete" id="delete-` + tarea.id + `"><i class="material-icons">delete</i></a>
            </span>
            </li>`

            $('#terminadas').append(html);
        }); 

        //TERMINAR TAREA

        $('.todo').off('change');
        $('.todo').on('change', function(e) {
            var id = parseInt(this.id.replace('todo-',''))
            console.log(id);

            var i = tareas.findIndex((tarea)=>{
                return tarea.id == id;
            });

            tareas[i].listo = true;
            refrescarListas();
        });

        //DESHACER TAREA

        $('.done').off('change');
        $('.done').on('change', function(e) {
            var id = parseInt(this.id.replace('done-',''))
            console.log(id);

            var i = tareas.findIndex((tarea)=>{
                return tarea.id == id;
            });

            tareas[i].listo = false;
            refrescarListas();

        });

        //BORRAR TAREA

        $('.delete').off('click');
        $('.delete').on('click', function(e) {
            var id = parseInt(this.id.replace('delete-',''))
            console.log(id);

            var i = tareas.findIndex((tarea)=>{
                return tarea.id == id;
            });
            tareas.splice(i,1); 
            refrescarListas();
        });
    }
    //AGREGAR TAREA

    $('#tarea').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            e.stopPropagation();

            var texto = $('#tarea').val();

            if (texto != '') {
                $('#tarea').val('');

                tareas.push({
                    texto: texto,
                    listo: false,
                    id: getRandomInt(0, 65535)
                });

                refrescarListas();
            }
        }
    });
});