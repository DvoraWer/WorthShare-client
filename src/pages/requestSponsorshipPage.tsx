
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useNavigate,useParams } from "react-router-dom";
import { getMyRecommendations,requestSponsored } from "../api/recommendationsApi";
import SponsorshipForm from "../features/sponsorshipForm";
import type { SponsorshipInput } from "../types/recommendation";
const RequestSponsorshipPage=()=>
{
     const { id } = useParams();
    const navigate = useNavigate();
     const queryClient = useQueryClient();
    const { data, isPending, isError } = useQuery({
        queryKey: ['recommendations', 'mine'],
        queryFn: () => getMyRecommendations(),
    });
 const sponsorshipMutation=useMutation({
        mutationFn:(formData: SponsorshipInput) => requestSponsored(Number(id), formData),
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recommendations'] });
            navigate('/my-recommendations');
        },
    })

    const rec = data?.items.find((r) => r.id === Number(id));

    if (isPending) return <p>טוען...</p>
    if (isError) return <p role="alert">לא הצלחנו לטעון את ההמלצה. נסו שוב מאוחר יותר.</p>
    if (!rec) return <p>ההמלצה לא נמצאה.</p>

    return (
          <section>
            <h1> בקשה לאישור חסות</h1>
            <p>
                יש לך קשר מסחרי למוצר שעליו אתה ממליץ? מלא את הפרטים.
                ההמלצה תוסתר עד לאישור מנהל, ואחריו תסומן כ"ממומנת".
            </p>
            <SponsorshipForm
                defaultValues={
                    rec.disclosure
                        ? { ...rec.disclosure, disclosureDetails: rec.disclosure.disclosureDetails ?? '' }
                        : undefined
                }
                onSubmit={(formData) => sponsorshipMutation.mutate(formData)}
                isSubmitting={sponsorshipMutation.isPending}
                submitLabel="שליחה לאישור"
            />
            {sponsorshipMutation.isError && (
                <p role="alert">לא הצלחנו לשלוח את הבקשה. בדקו את הפרטים ונסו שוב.</p>
            )}
        </section>
    )
}
export default RequestSponsorshipPage
