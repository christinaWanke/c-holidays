<div id="city_container">

    <div class="banner-text">
        <h1><%>city_description<%></h1>
    </div>

    <div id="city_description">
        <h1 class="header line"><&>name<&></h1>

        <div class="card">
            <img src="<&>image<&>" class="card-img-top" alt="<&>name<&>">
            <div class="card-body">
                <div class="description">
                    <div>
                        <p><b><%>country<%>: </b><&>country<&></p>
                        <p><b><%>nickname<%>: </b><&>nickname<&></p>
                    </div>

                    <button data-id="<&>id<&>" class="favourite city single">❤️</button>
                </div>
            </div>
        </div>
    </div>

    <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    <h3><%>hotels_of_this_city<%></h3>
                </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <div id="hotels_of_city" class="recourses_container"></div>
                </div>
            </div>
        </div>
    </div>
</div>