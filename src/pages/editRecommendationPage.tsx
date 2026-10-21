
import { useMutation, useQueryClient,useQuery } from "@tanstack/react-query";
import { useNavigate,useParams } from "react-router-dom";
import { getMyRecommendations,updateRecommendation } from "../api/recommendationsApi";
import RecommendationForm from "../features/recommendationForm";
import type { RecommendationsInput } from "../types/recommendation";
const EditRecommendationPage=()=>
{
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data, isPending, isError } = useQuery({
    queryKey: ['recommendations', 'mine'],
    queryFn: () => getMyRecommendations(),
    });
   const updateMutation=useMutation({
        mutationFn:(formData:RecommendationsInput)=>updateRecommendation(Number(id),formData),
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
            <h1>עריכת המלצה</h1>
            <RecommendationForm
                defaultValues={{
                    title: rec.title,
                    description: rec.description,
                    categoryId: rec.category.id,
                    url: rec.url ?? '',
                }}
                onSubmit={(formData) => updateMutation.mutate(formData)}
                isSubmitting={updateMutation.isPending}
                submitLabel="שמירה"
            />
            {updateMutation.isError && (
                <p role="alert">לא הצלחנו לשמור את השינויים. בדקו את הפרטים ונסו שוב.</p>
            )}
        </section>
    )
}
export default EditRecommendationPage
