
window.addEventListener('load', function () {
	
	// Declaramos las variables de uso globales
	let ingresosMonto 	= 0.00;
	let egresosMonto	= 0.00;
	
	let montoTotal 		= 0.00;
	let porcentajeGasto = 0.00;
	
	const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	
	const FormTransacciones = document.getElementById('FormTransacciones');
	
	// Iniciamos los datos que se muestran en pantalla
	mostrarDatos();
	
	// Analizamos el formulario que se enviara validando los datos
	FormTransacciones.addEventListener('submit', function(event) {
		event.preventDefault();
		
		// Declaramos los campos del formulario y obtenemos sus valores
		var transaccion = document.getElementById("transaccion").value;
		var descripcion = document.getElementById("descripcion").value;
		var montoTransaccion= document.getElementById("monto").value;
		
		// Validamos que esten completos los campos
		if( (transaccion === 'ING') || (transaccion === 'EGR')){
			
			if(descripcion !== ""){
				
				if(!(isNaN(montoTransaccion)) && (montoTransaccion > 0 )){
					
					// Procesamos los datos capturados del formulario
					procesarDatos(transaccion, descripcion, montoTransaccion);
				}else{
					// Mostramos la alerta
					Swal.fire({
						title: 'Error',
						text: 'Por favor digite un monto valido y mayor a 0.',
						icon: 'warning',
						showCancelButton: false,
						confirmButtonText: 'Continuar',
						cancelButtonText: 'Cancelar'
					});
				}
				
			}else{
				// Mostramos la alerta
				Swal.fire({
					title: 'Error',
					text: 'Por favor digite el detalle de la transaccion.',
					icon: 'warning',
					showCancelButton: false,
					confirmButtonText: 'Continuar',
					cancelButtonText: 'Cancelar'
				});
			}
		}else{
			// Mostramos la alerta
            Swal.fire({
				title: 'Error',
				text: 'Por favor selecciona un tipo de transacción, INGRESO | EGRESO',
				icon: 'warning',
				showCancelButton: false,
				confirmButtonText: 'Continuar',
				cancelButtonText: 'Cancelar'
			});
		}
	
	});
	
	// Procesamos los datos de la transaccion
	function procesarDatos(transaccion, descripcion, montoTransaccion){
		
		// Declaramos las variables de uso de la funcion
		var cambio = "";
		var detalleIngresos = document.getElementById('detalleIngresos'); // Area del historico de los ingresos
		var detalleEgresos 	= document.getElementById('detalleEgresos'); // Area del historico de los egresos
		var detalleEgreso 	= 0.00;
		
		// Validar con switch
		switch (transaccion) {
			case 'ING':
				
				ingresosMonto 	= ingresosMonto + parseFloat(montoTransaccion); // Acumulamos el monto de los ingresos
				montoTotal 		= montoTotal + parseFloat(montoTransaccion); // Aumentamos el ingreso al disponible
				
				// Escribimos el detalle en ingreso en el historico
				cambio ="<div class='row border border-primary mb-1'><div class='col-8'>"+descripcion+"</div><div class='col-4'>+ "+parseFloat(montoTransaccion).toFixed(2)+"</div></div>"
				detalleIngresos.innerHTML += cambio;
				break;
				
			case 'EGR':
				
				egresosMonto = egresosMonto + parseFloat(montoTransaccion); // Acumulamos en monto de los egresos
				montoTotal = montoTotal - parseFloat(montoTransaccion); // Restamos el egreso al disponible
				
				// Calculamos el detalle del egreso
				if(ingresosMonto>0){
					detalleEgreso = (parseFloat(montoTransaccion) * 100) / ingresosMonto;
				}
				
				// Escribimos el detalle en egreso en el historico
				cambio ="<div class='row border border-primary mb-1'><div class='col-6'>"+descripcion+"</div><div class='col-3'>- "+parseFloat(montoTransaccion).toFixed(2)+"</div><div class='col-3'><span class='badge badge-primary'>"+detalleEgreso.toFixed(2)+" %</span></div></div>"
				detalleEgresos.innerHTML += cambio;
				
				break;
		}
		
		// Calculamos el porcentaje de gasto
		if(ingresosMonto>0){
			porcentajeGasto = (egresosMonto * 100) / ingresosMonto;
		}
		
		mostrarDatos();
		FormTransacciones.reset();
		
		Swal.fire({
			title: 'Guardado',
			text: 'La transaccion se proceso correctamente.',
			icon: 'success',
			confirmButtonText: 'Continuar'
		});
	}
	
	// Sobreescribimos los detalles del presupuesto
	function mostrarDatos(){
		var fecha = new Date();
		
		// Seteamos el mes y el año
		document.getElementById('mesPagina').textContent 	= meses[fecha.getMonth()];
		document.getElementById('anioPagina').textContent 	= fecha.getFullYear();
		
		// Mostramos el disponible los ingresos y los egresos
		if(montoTotal>0){
			document.getElementById('disponible').textContent 	= "+ "+montoTotal.toFixed(2);
		}else{
			document.getElementById('disponible').textContent 	= montoTotal.toFixed(2);
		}
		
		document.getElementById('ingresosMonto').textContent 		= ingresosMonto.toFixed(2);
		document.getElementById('totalIngresosLista').textContent 	= ingresosMonto.toFixed(2);
		document.getElementById('egresosMonto').textContent 		= egresosMonto.toFixed(2);
		document.getElementById('totalEgresosLista').textContent 	= egresosMonto.toFixed(2);
		
		document.getElementById('porcentajeGasto').textContent 		= porcentajeGasto.toFixed(2);
	}
});
