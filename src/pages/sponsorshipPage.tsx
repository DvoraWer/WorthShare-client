import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { getPendingSponsored, approveSponsored, rejectSponsored } from "../api/adminApi"
import type { AdminRecommendation } from "../types/recommendation"
import { SPONSORSHIP_TYPE_LABELS } from "../constants/sponsorship"

const SponsorshipPage=()=>
{
    const queryClient=useQueryClient();
    const {data,isPending,isError}=useQuery(
    {
        queryKey:['admin','pending-sponsored'],
        queryFn:()=>getPendingSponsored()
    })

    const handleSuccess=()=>
    {
        queryClient.invalidateQueries({ queryKey: ['admin'] });
        queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    }

    const handleError=(error:Error)=>
    {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
            alert('הבקשה עודכנה בינתיים. הרשימה נטענה מחדש, בדוק שוב.');
            queryClient.invalidateQueries({ queryKey: ['admin'] });
        } else {
            alert('אירעה שגיאה, נסה שוב');
        }
    }

    const approveMutation=useMutation({
        mutationFn:(rec:AdminRecommendation)=>approveSponsored(rec.id, rec.updatedAt),
        onSuccess:handleSuccess,
        onError:handleError,
    })

    const rejectMutation=useMutation({
        mutationFn:({ rec, reason }:{ rec:AdminRecommendation; reason:string })=>rejectSponsored(rec.id, rec.updatedAt, reason),
        onSuccess:handleSuccess,
        onError:handleError,
    })

    const handleReject=(rec:AdminRecommendation)=>
    {
        const reason = window.prompt('סיבת הדחייה (אופציונלי):');
        if (reason === null) return;
        rejectMutation.mutate({ rec, reason });
    }

    const isBusy = approveMutation.isPending || rejectMutation.isPending;

    if(isPending)
        return <p>בטעינה...</p>
    if(isError)
        return <p role="alert">אירעה שגיאה, נסה שוב</p>
    if(data.items.length===0)
        return <p>אין בקשות ממתינות</p>

    return (
        <section>
            <h2>בקשות חסות</h2>
            {data.items.map((rec) => (
                <article key={rec.id}>
                        <h3>{rec.title}</h3>
                        <p>{rec.author.fullName} · {rec.category.name}</p>
                        <p>{rec.description}</p>
                        {rec.disclosure&&(
                            <div>
                                <p>מממן: {rec.disclosure.sponsorName}</p>
                                <p>מוצר: {rec.disclosure.productName}</p>
                                <p>סוג: {SPONSORSHIP_TYPE_LABELS[rec.disclosure.sponsorshipType]}</p>
                                {rec.disclosure.disclosureDetails && <p>פרטים נוספים: {rec.disclosure.disclosureDetails}</p>}
                            </div>
                        )}
                        <button type="button" onClick={() => approveMutation.mutate(rec)} disabled={isBusy}>אישור</button>
                        <button type="button" onClick={() => handleReject(rec)} disabled={isBusy}>דחייה</button>
                </article>
            ))}
        </section>
    )
}
export default SponsorshipPage
