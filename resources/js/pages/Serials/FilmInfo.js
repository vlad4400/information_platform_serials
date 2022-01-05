//страница c информацией о сериале

import { Navigate } from "react-router-dom";

export const FilmInfo = () => {   
    return (
    <main class="main">
        <h1>Декстер / Dexter</h1>

        <div class="wrapper">
            <div class="column-poster">
                <div class="poster">         
                    <img src="" alt="poster"/>
                </div>   

                <button class="button add-list">+ Добавить в список</button><br/>
                <button class="button overlook">Просмотрено</button>
                    
                <h3>Оценить</h3>
                <ul class="rate">
                    <li class="star"></li>
                    <li class="star"></li>
                    <li class="star"></li>
                    <li class="star"></li>
                    <li class="star"></li>
                  </ul>
            </div>    

            <div class="column-info">
                <div class="info">     
                    <h3>Информация</h3>
                    <p class="story">Эпизоды:</p>
                    <p class="story">Статус:</p>
                    <p class="story">Жанры:</p><br/>

                    <h3>Сюжет</h3>
                    <p class="story">Декстер Морган — судмедэксперт по брызгам крови, работающий в полиции Майами и серийный убийца преступников, которые как он считает, избежали правосудия.</p><br/>
                    
                    <h3>Кадры</h3>
                    <div class="gallery-frames">
                        <div class="frames"></div>
                        <div class="frames"></div>
                        <div class="frames"></div>
                    </div>
                </div>
            </div>
        </div>        

    </main>
        )
};



