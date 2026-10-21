import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query"
import { getMyRecommendations,deleteRecommendation } from "../api/recommendationsApi"
import { Link } from "react-router-dom"
import RecommendationCard from "../components/recommendationCard"
import type { OwnerRecommendation } from "../types/recommendation"

const STATUS_LABELS: Record<OwnerRecommendation['status'], string> = {
    Published: 'פורסמה',
    PendingSponsoredApproval: 'ממתינה לאישור חסות',
    Rejected: 'בקשת החסות נדחתה',
    Removed: 'הוסרה',
}

const MyRecommendationsPage=()=>
{
const {data,isPending,isError}=useQuery(
    {
        queryKey:['recommendations','mine'],
        queryFn:()=>getMyRecommendations()
    })
    const queryClient=useQueryClient();
    const deleteMutation=useMutation({
        mutationFn:deleteRecommendation,
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recommendations'] });
        },
    })
    const handleDelete=(id:number)=>
    {
       if(window.confirm("האם אתה בטוח שאתה מעוניין במחיקת ההמלצה?"))
        deleteMutation.mutate(id);
    }
    if(isPending)
        return <p>בטעינה...</p>
    if(isError)
        return <p role="alert">אירעה שגיאה, נסה שנית</p>
    if(data.items.length===0)
        return <p>אין לך עדיין המלצות <Link to={'/recommendations/new'}>לחץ כאן להוספת המלצה חדשה</Link></p>
    return(
        <section>
            <h1>ההמלצות שלי</h1>
            {data.items.map((rec)=>(
                <div key={rec.id}>
                    <RecommendationCard recommendation={rec}/>
                    <p>סטטוס: {STATUS_LABELS[rec.status]}</p>
                    {rec.status === 'Rejected' && rec.rejectionReason && (
                        <p>סיבת הדחייה: {rec.rejectionReason}</p>
                    )}
                    {rec.status!=='Removed'&& (
                        <>
                            <button type="button" disabled={deleteMutation.isPending} onClick={()=>handleDelete(rec.id)}>מחיקה</button>
                            <Link to={`/recommendations/${rec.id}/edit`}>עריכה</Link>
                            {!rec.isSponsored && (
                                <Link to={`/recommendations/${rec.id}/sponsorship`}>
                                    {rec.status === 'PendingSponsoredApproval' ? 'עדכון פרטי גילוי' : 'בקשת חסות'}
                                </Link>
                            )}
                        </>
                    )}
                    {rec.status==='Removed'&&<strong>המלצה זו הוסרה ואינה מוצגת למשתמשי האתר</strong>}                     
                </div>
            ))}
        </section>
    )
    


}
export default MyRecommendationsPage