<div id="hotel_container">

    <div class="banner-text">
        <h1><%>hotel_description<%></h1>
    </div>

    <h1 class="header line"><&>name<&></h1>

    <div id="hotel_description">
        <div class="card">
            <img width="100%" src="<&>image<&>" alt="<&>name<&>"/>
            <div id="hotel_gallery"></div>
            <div class="card-body">
                <div class="description">
                    <div>
                        <p><b><%>price<%>: </b><&>price<&> <%>currency<%></p>
                        <p><b><%>stars<%>: </b><&>stars<&></p>
                        <p><b><%>city<%>: </b><&>city<&></p>
                        <p><b><%>description<%>: </b><br><&>description<&></p>
                    </div>

                    <div id="contact">
                        <h3>Contact</h3>
                        <p><b><&>name<&></b><br>
                            <&>address<&></p>
                        <p><&>phone<&><br><&>email<&><br><&>web<&></p>
                    </div>

                    <button data-id="<&>id<&>" class="favourite hotel single">❤️</button>
                </div>

                <p><b><%>amenities<%></b></p>

                <div id="amenities"></div>
            </div>
        </div>

        <div id="mapid"></div>

    </div>
</div>
