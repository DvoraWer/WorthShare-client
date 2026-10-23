import type { Recommendation } from "../types/recommendation";

interface RecommendationCardProps
{
    recommendation:Recommendation,
    isFavorite?:boolean,
    onToggleFavorite?:()=>void
}

const RecommendationCard=({ recommendation, isFavorite, onToggleFavorite }:RecommendationCardProps)=>
{
return(
    <article className="card">
        {recommendation.isSponsored && <span className="chip-sponsored">המלצה ממומנת</span>}
        <h3>{recommendation.title}</h3>
        <p className="chip-category">{recommendation.category.name}</p>
        <p>{recommendation.description}</p>
{onToggleFavorite && (
    <button
        className="heart"
        aria-label={isFavorite ? 'הסרה מהמועדפים' : 'הוספה למועדפים'}
        type="button"
        onClick={onToggleFavorite}
    >
        {isFavorite ? '❤️' : '🤍'}
    </button>
)}

        {recommendation.url && (
            <a href={recommendation.url} target="_blank" rel="noopener noreferrer">
                לקישור
            </a>
        )}

        <p className="card-meta">
            שם הממליץ: {recommendation.author.fullName}
            {' · '}
            {new Date(recommendation.createdAt).toLocaleDateString('he-IL')}
        </p>
    </article>
)
}
export default RecommendationCard
