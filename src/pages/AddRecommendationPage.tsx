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
            navigate('/home');
        },
    });

    return (
        <section>
            <h1>הוספת המלצה</h1>
            <RecommendationForm
                onSubmit={(data) => mutation.mutate(data)}
                isSubmitting={mutation.isPending}
                submitLabel="הוספה"
            />
            {mutation.isError && (
                <p role="alert">לא הצלחנו לשמור את ההמלצה. בדקו את הפרטים ונסו שוב.</p>
            )}
        </section>
    );
};

export default AddRecommendationPage;
