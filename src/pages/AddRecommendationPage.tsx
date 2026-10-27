import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createRecommendation } from "../api/recommendationsApi";
import RecommendationForm from "../features/recommendationForm";

const AddRecommendationPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createRecommendation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recommendations'] });
        },
    });

    return (
        <section className="form-page">
            <h1 className="hero">הוספת המלצה</h1>
            <RecommendationForm
                onSubmit={(data, wantsSponsorship) => mutation.mutate(data, {
                    onSuccess: (rec) => navigate(wantsSponsorship ? `/recommendations/${rec.id}/sponsorship` : '/home'),
                })}
                isSubmitting={mutation.isPending}
                submitLabel="הוספה"
                showSponsorshipOption
            />
            {mutation.isError && (
                <p role="alert">לא הצלחנו לשמור את ההמלצה. בדקו את הפרטים ונסו שוב.</p>
            )}
        </section>
    );
};

export default AddRecommendationPage;
