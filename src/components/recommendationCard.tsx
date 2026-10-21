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
    <article>
        {recommendation.isSponsored && <span>המלצה ממומנת</span>}
        <h3>{recommendation.title}</h3>
        <p>{recommendation.category.name}</p>
        <p>{recommendation.description}</p>
{onToggleFavorite && (
    <button
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

        <p>
            שם הממליץ: {recommendation.author.fullName}
            {' · '}
            {new Date(recommendation.createdAt).toLocaleDateString('he-IL')}
        </p>
    </article>
)
}
export default RecommendationCard
