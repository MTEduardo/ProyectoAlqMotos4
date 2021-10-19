//Funciones para el manejo de la tabla MOTO:
function traerInformacionMoto() {
	$.ajax({
		url: 'http://localhost/api/Motorbike/all',
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			console.log(respuesta);
			$("#resultado").empty();
			let tablaMoto = '<table>';

			tablaMoto += '<th>' + "ID" + '</th>';
			tablaMoto += '<th>' + "NOMBRE" + '</th>';
			tablaMoto += '<th>' + "MARCA" + '</th>';
			tablaMoto += '<th>' + "AÑO" + '</th>';
			tablaMoto += '<th>' + "DESCRIPCIÓN" + '</th>';
			tablaMoto += '<th>' + "CATEGORÍA" + '</th>';
			tablaMoto += '<th>' + "EDITAR" + '</th>';
			tablaMoto += '<th>' + "BORRAR" + '</th>';

			for (i = 0; i < respuesta.length; i++) {
				tablaMoto += '<tr>';
				tablaMoto += '<td>' + respuesta[i].id + '</td>';
				tablaMoto += '<td>' + respuesta[i].name + '</td>';
				tablaMoto += '<td>' + respuesta[i].brand + '</td>';
				tablaMoto += '<td>' + '<center>' + respuesta[i].year + '</center>' + '</td>';
				tablaMoto += '<td>' + respuesta[i].description + '</td>';
				tablaMoto += '<td>' + '<center>' + respuesta[i].category.id + '</center>' + '</td>';
				tablaMoto += '<td><center><button onclick="editarRegistroMoto(' + respuesta[i].id + ' )">Editar</center></button></td>';
				tablaMoto += '<td><center><button onclick="eliminarRegistroMoto(' + respuesta[i].id + ' )">Borrar</center></button></td>';
				tablaMoto += '</tr>';
			}

			tablaMoto += '</table>';
			$("#resultado").append(tablaMoto);

		},
		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}

function guardarInformacionMoto() {
	let categoryObj = { id: $("#categoriesList").val() };
	let datosMoto = {
		name: $("#name").val(),
		brand: $("#brand").val(),
		year: $("#year").val(),
		description: $("#description").val(),
		category: categoryObj
	};
	let datosJson = JSON.stringify(datosMoto);
	if ($("#categoriesList").val() == 0) {
		alert(".::ERROR::. Debes seleccionar una categoría!")
	} else {
		$.ajax(
			'http://localhost/api/Motorbike/save',
			{
				data: datosJson,
				type: 'POST',
				dataType: 'json',
				contentType: "application/json; charset=utf-8",

				statusCode: {
					201: function () {
						alert("Registro Guardado Exitosamente!");
						$("#id").val("");
						$("#name").val("");
						$("#brand").val("");
						$("#year").val("");
						$("#description").val("");
						$("#categoriesList").val(0);
						traerInformacionMoto();
					}
				}
			});
	}
}

function editarRegistroMoto(idMoto) {
	$.ajax({
		url: 'http://localhost/api/Motorbike/' + idMoto,
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			console.log(respuesta);
			$("#id").val(respuesta.id);
			$("#name").val(respuesta.name);
			$("#brand").val(respuesta.brand);
			$("#year").val(respuesta.year);
			$("#description").val(respuesta.description);
			$("#categoriesList").val(respuesta.category.id);
			$("#id").prop("readonly", true);
		},
		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}

function actualizarInformacionMoto() {
	let categoryObj = { id: $("#categoriesList").val() };
	let datosMoto = {
		id: $("#id").val(),
		name: $("#name").val(),
		brand: $("#brand").val(),
		year: $("#year").val(),
		description: $("#description").val(),
		category: categoryObj
	};
	let datosJson = JSON.stringify(datosMoto);
	if ($("#categoriesList").val() == 0) {
		alert(".::ERROR::. Debes seleccionar una categoría!")
	} else {
		$.ajax(
			'http://localhost/api/Motorbike/update',
			{
				data: datosJson,
				type: 'PUT',
				dataType: 'json',
				contentType: "application/json; charset=utf-8",

				statusCode: {
					201: function () {
						alert("Registro Actualizado Exitosamente!");
						$("#id").val("");
						$("#name").val("");
						$("#brand").val("");
						$("#year").val("");
						$("#description").val("");
						$("#categoriesList").val(0);
						traerInformacionMoto();
					}
				}
			});
	}
}

function eliminarRegistroMoto(idMoto) {
	$.ajax(
		'http://localhost/api/Motorbike/' + idMoto,
		{
			type: 'DELETE',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",

			statusCode: {
				204: function () {
					alert("Registro Borrado Exitosamente!");
					traerInformacionMoto();
				}
			}
		});
}

function limpiarCamposMoto() {
	$("#id").val("");
	$("#name").val("");
	$("#brand").val("");
	$("#year").val("");
	$("#description").val("");
	$("#categoriesList").val(0);
	$("#id").prop("readonly", false);
}

//Funciones para el manejo de la tabla CATEGORÍAS:
function traerInformacionCategoria() {
	$.ajax({
		url: 'http://localhost/api/Category/all',
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			console.log(respuesta);
			$("#resultado").empty();
			let tablaCategorias = '<table>';

			tablaCategorias += '<th>' + "ID" + '</th>';
			tablaCategorias += '<th>' + "NOMBRE" + '</th>';
			tablaCategorias += '<th>' + "DESCRIPCIÓN" + '</th>';
			tablaCategorias += '<th>' + "EDITAR" + '</th>';
			tablaCategorias += '<th>' + "BORRAR" + '</th>';

			for (i = 0; i < respuesta.length; i++) {
				tablaCategorias += '<tr>';
				tablaCategorias += '<td>' + respuesta[i].id + '</td>';
				tablaCategorias += '<td>' + respuesta[i].name + '</td>';
				tablaCategorias += '<td>' + respuesta[i].description + '</td>';
				tablaCategorias += '<td><center><button onclick="editarRegistroCategoria(' + respuesta[i].id + ' )">Editar</center></button></td>';
				tablaCategorias += '<td><center><button onclick="eliminarRegistroCategoria(' + respuesta[i].id + ' )">Borrar</center></button></td>';
				tablaCategorias += '</tr>';
			}

			tablaCategorias += '</table>';
			$("#resultado").append(tablaCategorias);

		},
		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}

function guardarInformacionCategoria() {
	let datosCategorias = {
		id: $("#id").val(),
		name: $("#name").val(),
		description: $("#description").val()
	};
	let datosJson = JSON.stringify(datosCategorias);
	$.ajax(
		'http://localhost/api/Category/save',
		{
			data: datosJson,
			type: 'POST',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",

			statusCode: {
				201: function () {
					alert("Registro Guardado Exitosamente!");
					$("#id").val("");
					$("#name").val("");
					$("#description").val("");
					traerInformacionCategoria();
				}
			}
		});
}

function editarRegistroCategoria(idCategoria) {
	$.ajax({
		url: 'http://localhost/api/Category/' + idCategoria,
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			console.log(respuesta);
			$("#id").val(respuesta.id);
			$("#name").val(respuesta.name);
			$("#description").val(respuesta.description);
			$("#id").prop("readonly", true);
		},
		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}

function actualizarInformacionCategoria() {
	let datosCategoria = {
		id: $("#id").val(),
		name: $("#name").val(),
		description: $("#description").val(),
	};
	let datosJson = JSON.stringify(datosCategoria);
	$.ajax(
		'http://localhost/api/Category/update',
		{
			data: datosJson,
			type: 'PUT',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",

			statusCode: {
				201: function () {
					alert("Registro Actualizado Exitosamente!");
					$("#id").val("");
					$("#name").val("");
					$("#description").val("");
					traerInformacionCategoria();
				}
			}
		});
}

function eliminarRegistroCategoria(idCategoria) {
	$.ajax(
		'http://localhost/api/Category/' + idCategoria,
		{
			type: 'DELETE',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",

			statusCode: {
				204: function () {
					alert("Registro Borrado Exitosamente!");
					traerInformacionCategoria();
				}
			}
		});
}

function limpiarCamposCategoria() {
	$("#id").val("");
	$("#name").val("");
	$("#description").val("");
	$("#id").prop("readonly", false);
}

//Funciones para el manejo de la tabla CLIENTE:
function traerInformacionCliente() {
	$.ajax({
		url: 'http://localhost/api/Client/all',
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			console.log(respuesta);
			$("#resultado").empty();
			let tablaClientes = '<table>';

			tablaClientes += '<th>' + "ID" + '</th>';
			tablaClientes += '<th>' + "E-MAIL" + '</th>';
			tablaClientes += '<th>' + "CONTRASEÑA" + '</th>';
			tablaClientes += '<th>' + "NOMBRE" + '</th>';
			tablaClientes += '<th>' + "EDAD" + '</th>';
			tablaClientes += '<th>' + "EDITAR" + '</th>';
			tablaClientes += '<th>' + "BORRAR" + '</th>';

			for (i = 0; i < respuesta.length; i++) {
				tablaClientes += '<tr>';
				tablaClientes += '<td>' + respuesta[i].idClient + '</td>';
				tablaClientes += '<td>' + respuesta[i].email + '</td>';
				tablaClientes += '<td>' + respuesta[i].password + '</td>';
				tablaClientes += '<td>' + respuesta[i].name + '</td>';
				tablaClientes += '<td>' + '<center>' + respuesta[i].age + '</center>' + '</td>';
				tablaClientes += '<td><center><button onclick="editarRegistroCliente(' + respuesta[i].idClient + ' )">Editar</center></button></td>';
				tablaClientes += '<td><center><button onclick="eliminarRegistroCliente(' + respuesta[i].idClient + ' )">Borrar</center></button></td>';
				tablaClientes += '</tr>';
			}

			tablaClientes += '</table>';
			$("#resultado").append(tablaClientes);

		},
		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}

function guardarInformacionCliente() {
	let datosCliente = {
		idClient: $("#idClient").val(),
		email: $("#email").val(),
		password: $("#password").val(),
		name: $("#name").val(),
		age: $("#age").val()
	};
	let datosJson = JSON.stringify(datosCliente);
	$.ajax(
		'http://localhost/api/Client/save',
		{
			data: datosJson,
			type: 'POST',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",

			statusCode: {
				201: function () {
					alert("Registro Guardado Exitosamente!");
					$("#idClient").val("");
					$("#email").val("");
					$("#password").val("");
					$("#name").val("");
					$("#age").val("");
					traerInformacionCliente();
				}
			}
		});
}

function editarRegistroCliente(idCliente) {
	$.ajax({
		url: 'http://localhost/api/Client/' + idCliente,
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			console.log(respuesta);
			$("#idClient").val(respuesta.idClient);
			$("#email").val(respuesta.email);
			$("#password").val(respuesta.password);
			$("#name").val(respuesta.name);
			$("#age").val(respuesta.age);
			$("#idClient").prop("readonly", true);
		},
		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}

function actualizarInformacionCliente() {
	let datosCliente = {
		idClient: $("#idClient").val(),
		name: $("#name").val(),
		description: $("#description").val(),
	};
	let datosJson = JSON.stringify(datosCliente);
	$.ajax(
		'http://localhost/api/Client/update',
		{
			data: datosJson,
			type: 'PUT',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",

			statusCode: {
				201: function () {
					alert("Registro Actualizado Exitosamente!");
					$("#idClient").val("");
					$("#email").val("");
					$("#password").val("");
					$("#name").val("");
					$("#age").val("");
					traerInformacionCliente();
				}
			}
		});
}

function eliminarRegistroCliente(idCliente) {
	$.ajax(
		'http://localhost/api/Client/' + idCliente,
		{
			type: 'DELETE',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",

			statusCode: {
				204: function () {
					alert("Registro Borrado Exitosamente!");
					traerInformacionCliente();
				}
			}
		});
}

function limpiarCamposCliente() {
	$("#idClient").val("");
	$("#email").val("");
	$("#password").val("");
	$("#name").val("");
	$("#age").val("");
	$("#idClient").prop("readonly", false);
}

//Funciones para el manejo de la tabla MENSAJE:
function traerInformacionMensaje() {
	$.ajax({
		url: 'http://localhost/api/Message/all',
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			console.log(respuesta);
			$("#resultado").empty();
			let tablaMensajes = '<table>';

			tablaMensajes += '<th>' + "ID" + '</th>';
			tablaMensajes += '<th>' + "TEXTO DEL MENSAJE" + '</th>';
			tablaMensajes += '<th>' + "CLIENTE" + '</th>';
			tablaMensajes += '<th>' + "MOTO" + '</th>';
			tablaMensajes += '<th>' + "EDITAR" + '</th>';
			tablaMensajes += '<th>' + "BORRAR" + '</th>';

			for (i = 0; i < respuesta.length; i++) {
				tablaMensajes += '<tr>';
				tablaMensajes += '<td>' + respuesta[i].idMessage + '</td>';
				tablaMensajes += '<td>' + respuesta[i].messageText + '</td>';
				tablaMensajes += '<td>' + '<center>' + respuesta[i].client.idClient + '</center>' + '</td>';
				tablaMensajes += '<td>' + '<center>' + respuesta[i].motorbike.id + '</center>' + '</td>';
				tablaMensajes += '<td><center><button onclick="editarRegistroMensaje(' + respuesta[i].idMessage + ' )">Editar</center></button></td>';
				tablaMensajes += '<td><center><button onclick="eliminarRegistroMensaje(' + respuesta[i].idMessage + ' )">Borrar</center></button></td>';
				tablaMensajes += '</tr>';
			}

			tablaMensajes += '</table>';
			$("#resultado").append(tablaMensajes);

		},
		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}

function guardarInformacionMensaje() {
	let clientObj = { idClient: $("#clientsList").val() };
	let motorbikeObj = { id: $("#motorbikesList").val() };
	let datosMensaje = {
		idMessage: $("#idMessage").val(),
		messageText: $("#messageText").val(),
		client: clientObj,
		motorbike: motorbikeObj
	};
	let datosJson = JSON.stringify(datosMensaje);
	if ($("#clientsList").val() == 0) {
		alert(".::ERROR::. Debes seleccionar un cliente!")
	} else {
		if ($("#motorbikesList").val() == 0) {
			alert(".::ERROR::. Debes seleccionar una moto!")
		} else {
			$.ajax(
				'http://localhost/api/Message/save',
				{
					data: datosJson,
					type: 'POST',
					dataType: 'json',
					contentType: "application/json; charset=utf-8",

					statusCode: {
						201: function () {
							alert("Registro Guardado Exitosamente!");
							$("#idMessage").val("");
							$("#messageText").val("");
							$("#clientsList").val(0);
							$("#motorbikesList").val(0);
							traerInformacionMensaje();
						}
					}
				});
		}
	}
}

function editarRegistroMensaje(idMensaje) {
	$.ajax({
		url: 'http://localhost/api/Message/' + idMensaje,
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			console.log(respuesta);
			$("#idMessage").val(respuesta.idMessage);
			$("#messageText").val(respuesta.messageText);
			$("#clientsList").val(respuesta.client.idClient);
			$("#motorbikesList").val(respuesta.motorbike.id);
			$("#idMessage").prop("readonly", true);
		},
		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}

function actualizarInformacionMensaje() {
	let clientObj = { idClient: $("#clientsList").val() };
	let motorbikeObj = { id: $("#motorbikesList").val() };
	let datosMensaje = {
		idMessage: $("#idMessage").val(),
		messageText: $("#messageText").val(),
		client: clientObj,
		motorbike: motorbikeObj
	};
	let datosJson = JSON.stringify(datosMensaje);
	if ($("#clientsList").val() == 0) {
		alert(".::ERROR::. Debes seleccionar un cliente!")
	} else {
		if ($("#motorbikesList").val() == 0) {
			alert(".::ERROR::. Debes seleccionar una moto!")
		} else {
			$.ajax(
				'http://localhost/api/Message/update',
				{
					data: datosJson,
					type: 'PUT',
					dataType: 'json',
					contentType: "application/json; charset=utf-8",

					statusCode: {
						201: function () {
							alert("Registro Actualizado Exitosamente!");
							$("#idMessage").val("");
							$("#messageText").val("");
							$("#clientsList").val(0);
							$("#motorbikesList").val(0);
							traerInformacionMensaje();
						}
					}
				});
		}
	}
}

function eliminarRegistroMensaje(idMensaje) {
	$.ajax(
		'http://localhost/api/Message/' + idMensaje,
		{
			type: 'DELETE',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",

			statusCode: {
				204: function () {
					alert("Registro Borrado Exitosamente!");
					traerInformacionMensaje();
				}
			}
		});
}

function limpiarCamposMensaje() {
	$("#idMessage").val("");
	$("#messageText").val("");
	$("#clientsList").val(0);
	$("#motorbikesList").val(0);
	$("#idMessage").prop("readonly", false);
}

//Funciones para el manejo de la tabla RESERVACIONES:
function traerInformacionReservacion() {
	$.ajax({
		url: 'http://localhost/api/Reservation/all',
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			console.log(respuesta);
			$("#resultado").empty();
			let tablaReservaciones = '<table>';

			tablaReservaciones += '<th>' + "ID" + '</th>';
			tablaReservaciones += '<th>' + "FECHA INICIO" + '</th>';
			tablaReservaciones += '<th>' + "FECHA DEVOLUCIÓN" + '</th>';
			tablaReservaciones += '<th>' + "ESTADO" + '</th>';
			tablaReservaciones += '<th>' + "CLIENTE" + '</th>';
			tablaReservaciones += '<th>' + "MOTO" + '</th>';
			tablaReservaciones += '<th>' + "EDITAR" + '</th>';
			tablaReservaciones += '<th>' + "BORRAR" + '</th>';

			for (i = 0; i < respuesta.length; i++) {
				tablaReservaciones += '<tr>';
				tablaReservaciones += '<td>' + '<center>' + respuesta[i].idReservation + '</center>' + '</td>';
				tablaReservaciones += '<td>' + '<center>' + respuesta[i].startDate.slice(0, 10) + '</center>' + '</td>';
				tablaReservaciones += '<td>' + '<center>' + respuesta[i].devolutionDate.slice(0, 10) + '</center>' + '</td>';
				tablaReservaciones += '<td>' + respuesta[i].status + '</td>';
				tablaReservaciones += '<td>' + '<center>' + respuesta[i].client.idClient + '</center>' + '</td>';
				tablaReservaciones += '<td>' + '<center>' + respuesta[i].motorbike.id + '</center>' + '</td>';
				tablaReservaciones += '<td><center><button onclick="editarRegistroReservacion(' + respuesta[i].idReservation + ' )">Editar</center></button></td>';
				tablaReservaciones += '<td><center><button onclick="eliminarRegistroReservacion(' + respuesta[i].idReservation + ' )">Borrar</center></button></td>';
				tablaReservaciones += '</tr>';
			}

			tablaReservaciones += '</table>';
			$("#resultado").append(tablaReservaciones);

		},
		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}

function guardarInformacionReservacion() {
	let clientObj = { idClient: $("#clientsList").val() };
	let motorbikeObj = { id: $("#motorbikesList").val() };
	let datosReservacion = {
		idReservation: $("#idReservation").val(),
		startDate: $("#startDate").val(),
		devolutionDate: $("#devolutionDate").val(),
		client: clientObj,
		motorbike: motorbikeObj
	};
	let datosJson = JSON.stringify(datosReservacion);
	if ($("#clientsList").val() == 0) {
		alert(".::ERROR::. Debes seleccionar un cliente!")
	} else {
		if ($("#motorbikesList").val() == 0) {
			alert(".::ERROR::. Debes seleccionar una moto!")
		} else {
			$.ajax(
				'http://localhost/api/Reservation/save',
				{
					data: datosJson,
					type: 'POST',
					dataType: 'json',
					contentType: "application/json; charset=utf-8",

					statusCode: {
						201: function () {
							alert("Registro Guardado Exitosamente!");
							$("#idReservation").val("");
							$("#startDate").val("");
							$("#devolutionDate").val("");
							$("#clientsList").val(0);
							$("#motorbikesList").val(0);
							traerInformacionReservacion();
						}
					}
				});
		}
	}
}

function editarRegistroReservacion(idReservacion) {
	$.ajax({
		url: 'http://localhost/api/Reservation/' + idReservacion,
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			let fecha1 = respuesta.startDate.slice(0, 10);
			let fecha2 = respuesta.devolutionDate.slice(0, 10);
			console.log(respuesta);
			$("#idReservation").val(respuesta.idReservation);
			$("#startDate").val(fecha1);
			$("#devolutionDate").val(fecha2);
			$("#clientsList").val(respuesta.client.idClient);
			$("#motorbikesList").val(respuesta.motorbike.id);
			$("#idReservation").prop("readonly", true);
		},

		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}

function actualizarInformacionReservacion() {
	let clientObj = { idClient: $("#clientsList").val() };
	let motorbikeObj = { id: $("#motorbikesList").val() };
	let datosReservacion = {
		idReservacion: $("#idReservacion").val(),
		startDate: $("#startDate").val(),
		devolutionDate: $("#devolutionDate").val(),
		client: clientObj,
		motorbike: motorbikeObj
	};
	let datosJson = JSON.stringify(datosReservacion);
	if ($("#clientsList").val() == 0) {
		alert("Debes seleccionar un cliente!")
	} else {
		if ($("#motorbikesList").val() == 0) {
			alert("Debes seleccionar una moto!")
		} else {
			$.ajax(
				'http://localhost/api/Reservation/update',
				{
					data: datosJson,
					type: 'PUT',
					dataType: 'json',
					contentType: "application/json; charset=utf-8",

					statusCode: {
						201: function () {
							alert("Registro Actualizado Exitosamente!");
							$("#idReservacion").val("");
							$("#startDate").val("");
							$("#devolutionDate").val("");
							$("#clientsList").val(0);
							$("#motorbikesList").val(0);
							traerInformacionReservacion();
						}
					}
				});
		}
	}
}

function eliminarRegistroReservacion(idReservacion) {
	$.ajax(
		'http://localhost/api/Reservation/' + idReservacion,
		{
			type: 'DELETE',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",

			statusCode: {
				204: function () {
					alert("Registro Borrado Exitosamente!");
					traerInformacionReservacion();
				}
			}
		});
}

function limpiarCamposReservacion() {
	$("#idReservation").val("");
	$("#startDate").val("");
	$("#devolutionDate").val("");
	$("#clientsList").val(0);
	$("#motorbikesList").val(0);
	$("#idReservacion").prop("readonly", false);
}

//Funciones para listas desplegables:
function listarCategorias() {

	$.ajax({
		url: 'http://localhost/api/Category/all',
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			console.log(respuesta);
			$("#categoriesList").empty();
			misCategories = "";
			misCategories += '<option value=' + 0 + '>Escoge una categoría</option>'
			for (i = 0; i < respuesta.length; i++) {
				misCategories += '<option value=' + respuesta[i].id + '>' + respuesta[i].name + '</option>';
			}

			$("#categoriesList").append(misCategories)

		},
		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}

function listarClientes() {
	$.ajax({
		url: 'http://localhost/api/Client/all',
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			console.log(respuesta);
			$("#clientsList").empty();
			misClientes = "";
			misClientes += '<option value=' + 0 + '>Escoge un cliente</option>'
			for (i = 0; i < respuesta.length; i++) {
				misClientes += '<option value=' + respuesta[i].idClient + '>' + respuesta[i].name + '</option>';
			}

			$("#clientsList").append(misClientes)

		},
		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}

function listarMotos() {
	$.ajax({
		url: 'http://localhost/api/Motorbike/all',
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",

		success: function (respuesta) {
			console.log(respuesta);
			$("#motorbikesList").empty();
			misMotos = "";
			misMotos += '<option value=' + 0 + '>Escoge una moto</option>'
			for (i = 0; i < respuesta.length; i++) {
				misMotos += '<option value=' + respuesta[i].id + '>' + respuesta[i].name + '</option>';
			}

			$("#motorbikesList").append(misMotos)

		},
		error: function (xhr, status) {
			alert('Ha sucedido un problema:' + status + json);
		}
	});
}
