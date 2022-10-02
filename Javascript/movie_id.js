let id_mov = localStorage.getItem("id");

const mostrarPeli = async () => {
  try {
    const RESPONSE = await fetch(
      `https://api.themoviedb.org/3/movie/${id_mov}?api_key=25833d6472d5e0edb18565d7961e3cba&language=es-MX`
    )
      .then((res) => res.json())
      .then((data) => {
        let generos = "";

        data.genres.forEach((genero, index) => {

          if (data.genres.length - 1 === index) {
            generos += `<span class='generos'> ${genero.name} </span>`;
          } else {
            generos += `<span class='generos'> ${genero.name},</span>`;
          }
        });

        const tiempo = data.runtime;
        let horas = Math.floor(tiempo / 60);
        let minutos = tiempo % 60;
        let pais=data.production_countries[0]?`<span>(${data.production_countries[0].iso_3166_1})</span>`:''

        let porcentaje=(data.vote_average).toFixed(1)[0]+(data.vote_average).toFixed(1)[2]
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

        let portadaImg=''

        if(data.backdrop_path===null){
            portadaImg=`<img class='img-portada' src='https://img.freepik.com/vector-gratis/proximamente-fondo-diseno-spot-light_1017-25515.jpg'>`
        }else{
            portadaImg=`<img class='img-portada' src='https://image.tmdb.org/t/p/w500/${data.backdrop_path}'>`
        }

        let pelicula = `
        <section class='portada'>
            <div class='contenedor-img-portada'>
                ${portadaImg}
            </div>

            <article class='top-article'>
                <div class='contenedor-img-pelicula'>
                    <img class='img-pelicula' src='https://image.tmdb.org/t/p/w500/${data.poster_path}'>
                </div>

                <div class='container-description'>
                    <header>
                        <h1>${data.title} (${data.release_date[0]}${data.release_date[1]}${data.release_date[2]}${data.release_date[3]})</h1><span></span>
                        <div class='date-genero'>
                            <span class='date'>${data.release_date} ${pais}</span><div class='genero-duration'>${generos}<span>${horas}h ${minutos}m</span></div>
                        </div>
                    </header>
                    <section class='seccion-porcentaje2'>
                    <div class='porcentaje2'>
				              <svg>
				                <circle cx='28' cy='28' r='30'  style="stroke:${fondo}"></circle>
				                <circle cx='28' cy='28' r='30' style="stroke-dashoffset:calc(190 - (190 * ${porcentaje}) / 100); stroke:${color}"></circle>
				              </svg>
				              <h4 class='number'>${porcentaje}<span>%</span></h4>
				            </div>
                    <h3>Puntuación <br> de <br> usuario</h3>
                    </section>
                    <section class='seccion-resumen'>
                    <h3>Resumen</h3>
                    <p>${data.overview}</p>
                    <article id='creditos'>
                    
                    </div>
                    </section>
                </div>
            </article>
        </section>
        `;
        document.getElementById("section-principal").innerHTML = pelicula;
        console.log(data);
      });
  } catch (error) {
    console.log(error);
  }
};

mostrarPeli();


const reparto= async()=>{
  try {
    await fetch(`
    https://api.themoviedb.org/3/movie/${id_mov}/credits?api_key=25833d6472d5e0edb18565d7961e3cba&language=es-MX`)
    .then(res=>res.json())
    .then(reparto=>{

      let creditos=``
      console.log(reparto)
    reparto.crew.forEach(data=>{
      
      if(data.job==='Director'||data.job==='Novel'||data.job==='Writer'||data.job==='Screenplay'){
        creditos+=`
        <div class='creditos-personas'>
        <h3>${data.name}</h3>
        <p>${data.job}</p>
        </div>`
      }
    })


      document.getElementById('creditos').innerHTML=creditos
    })
  } catch (error) {
    console.log(error)
  }
}

reparto()













// VIDEOS
const mostrarVideos=async()=>{
    try {
        const RESPONSE =await fetch(
          `https://api.themoviedb.org/3/movie/${id_mov}/videos?api_key=25833d6472d5e0edb18565d7961e3cba&language=es-MX`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            let video=''

            if(data.results.length===0){
            video+=`
            <div class='card-trailer-proximamente'>
            <div class='background'></div>
            </div>
            <div class='card-trailer-proximamente'>
            <div class='background'></div>
            </div>
            <div class='card-trailer-proximamente'>
            <div class='background'></div>
            </div>`
            }
            
            console.log(data.results.length)
           data.results.forEach((result,index)=>{

            if(data.results.length>=3){
                video+=`<div class='card-trailer'>
            <iframe width="400" height="250" src="https://www.youtube.com/embed/${result.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`
            }else if(data.results.length===2){

            if(index>0){
                video+=`
            <div class='card-trailer'>
                <iframe width="400" height="250" src="https://www.youtube.com/embed/${result.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`
                }else{
            video+=`
                <div class='card-trailer'>
                    <iframe width="400" height="250" src="https://www.youtube.com/embed/${result.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class='card-trailer-proximamente'>
                    <div class='background'></div>
                </div>`

                }

            }else if(data.results.length===1){
                video+=`<div class='card-trailer'>
            <iframe width="400" height="250" src="https://www.youtube.com/embed/${result.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class='card-trailer-proximamente'>
            <div class='background'></div>
            </div>
            <div class='card-trailer-proximamente'>
            <div class='background'></div>
            </div>`
            }})
            
            document.getElementById("media").innerHTML=video;
          });
}catch(err){
    console.log(err)
}
}

mostrarVideos()


