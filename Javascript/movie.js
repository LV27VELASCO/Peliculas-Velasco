
//PAGINACION
let paginacion=1;

let divPaginas=`${paginacion} of 500`

//Boton anterior y evento
const btnAnterior=document.getElementById('btnAnterior')

btnAnterior.addEventListener('click',()=>{
	divPaginas=`${paginacion} of 500`
	if(paginacion>1){
		paginacion--
		cargarPeliculas()
	}else{
		paginacion=500
		cargarPeliculas()
	}
	document.getElementById('pagina').innerHTML=paginacion
})

document.getElementById('pagina').innerHTML=paginacion



// Boton Siguirnte y evento
const btnSiguiente=document.getElementById('btnSiguiente')
btnSiguiente.addEventListener('click',()=>{
	divPaginas=`${paginacion} of 500`
	if(paginacion===500){
		paginacion=1
		cargarPeliculas()
	}else{
		paginacion++
		cargarPeliculas()
	}
	document.getElementById('pagina').innerHTML=paginacion
})


// Cargar Api
const cargarPeliculas= async()=>{

	try {
		const RESPUESTA=await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=25833d6472d5e0edb18565d7961e3cba&language=es-MX&page=${paginacion}`)
		
		if(RESPUESTA.status===200){
			const DATOS= await RESPUESTA.json()

		
			
			let peliculas=''
			DATOS.results.forEach(pelicula=>{

				let porcentaje=(pelicula.vote_average).toFixed(1)[0]+(pelicula.vote_average).toFixed(1)[2]

				let color=''
				let fondo=''
				
				if(porcentaje>=70){
					color='#2ed60c'
					fondo='#87fa7f'
				}else if(porcentaje<70&&porcentaje>=50){
					color='#d6740c'
					fondo='#fab27f'
				}else if(porcentaje<50){
					color='#d6130c'
					fondo='#fa7f7f'
				}

				
				peliculas+=`
				<a href='../Html/movie_id.html'>
				<div class='pelicula' data-id='${pelicula.id}'>
				<div class=contenedor-poster>
				<img class='poster' src='https://image.tmdb.org/t/p/w500/${pelicula.poster_path}'>
				</div>

				<div class='porcentaje1'>
				<svg>
				<circle cx='18' cy='18' r='20'  style="stroke:${fondo}"></circle>
				<circle cx='18' cy='18' r='20' style="stroke-dashoffset:calc(140 - (140 * ${porcentaje}) / 100); stroke:${color}"></circle>
				</svg>
				<h4 class='number'>${porcentaje}<span>%</span></h4>
				</div>
				<span class='fecha'>${pelicula.release_date}</span>
				<div class='contenedor-info'>
				<h3 class='titulo'>${pelicula.title}</h3>
				</div>

				</div>
				</a>
				`
			})

			document.getElementById('contenedor').innerHTML=peliculas

		}else if(RESPUESTA.status===401){
			console.log('error 401')
		}else if(RESPUESTA.status===404){
			console.log('ERROR 404')
		}else{
			console.log('Ups algo raro paso')
		}
			
	} catch (error) {
		console.log(error)
	}
	}

	cargarPeliculas()




const containerMovies=document.getElementById('contenedor')






containerMovies.addEventListener('click',(e)=>{
	if(e.target.closest('.pelicula')){
	  let id=e.target.closest('.pelicula').dataset.id
	   
	  localStorage.setItem('id',id)
		
	}
	
})











