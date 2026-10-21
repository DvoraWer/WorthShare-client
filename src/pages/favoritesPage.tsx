import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import RecommendationCard from "../components/recommendationCard"
import { getFavorites, removeFavorite } from "../api/favoritesApi"

const FavoritesPage=()=>
{
    const queryClient=useQueryClient();
const {data,isPending,isError}=useQuery(
    {
        queryKey:['favorites','list'],
        queryFn:()=>getFavorites()
    })
       const removeMutation=useMutation({
        mutationFn:removeFavorite,
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    })
    if(isPending)
        return <p>בטעינה...</p>
    if(isError)
        return <p role="alert">אירעה שגיאה, נסה שוב</p>
    if(data.items.length===0)
        return <p>עוד לא שמרת המלצות למועדפים. <Link to="/home">לכל ההמלצות</Link></p>
    return (
        <section>
            <h1>המועדפים שלי</h1>
            {data.items.map((rec) => (
                <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    isFavorite={true}
                    onToggleFavorite={() => removeMutation.mutate(rec.id)}
                />
            ))}
        </section>
    )
}
export default FavoritesPage
