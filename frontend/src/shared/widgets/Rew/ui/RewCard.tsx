import Avatar from '@img/porfil-foto.jpg'
import Star from '@img/i-star.png'


export default function RewCard({login,rating,text,review_date}:{login:string, rating:string, text:string, review_date:string}){
    return <div className="rewiews-item">
    <div className="rewiews-content-wp">
        <div className="rewiews-content-header">
            <div className="img-rewiews-wp--profil">
                <img src={Avatar} alt={Avatar} className="img-profil"/>
            </div>
            <div className="rew-name-time">
                <p className="reviews-name--profil">{login}</p>
                <time dateTime="2023-03-13T12:00:00Z" className="text-rew">{review_date.split('T').slice(0,1)
                .join('').split('-').reverse().join('.')}</time>
            </div>
            <div className="rew-estimation">
                <div>{rating}</div>
                <img className="Star-img-size" src={Star} alt="Рейтинг места 4 из 5"/>
            </div>
        </div>
        <div className="text-rewiews-wp">
            <p className="text-rew">{text}</p>
        </div>
    </div>
</div>
}